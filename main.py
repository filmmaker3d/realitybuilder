# -*- coding: utf-8 -*-

# Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may not
# use this file except in compliance with the License. You may obtain a copy of
# the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations under
# the License.

import logging
import os
import time
import sys
import exceptions
import google.appengine.ext.db
from google.appengine.dist import use_library
use_library('django', '0.96')
from google.appengine.api import mail
from google.appengine.api import users
from google.appengine.api import urlfetch
from google.appengine.ext.webapp import template
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db
from django.utils import simplejson

# Whether debugging should be turned on:
debug = True

# Dumps the data "data" as JSON response, with the correct MIME type.
# "obj" is the object from which the response is generated.
def dump_json(obj, data):
    obj.response.headers['Content-Type'] = 'application/json; charset=utf-8';
    obj.response.out.write(simplejson.dumps(data))

# General information about the construction.
class Construction(db.Model):
    # Version of the blocks configuration. Is the string representation of an
    # integer because the integer may become very large. The version is
    # incremented every time a change is made to the construction, for example
    # if a block has been built or requested to be built.
    blocks_data_version = db.StringProperty()

    # Camera properties (see client code for detailed description). The camera
    # version is the version of the data below. It is increased every time the
    # data is changed. See also the description of the blocks version.
    camera_data_version = db.StringProperty()
    camera_position = db.ListProperty(float) # position in world space
    camera_a_x = db.FloatProperty(default=0.) # angle of rotation about x
    camera_a_y = db.FloatProperty(default=0.) # angle of rotation about y
    camera_a_z = db.FloatProperty(default=0.) # angle of rotation about z
    camera_fl = db.FloatProperty(default=1.) # focal length
    camera_sensor_resolution = \
        db.FloatProperty(default=100.) # sensor resolution

    # Live background image, its URL, when it was last updated, and how often
    # it should be updated. When fetching the URL, a get parameter is appended,
    # to avoid caching the request by App Engine. The image version is the
    # version of the data below, not of the image itself. This version is
    # increased every time the data is changed. See also the description of the
    # blocks version.
    image_data_version = db.StringProperty()
    image = db.BlobProperty(default=None)
    image_url = db.LinkProperty()
    image_last_update = db.FloatProperty(default=0.) # s
    image_update_interval_server = db.FloatProperty(default=5.) # s
    image_update_interval_client = db.FloatProperty(default=5.) # s

    # Increases the blocks version number. Should be run in a transaction.
    def increase_blocks_data_version(self):
        self.blocks_data_version = str(int(self.blocks_data_version) + 1)
        self.put()

    # Increases the camera version number. Should be run in a transaction.
    def increase_camera_data_version(self):
        self.camera_data_version = str(int(self.camera_data_version) + 1)
        self.put()

    # Increases the image data version number. Should be run in a transaction.
    def increase_image_data_version(self):
        self.image_data_version = str(int(self.image_data_version) + 1)
        self.put()

    # Returns the main construction, which is the only construction. Raises an
    # exception, if the construction cannot be found.
    @staticmethod
    def get_main():
        construction = Construction.get_by_key_name('main')
        if construction:
            return construction
        else:
            raise Exception('Could not find construction')

# Data specific to prerender-mode.
class PrerenderMode(db.Model):
    # The data version is increased every time the data is changed. The client
    # uses this data to determine when to update the display.
    data_version = db.StringProperty()

    # With prerender-mode enabled, a block is automatically made real after
    # "make_real_after" milliseconds, and if the total construction would
    # afterwards match one of the block configurations in the list
    # "block_configurations". Associated with each block configuration is an
    # image, the URL of which is constructed using the template
    # "image_url_template": %d is substituted with the block configuration
    # number. This number is identical to the corresponding index in the array
    # with the block configurations.
    is_enabled = db.BooleanProperty()
    make_real_after = db.IntegerProperty() # ms
    block_configurations = db.StringListProperty()
    image_url_template = db.StringProperty()

# Data specific to the new block
class NewBlock(db.Model):
    # The data version is increased every time the data is changed. The client
    # uses this data to determine when to update the display.
    data_version = db.StringProperty()

    # Initial position, in block space:
    init_position_b = db.ListProperty(int)

    # Initial rotation angle:
    init_a = db.IntegerProperty() # multiples of 90°, CCW when viewed from
                                  # above

    # Points in block space, defining the rectangle which represents the space
    # in which the block may be moved around.
    move_space_1_b = db.ListProperty(int)
    move_space_2_b = db.ListProperty(int)

    # Points in block space, defining the rectangle which represents the space
    # in which the block may be built.
    build_space_1_b = db.ListProperty(int)
    build_space_2_b = db.ListProperty(int)

