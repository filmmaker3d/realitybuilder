// For the about page.

// Copyright 2010, 2011 Felix E. Klee <felix.klee@inka.de>
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

/*jslint white: true, onevar: true, undef: true, newcap: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, browser: true, nomen: false */

/*global com, realitybuilderDojo, swfobject, videoId */

// If Flash is available, hides all element that should only be shown in case
// Flash is not available. An alternative would be to use a callback function
// that is called when the YouTube player is ready, and to hide the heading and
// other elements there, but then the display "flickers", because loading the
// YouTube player takes a moment. The disadvantage of not using this approach,
// however, is that there may be a case where the YouTube player cannot be
// loaded, and thus neither the video nor the page heading is displayed.
function realityBuilderSetNoFlashDisplay(event) {
    if (event.success) {
        realitybuilderDojo.query('.noFlash').style('display', 'none');
    }
}

swfobject.embedSWF(
    'http://www.youtube.com/v/' + videoId + 
    '&hl=en_US&fs=1&rel=0&color1=0x3a3a3a&' + 
    'color2=0x999999&enablejsapi=1&playerapiid=ytplayer', 
    'ytapiplayer', '425', '344', '8', null, null, 
    {allowScriptAccess: "always"}, 
    {id: "myytplayer"}, 
    realityBuilderSetNoFlashDisplay);
