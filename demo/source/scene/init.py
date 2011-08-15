# Initializes the datastore with sample data.
#
# Possibilities to execute the code in this file:
#
# * GAE SDK 1.5 or compatible: Paste the code in the interactive console and
#   execute it.
# 
# * GAE (production):
# 
#   a) Enter the directory of the Reality Builder.
#
#   b) Connect to the remote API shell.
# 
#     On Windows XP's "cmd.exe" (substitute %-placeholders):
#
#       %PYTHON_PATH%\python.exe %GAE_PATH%\remote_api_shell.py -s ^
#       %APPLICATION%.appspot.com
#
#   c) Paste the code. It will execute automatically.

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

import os.path
import sys
sys.path.append(os.path.realpath('.'))

from google.appengine.dist import use_library
use_library('django', '0.96')

from main import Construction
from main import Block
from main import BlockProperties
from main import ConstructionBlockProperties
from main import NewBlock
from main import PendingBlockEmail
from main import PrerenderMode
from django.utils import simplejson

from google.appengine.api import namespace_manager
namespace_manager.set_namespace('demo')

# Deletes all construction entries:
queries = [Construction.all()]
for query in queries:
    for result in query:
        result.delete()

# Creates the construction configuration.
construction = Construction(key_name = 'main')
construction.update_interval_client = 2000
construction.blocks_data_version = '0'
construction.camera_data_version = '0'
construction.camera_position = [189.57, -159.16, 140.11]
construction.camera_a_x = 2.1589
construction.camera_a_y = -0.46583
construction.camera_a_z = 0.29
construction.camera_fl = 40.
construction.camera_sensor_resolution = 19.9
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
     '[4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0], [1, 1, 0, 0]]',
     '[[1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2], ' +
     '[5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2], ' +
     '[4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0], [1, 1, 0, 0], [3, 1, 0, 2]]',
     '[[1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2], ' +
     '[5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2], ' +
     '[4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0], [3, 1, 0, 2]]',
     '[[1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2], ' +
     '[5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2], ' +
     '[4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0], [1, 1, 0, 0], [3, 1, 0, 2], ' +
     '[2, 1, 1, 0]]',
     '[[1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2], ' +
     '[5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2], ' +
     '[4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0], [1, 1, 0, 0], [3, 1, 0, 2], ' +
     '[2, 1, 1, 0], [1, 1, 1, 3]]',
     '[[1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2], ' +
     '[5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2], ' +
     '[4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0], [1, 1, 0, 0], [3, 1, 0, 2], ' +
     '[1, 1, 1, 3]]',
     '[[1, 4, 3, 1], [1, 4, 2, 0], [1, 4, 1, 3], [1, 4, 0, 2], ' +
     '[5, 5, 1, 2], [5, 5, 0, 2], [0, 1, 0, 3], [3, 0, 0, 2], ' +
     '[4, 0, 0, 0], [1, 0, 0, 0], [4, 4, 0, 0], [1, 1, 0, 0], ' +
     '[1, 1, 1, 3]]']
prerenderMode.i = 0
prerenderMode.reset_delay = 5000
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
blockProperties.has_2_fold_symmetry = False
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
blockProperties.background_alpha = 0.2
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
newBlock.color = 'red'
newBlock.color_when_frozen = 'white'
newBlock.shadow_color = 'red'
newBlock.shadow_alpha = 0.2
newBlock.put()

# Deletes all construction block properties entries:
queries = [ConstructionBlockProperties.all()]
for query in queries:
    for result in query:
        result.delete()

# Sets up the construction block properties:
constructionBlockProperties = \
    ConstructionBlockProperties(parent=construction)
constructionBlockProperties.data_version = '0'
constructionBlockProperties.pending_color = 'white'
constructionBlockProperties.real_color = 'green'
constructionBlockProperties.put()

# Deletes all block entries:
queries = [Block.all()]
for query in queries:
    for result in query:
        result.delete()

# Creates block entries:
cs = simplejson.loads(prerenderMode.block_configurations[0])
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