class Block(db.Model):
    # Position, in block space:
    position_b = db.ListProperty(int)

    # Rotation angle:
    a = db.IntegerProperty() # ° CCW when viewed from above

    # 0 = deleted, 1 = pending, 2 = real
    state = db.IntegerProperty(default=0)

    # Time stamp of last state change, which includes the initial block
    # creation:
    time_stamp = db.IntegerProperty() # s

    # Returns the datastore key name of a block at "x_b", "y_b", "z_b", rotated
    # by "a".
    @staticmethod
    def build_key_name(position_b, a):
        x_b = position_b[0]
        y_b = position_b[1]
        z_b = position_b[2]
        return str(x_b) + ',' + str(y_b) + ',' + str(z_b) + ',' + str(a)

    # Returns the block at the block space position "position_b", rotated by
    # the angle "a", in the construction "construction", or "None", if the
    # block cannot be found. Also returns blocks in state deleted.
    @staticmethod
    def get_at(construction, position_b, a):
        return Block.get_by_key_name(Block.build_key_name(position_b, a), 
                                     parent=construction)

    # Inserts a block at the block space position "position_b" in the
    # construction "construction", with the initial state deleted. The block is
    # rotated by "a", CCW when viewed from above. Raises an exception on
    # failure. Returns the block.
    @staticmethod
    def insert_at(construction, position_b, a):
        return Block(parent=construction, 
                     key_name=Block.build_key_name(position_b, a),
                     position_b=position_b, a=a,
                     time_stamp=long(time.time()))

    # If there is a block at "position_b", rotated by "a", in the state "state"
    # in the construction "construction", returns that block. Otherwise returns
    # "None".
    @staticmethod
    def get_at_with_state(construction, position_b, a, state):
        block = Block.get_at(construction, position_b, a)
        if block and block.state == state:
            return block
        else:
            return None

    # The set with all the positions, relative to a block in block space,
    # that would intersect with the block. The position of the block itself
    # - that would be (0, 0) - is not included.
    intersecting_relative_xy_positionsB = [
        (-1, 0), 
        (-1, 1), (0, 1), (1, 1),
        (1, 0),
        (1, -1), (0, -1), (-1, -1)]

    def x_b(self):
        return self.position_b[0]

    def y_b(self):
        return self.position_b[1]

    def z_b(self):
        return self.position_b[2]

    # Returns True, iff the block "block" intersects with any real block. Self
    # intersection does not count as intersection.
    def is_intersecting_with_real(self):
        return False # currently not implemented

    # Deletes any pending blocks intersecting with the block "block", aside
    # from the block itself.
    @staticmethod
    def delete_intersecting_pending_blocks(block):
        for relative_xy_positionB in Block.intersecting_relative_xy_positionsB:
            testXB = block.x_b() + relative_xy_positionB[0]
            testYB = block.y_b() + relative_xy_positionB[1]
            testZB = block.z_b()
            testA = block.a
            testBlock = Block.get_at_with_state(block.parent(), 
                                                [testXB, testYB, testZB], 
                                                testA, 1)
            if testBlock:
                # Intersecting pending block exists. => It is deleted:
                testBlock.state = 0
                testBlock.put()

    # Sets the state of the block to "state", also updating the time stamp.
    # Increases the blocks version number. Should be run in a transaction.
    def store_state_and_increase_blocks_data_version(self, state):
        self.state = state
        self.time_stamp = long(time.time())
        self.put()
        self.parent().increase_blocks_data_version()

# Properties of the block: shape, size, how to attach blocks, etc.
class BlockProperties(db.Model):
    # The data version is increased every time the data is changed. The client
    # uses this data to determine when to update the display.
    data_version = db.StringProperty()

    # Block dimensions in world space. The side length of a block is
    # approximately two times the grid spacing in the respective direction.
    position_spacing_xy = db.FloatProperty() # mm
    position_spacing_z = db.FloatProperty() # mm

    # Outline of a block in the xy plane, with coordinates in block space,
    # counterclockwise, when not rotated:
    outline_bxy = db.StringProperty() # JSON array

    # Two blocks 1 and 2 are defined to collide, iff block 2 is offset against
    # block 1 in the block space x-y-plane by any of the following values. The
    # rotation angles below are those of block 2 relative to block 1. The
    # offsets are stored as JSON arrays.
    collision_offsets_list_bxy = db.StringListProperty() # 0°, 90°, 180°, 270°

    # A block 2 is defined to be attachable to a block 1, if it is offset
    # against block 1 by any of the following values, in block space. The
    # rotation angles below are those of block 2 relative to block 1. The
    # offsets are stored as JSON arrays.
    attachment_offsets_list_b = db.StringListProperty() # 0°, 90°, 180°, 270°

    # Center of rotation, with coordinates in block space, relative to the
    # lower left corner of the unrotated block, when viewed from above:
    rot_center_bxy = db.ListProperty(float)

# Information concerning sending info emails about pending blocks.
class PendingBlockEmail(db.Model):
    sender_address = db.EmailProperty()
    recipient_address = db.EmailProperty()

class Index(webapp.RequestHandler):
    def get(self):
        template_values = {'debug': debug}
        
        path = os.path.join(os.path.dirname(__file__), 'index.html')
        self.response.out.write(template.render(path, template_values))

class Admin(webapp.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user and users.is_current_user_admin():
            template_values = {
                'debug': debug, 
                'logout_url': users.create_logout_url("/admin")}

            path = os.path.join(os.path.dirname(__file__), 'admin.html')
            self.response.out.write(template.render(path, template_values))
        else:
            self.redirect(users.create_login_url("/admin"))
            return

# Data describing a construction, including building blocks.
class RPCConstruction(webapp.RequestHandler):
    # Returns the blocks as an array of dictionaries.
    @staticmethod
    def get_blocks_data_blocks(construction):
        query = Block.all().ancestor(construction)
        blocks = []
        for block in query:
            blocks.append({
                    'positionB': block.position_b, 
                    'a': block.a,
                    'state': block.state,
                    'timeStamp': block.time_stamp})
        return blocks

    # Returns JSON serializable data related to blocks.
    @staticmethod
    def get_blocks_data(construction, blocks_data_version_client):
        blocks_data_version = construction.blocks_data_version
        blocks_data_changed = \
            (blocks_data_version != blocks_data_version_client)
        data = {
            'version': blocks_data_version,
            'changed': blocks_data_changed}
        if blocks_data_changed:
            # Blocks version on server not the same as on client. => Deliver
            # all the data.
            data.update({
                    'blocks': 
                    RPCConstruction.get_blocks_data_blocks(construction)})
        return data

    # Returns JSON serializable data related to the camera.
    @staticmethod
    def get_camera_data(construction, camera_data_version_client):
        camera_data_version = construction.camera_data_version
        camera_data_changed = \
            (camera_data_version != camera_data_version_client)
        data = {
            'version': camera_data_version,
            'changed': camera_data_changed}
        if camera_data_changed:
            # Camera version on server not the same as on client. =>
            # Deliver all the data.
            data.update({
                    'position': construction.camera_position,
                    'aX': construction.camera_a_x,
                    'aY': construction.camera_a_y,
                    'aZ': construction.camera_a_z,
                    'fl': construction.camera_fl,
                    'sensorResolution': construction.camera_sensor_resolution})
        return data

    # Returns JSON serializable data related to the live image.
    @staticmethod
    def get_image_data(construction, image_data_version_client):
        image_data_version = construction.image_data_version
        image_data_changed = (image_data_version != 
                              image_data_version_client)
        data = {
            'version': image_data_version,
            'changed': image_data_changed}
        if image_data_changed:
            # Image data version on server not the same as on client. =>
            # Deliver all the data.
            data.update({
                    'url': construction.image_url,
                    'updateIntervalServer': \
                        construction.image_update_interval_server,
                    'updateIntervalClient': \
                        construction.image_update_interval_client})
        return data

    @staticmethod
    def json_decode_list(l):
        return map(simplejson.loads, l)

    # Returns JSON serializable data related to the block properties.
    @staticmethod
    def get_block_properties_data(construction, 
                                  block_properties_data_version_client):
        query = BlockProperties.all().ancestor(construction)
        block_properties = query.get()
        if block_properties is None:
            raise Exception('Could not get block properties data')

        block_properties_data_version = block_properties.data_version
        block_properties_data_changed = \
            (block_properties_data_version != 
             block_properties_data_version_client)
        data = {
            'version': block_properties_data_version,
            'changed': block_properties_data_changed}
        if block_properties_data_changed:
            # Block properties data version on server not the same as on
            # client. => Deliver all the data.
            data.update({'positionSpacingXY': 
                         block_properties.position_spacing_xy,
                         'positionSpacingZ': 
                         block_properties.position_spacing_z,
                         'outlineBXY': 
                         simplejson.loads(block_properties.outline_bxy),
                         'collisionOffsetsListBXY': \
                             RPCConstruction.json_decode_list \
                             (block_properties.collision_offsets_list_bxy),
                         'attachmentOffsetsListB': \
                             RPCConstruction.json_decode_list \
                             (block_properties.attachment_offsets_list_b),
                         'rotCenterBXY': block_properties.rot_center_bxy})
        return data

    # Returns JSON serializable data related to the new block
    @staticmethod
    def get_new_block_data(construction, new_block_data_version_client):
        query = NewBlock.all().ancestor(construction)
        new_block = query.get()
        if new_block is None:
            raise Exception('Could not get new block data')

        new_block_data_version = new_block.data_version
        new_block_data_changed = (new_block_data_version != 
                                  new_block_data_version_client)
        data = {
            'version': new_block_data_version,
            'changed': new_block_data_changed}
        if new_block_data_changed:
            # New block data version on server not the same as on client. =>
            # Deliver all the data.
            data.update({'initPositionB': new_block.init_position_b,
                         'initA': new_block.init_a,
                         'moveSpace1B': new_block.move_space_1_b,
                         'moveSpace2B': new_block.move_space_2_b,
                         'buildSpace1B': new_block.build_space_1_b,
                         'buildSpace2B': new_block.build_space_2_b})
        return data

    # Returns JSON serializable data related to prerender-mode.
    @staticmethod
    def get_prerender_mode_data(construction, 
                                prerender_mode_data_version_client):
        query = PrerenderMode.all().ancestor(construction)
        prerender_mode = query.get()
        if prerender_mode is None:
            raise Exception('Could not get prerender-mode data')

        prerender_mode_data_version = prerender_mode.data_version
        prerender_mode_data_changed = (prerender_mode_data_version != 
                                       prerender_mode_data_version_client)
        data = {
            'version': prerender_mode_data_version,
            'changed': prerender_mode_data_changed}
        if prerender_mode_data_changed:
            # Prerender-mode data version on server not the same as on client.
            # => Deliver all the data.
            data.update({'isEnabled': prerender_mode.is_enabled,
                         'makeRealAfter': prerender_mode.make_real_after,
                         'blockConfigurations': \
                             RPCConstruction.json_decode_list \
                             (prerender_mode.block_configurations),
                         'imageUrlTemplate': 
                         prerender_mode.image_url_template})
        return data

    # A transaction may not be necessary, but it ensures data integrity for
    # example if there is a transaction missing somewhere else.
    @staticmethod
    def transaction(blocks_data_version_client, 
                    camera_data_version_client,
                    image_data_version_client,
                    block_properties_data_version_client,
                    new_block_data_version_client,
                    prerender_mode_data_version_client):
        construction = Construction.get_main()
        data = {
            'blocksData': RPCConstruction.get_blocks_data(
                construction, blocks_data_version_client),
            'cameraData': RPCConstruction.get_camera_data(
                construction, camera_data_version_client),
            'imageData': RPCConstruction.get_image_data(
                construction, camera_data_version_client),
            'blockPropertiesData': RPCConstruction.get_block_properties_data(
                construction, block_properties_data_version_client),
            'newBlockData': RPCConstruction.get_new_block_data(
                construction, new_block_data_version_client),
            'prerenderModeData': RPCConstruction.get_prerender_mode_data(
                construction, prerender_mode_data_version_client)
        }
        return data

    def get(self):
        try:
            blocks_data_version_client = \
                self.request.get('blocksDataVersion')
            camera_data_version_client = \
                self.request.get('cameraDataVersion')
            image_data_version_client = self.request.get('imageDataVersion')
            block_properties_data_version_client = \
                self.request.get('blockPropertiesDataVersion')
            new_block_data_version_client = \
                self.request.get('newBlockDataVersion')
            prerender_mode_data_version_client = \
                self.request.get('prerenderModeDataVersion')

            data = db.run_in_transaction(RPCConstruction.transaction, 
                                         blocks_data_version_client, 
                                         camera_data_version_client,
                                         image_data_version_client,
                                         block_properties_data_version_client,
                                         new_block_data_version_client,
                                         prerender_mode_data_version_client)
            dump_json(self, data)
        except Exception, e:
            logging.error('Could not retrieve data: ' + str(e))

# Changes the status of the block at the provided position to real. If the
# block isn't in the construction, then the operation fails. If the block
# intersects with any real block, then it is deleted. If there are pending
# blocks that intersect with the newly turned real block, then they are
# deleted.
# 
# Silently fails on error.
class RPCAdminMakeReal(webapp.RequestHandler):
    # Tries to make the block at the block position "x_b", "y_b", "z_b", and
    # rotated by the angle "a", real.
    @staticmethod
    def transaction(x_b, y_b, z_b, a):
        construction = Construction.get_main()
       
        block = Block.get_at(construction, [x_b, y_b, z_b], a)
        if not block or block.state == 2:
            return # No block to update or already real.
        
        if block.is_intersecting_with_real():
            # Block intersects with real block. => Should be
            # deleted.
            new_state = 0
        else:
            new_state = 2
            
        block.store_state_and_increase_blocks_data_version(new_state)
            
        if new_state != 0:
            Block.delete_intersecting_pending_blocks(block)

    def post(self):
        try:
            x_b = int(self.request.get('xB'))
            y_b = int(self.request.get('yB'))
            z_b = int(self.request.get('zB'))
            a = int(self.request.get('a'))
            db.run_in_transaction(RPCAdminMakeReal.transaction, 
                                  x_b, y_b, z_b, a)
        except Exception, e:
            logging.error('Could not make block real: ' + str(e))

# FIXME: implement and update documentation
#
# Changes the status of the block at the provided position to real. If the
# block isn't in the construction, then the operation fails. If the block
# intersects with any real block, then it is deleted. If there are pending
# blocks that intersect with the newly turned real block, then they are
# deleted.
# 
# Silently fails on error.
class RPCMakeRealPrerendered(webapp.RequestHandler):
    # Tries to make the block at the block position "x_b", "y_b", "z_b", and
    # rotated by the angle "a", real. If successful, then changes the URL of
    # the background image to "image_url".
    @staticmethod
    def transaction(x_b, y_b, z_b, a, image_url):
        # FIXME: check if prerender-mode is active

        # FIXME: perhaps reuse code from other function
 
        construction = Construction.get_main()

        query = PrerenderMode.all().ancestor(construction)
        prerender_mode = query.get()
        if prerender_mode is None:
            raise Exception('Could not get prerender-mode data')
        
        block = Block.get_at(construction, [x_b, y_b, z_b], a)
        if not block or block.state == 2:
            return # No block to update or already real.
        
        if block.is_intersecting_with_real():
            # Block intersects with real block. => Should be
            # deleted.
            new_state = 0
        else:
            new_state = 2
            
        block.store_state_and_increase_blocks_data_version(new_state)

        # Necessary since the current construction object still contains the
        # old blocks data version. FIXME: somehow using another instance of
        # "Construction" in "store_state..." and the "construction.put()" below
        # causes trouble. Even using "Construction.get_main()" again doesn't
        # solve the problem.
        construction.increase_blocks_data_version() 
            
        if new_state != 0:
            Block.delete_intersecting_pending_blocks(block)

        construction.image_url = image_url
        construction.put()
        construction.increase_image_data_version()

    def post(self):
        try:
            x_b = int(self.request.get('xB'))
            y_b = int(self.request.get('yB'))
            z_b = int(self.request.get('zB'))
            a = int(self.request.get('a'))
            image_url = self.request.get('imageUrl')
            db.run_in_transaction(RPCMakeRealPrerendered.transaction, 
                                  x_b, y_b, z_b, a, image_url)
        except Exception, e:
            logging.error('Could not make block real in prerender-mode: ' + 
                          str(e))

# Sets the state of the block at the provided position to deleted.
#
# The post request fails silently on error.
class RPCAdminDelete(webapp.RequestHandler):
    # Tries to delete the block at position "x_b", "y_b", "z_b", and rotated by
    # the angle "a".
    @staticmethod
    def transaction(x_b, y_b, z_b, a):
        construction = Construction.get_main()

        block = Block.get_at(construction, [x_b, y_b, z_b], a)
        if block:
            # block found to be set to state deleted
            block.store_state_and_increase_blocks_data_version(0)

    def post(self):
        try:
            x_b = int(self.request.get('xB'))
            y_b = int(self.request.get('yB'))
            z_b = int(self.request.get('zB'))
            a = int(self.request.get('a'))
            db.run_in_transaction(RPCAdminDelete.transaction, x_b, y_b, z_b, a)
        except Exception, e:
            logging.error('Could not delete block: ' + str(e))

# Creates a block at the given position, with the state: pending to be build.
# If a block already exists in that position, and if that block is non-real and
# non-pending, then the state of that block is made pending. If the block
# intersects with a real block, then it is left in the state deleted.
#
# Possible reason for failure: Adding a pending block was requested from a
# client that doesn't yet know that this block is already real. In this case,
# that client will sooner or later pick up the latest version of the blocks,
# and inform the user that his request was denied. There is no need for an
# additional increase in blocks version number.
#
# If a new pending block has been created, or if the state of an existing
# non-pending block has been changed to pending, then an email is sent to the
# configured email address.
#
# The post request fails silently on error.
class RPCCreatePending(webapp.RequestHandler):
    # Tries to send an email, informing that a pending block has been created,
    # or the state of an existing block has been changed to pending. The
    # position of the block: "position_b" Its rotation angle: "a"
    @staticmethod
    def send_info_email(construction, position_b, a):
        query = PendingBlockEmail.all().ancestor(construction)
        pending_block_email = query.get()
        if pending_block_email is None:
            raise Exception('Could not get pending block email data')

        sender_address = pending_block_email.sender_address
        recipient_address = pending_block_email.recipient_address
        subject = "New Pending Block"
        body = """
Position: %d, %d, %d
Angle: %d
""" % (position_b[0], position_b[1], position_b[2], a)

        try:
            mail.send_mail(sender_address, recipient_address, subject, body)
        except:
            return False

        return True

    # Tries to create a pending block at the block position "x_b", "y_b",
    # "z_b", and rotated about its center of rotation by "a".
    @staticmethod
    def transaction(x_b, y_b, z_b, a):
        construction = Construction.get_main()

        block = Block.get_at(construction, [x_b, y_b, z_b], a)
        if not block:
            # Block has to be created, with initial state deleted. It is left
            # in that state, if it intersects with a real block - see below.
            block = Block.insert_at(construction, [x_b, y_b, z_b], a)

        if block.state == 2 or block.state == 1:
            # Block is real or block is already pending.
            return

        # Block neither real nor pending. => It's in the state deleted.

        if block.is_intersecting_with_real():
            # Block intersects with real block. => Should be left deleted.
            return

        block.store_state_and_increase_blocks_data_version(1) # Set to pending.
        RPCCreatePending.send_info_email(construction, [x_b, y_b, z_b], a)

    def post(self):
        try:
            x_b = int(self.request.get('xB'))
            y_b = int(self.request.get('yB'))
            z_b = int(self.request.get('zB'))
            a = int(self.request.get('a'))
            db.run_in_transaction(RPCCreatePending.transaction, 
                                  x_b, y_b, z_b, a)
        except Exception, e:
            logging.error('Could not add pending block or set existing ' + 
                          'block to pending: ' + str(e))

# Changes the status of a real or deleted block to pending, unless the block
# does intersect with any real block. If there is no block at the provided
# position or if it is already pending, then nothing is done. If the block
# intersects with a real block, then it is deleted.
#
# The post request fails silently on error.
class RPCAdminMakePending(webapp.RequestHandler):
    # Tries to turn the block at the block position "x_b", "y_b", "z_b" and
    # rotated by the angle "a" into a pending block, or sets its state to
    # deleted, if it intersects with a real block.
    @staticmethod
    def transaction(x_b, y_b, z_b, a):
        construction = Construction.get_main()

        block = Block.get_at(construction, [x_b, y_b, z_b], a)
        if not block or block.state == 1:
            # No block found, or block is already pending, or block intersects
            # with real block. => Nothing is done.
            return

        if block.is_intersecting_with_real():
            # Block intersects with real block. => Should be deleted.
            new_state = 0
        else:
            new_state = 1

        block.store_state_and_increase_blocks_data_version(new_state)

    def post(self):
        try:
            x_b = int(self.request.get('xB'))
            y_b = int(self.request.get('yB'))
            z_b = int(self.request.get('zB'))
            a = int(self.request.get('a'))
            db.run_in_transaction(RPCAdminMakePending.transaction, 
                                  x_b, y_b, z_b, a)
        except Exception, e:
            logging.error('Could not make block pending: ' + str(e))

# Updates the camera and live image settings and increases the camera version
# number.
#
# The post request fails silently on error.
class RPCAdminUpdateSettings(webapp.RequestHandler):
    # Tries to update the image and camera settings. Ignores values that cannot
    # be assigned.
    @staticmethod
    def transaction(data):
        construction = Construction.get_main()

        for key, value in data.iteritems():
            try:
                setattr(construction, key, value);
            except:
                pass # nothing to be done

        construction.put()

        # Everything has gone well. Now the versions of the data are updated.
        construction.increase_camera_data_version()
        construction.increase_image_data_version()

    def post(self):
        try:
            data = {
                'camera_position': [float(self.request.get('camera.x')),
                                    float(self.request.get('camera.y')),
                                    float(self.request.get('camera.z'))],
                'camera_a_x': float(self.request.get('camera.aX')),
                'camera_a_y': float(self.request.get('camera.aY')),
                'camera_a_z': float(self.request.get('camera.aZ')),
                'camera_fl': float(self.request.get('camera.fl')),
                'camera_sensor_resolution':
                    float(self.request.get('camera.sensorResolution')),
                'image_url': self.request.get('image.url'),
                'image_update_interval_server':
                    float(self.request.get('image.updateIntervalServer')),
                'image_update_interval_client':
                    float(self.request.get('image.updateIntervalClient'))}
            db.run_in_transaction(RPCAdminUpdateSettings.transaction, 
                                  data)
        except Exception, e:
            logging.error('Could not update camera and image data: ' + str(e))

# Initializes the datastore with sample data. Works only in debug mode. Use
# with caution.
class AdminInit(webapp.RequestHandler):
    def get(self):
        if not debug:
            print 'Only available in debug mode.'
            return
        
        # Deletes all construction entries:
        queries = [Construction.all()]
        for query in queries:
            for result in query:
                result.delete()

        # An external image is used because "dev_appserver.py" can only server
        # one requests at a time, as of May 2011. Therefore, according to
        # official documentation: "If your application makes URL fetch requests
        # to itself while processing a request, these requests will fail when
        # using the development web server." See: <url:http://code.google.com/a
        # ppengine/docs/python/tools/devserver.html#Using_URL_Fetch>
        image_url = ('http://realitybuilder.googlecode.com/hg/documentation/' +
                     'sample_scene/prerendered_0.jpg')

        # Creates the construction configuration. An image URL is not set to an
        # image on the same App Engine instance, since urlfetch doesn't seem to
        # like that.
        construction = Construction(key_name = 'main')
        construction.blocks_data_version = '0'
        construction.camera_data_version = '0'
        construction.camera_position = [189.57, -159.16, 140.11]
        construction.camera_a_x = 2.1589
        construction.camera_a_y = -0.46583
        construction.camera_a_z = 0.29
        construction.camera_fl = 40.
        construction.camera_sensor_resolution = 19.9
        construction.image_data_version = '0'
        construction.image_url = image_url
        construction.image_update_interval_server = 5.
        construction.image_update_interval_client = 5.
        construction.put()

        # Deletes all prerender-mode entries:
        queries = [PrerenderMode.all()]
        for query in queries:
            for result in query:
                result.delete()

        # Sets up the prerender-mode:
        prerenderMode = PrerenderMode(parent=construction)
        prerenderMode.data_version = '0'
        prerenderMode.is_enabled = True
        prerenderMode.make_real_after = 0
        prerenderMode.block_configurations = \
            ['[[1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2], ' +
             '[5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2], ' +
             '[4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0]]',
             '[[1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2], ' +
             '[5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2], ' +
             '[4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0], [1, 1, 0, 0]]']
        prerenderMode.image_url_template = \
            'http://realitybuilder.googlecode.com/hg/documentation/' + \
            'sample_scene/prerendered_%d.jpg'
        prerenderMode.put()

        # Deletes all block properties entries:
        queries = [BlockProperties.all()]
        for query in queries:
            for result in query:
                result.delete()

        # Sets up the block properties (construction as parent is important so
        # that the properties form one entity group with the construction,
        # which is necessary when doing transactions):
        blockProperties = BlockProperties(parent=construction)
        blockProperties.data_version = '0'
        blockProperties.position_spacing_xy = 20.
        blockProperties.position_spacing_z = 10.
        blockProperties.outline_bxy = '[[0, 0], [1, 0], [2, 1], [0, 1]]'
        blockProperties.collision_offsets_list_bxy = \
            ['[[-1, 0], [0, 0], [1, 0]]',
             '[[0, 0], [1, 0], [0, -1], [1, -1]]',
             '[[0, 0], [1, 0]]',
             '[[0, 1], [1, 1], [0, 0], [1, 0]]']
        blockProperties.attachment_offsets_list_b = \
            ['[[0, 0, -1], [0, 0, 1]]',
             '[[0, 0, -1], [0, 0, 1]]',
             '[[0, 0, -1], [0, 0, 1], [1, 0, -1], [1, 0, 1]]',
             '[[0, 0, -1], [0, 0, 1]]']
        blockProperties.rot_center_bxy = [0.5, 0.5]
        blockProperties.put()

        # Deletes all new block entries:
        queries = [NewBlock.all()]
        for query in queries:
            for result in query:
                result.delete()

        # Sets up the new block:
        newBlock = NewBlock(parent=construction)
        newBlock.data_version = '0'
        newBlock.init_position_b = [4, 0, 4]
        newBlock.init_a = 0
        newBlock.move_space_1_b = [-1, -1, 0]
        newBlock.move_space_2_b = [6, 6, 5]
        newBlock.build_space_1_b = [0, 0, 0]
        newBlock.build_space_2_b = [5, 5, 4]
        newBlock.put()

        # Deletes all block entries:
        queries = [Block.all()]
        for query in queries:
            for result in query:
                result.delete()

        # Creates block entries:
        cs = [
            [1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2],
            [5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2],
            [4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0]]
        for c in cs:
            x_b = c[0]
            y_b = c[1]
            z_b = c[2]
            a = c[3]
            block = Block.insert_at(construction, [x_b, y_b, z_b], a)
            block.state = 2
            block.put()

        # Deletes all pending block email entries:
        queries = [PendingBlockEmail.all()]
        for query in queries:
            for result in query:
                result.delete()

        # Creates pending block email entries:
        pendingBlockEmail = PendingBlockEmail(parent=construction)
        pendingBlockEmail.sender_address = 'Admin <admin@example.com>'
        pendingBlockEmail.recipient_address = \
            'Block Builders <block.builders@example.com>'
        pendingBlockEmail.put()

        print 'Done.'

# Provides the background image. Refetches it from the live source in certain
# intervals. If the refetching fails, provides the old image, and if that image
# is not valid, redirects to a place holder.
class Image(webapp.RequestHandler):
    # Retrieves a new image, stores it in the database for the entity
    # "construction", and returns the image. Returns the old image, if the
    # image retrieval fails.
    @staticmethod
    def update_image(construction):
        old_image = construction.image
        try:
            if not construction.image_url:
                return old_image
            url = str(construction.image_url) + '?nocache=' + str(time.time())
            
            # To avoid concurrent requests, the deadline is set to a value less
            # than the update interval:
            deadline = construction.image_update_interval_server * 2. / 3.

            tmp = urlfetch.Fetch(url, deadline=deadline)
            if not tmp:
                return old_image

            new_image = db.Blob(tmp.content)
        except:
            return old_image
        construction.image = new_image
        construction.image_last_update = time.time()
        construction.put()
        return new_image

    # Checks if the image needs to be updated. If not, returns the image
    # currently stored in the data store. Otherwise, retrieves an up to date
    # image, stores it in the data store and returns the result. If retrieving
    # does fail, returns the image currently in the data store.
    @staticmethod
    def transaction():
        construction = Construction.get_main()
        if (time.time() > construction.image_last_update + \
                construction.image_update_interval_server):
            return Image.update_image(construction)
        else:
            return construction.image

    def get(self):
        try:
            image = db.run_in_transaction(Image.transaction)
            if image:
                self.response.headers['Content-Type'] = 'image/jpeg'
                self.response.out.write(image)
            else:
                self.redirect(self.request.
                              relative_url('/images/placeholder.gif'))
        except Exception, e:
            logging.error('Could not retrieve image: ' + str(e))

application = webapp.WSGIApplication([
    ('/', Index), ('/admin', Admin), 
    ('/images/live.jpg', Image),
    ('/admin/init', AdminInit),
    ('/admin/rpc/delete', RPCAdminDelete),
    ('/admin/rpc/make_real', RPCAdminMakeReal),
    ('/admin/rpc/make_pending', RPCAdminMakePending),
    ('/admin/rpc/update_settings', RPCAdminUpdateSettings),
    ('/rpc/construction', RPCConstruction),
    ('/rpc/create_pending', RPCCreatePending),
    ('/rpc/make_real_prerendered', RPCMakeRealPrerendered)],
    debug = debug)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
