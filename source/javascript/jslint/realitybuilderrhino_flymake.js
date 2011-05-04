// Modified "rhino.js" (2009-09-11) under the assumption that this file is
// distributed under the same license as the "fulljslint.js".

// Felix E. Klee <felix.klee@inka.de>

// Original copyright notice:

/*
Copyright (c) 2002 Douglas Crockford  (www.JSLint.com) Rhino Edition
*/

// This is the Rhino companion to fulljslint.js.

/*global JSLINT */
/*jslint rhino: true, strict: false */

var options = {passfail: true, undef: true, eqeqeq: true, bitwise: true, 
    regexp: true, newcap: true, immed: true, strict: true, browser: true,
    plusplus: true, onevar: true,
    predef: ['com', 'dojo', 'dojox', 'G_vmlCanvasManager']};

(function (a) {
    var e, i, input;
    if (!a[0]) {
        print("Usage: jslint.js file.js");
        quit(1);
    }
    input = readFile(a[0]);
    if (!input) {
        print("jslint: Couldn't open file '" + a[0] + "'.");
        quit(1);
    }
    if (!JSLINT(input, options)) {
        for (i = 0; i < JSLINT.errors.length; i += 1) {
            e = JSLINT.errors[i];
            if (e) {
                print('Lint at line ' + e.line + ' character ' +
                        e.character + ': ' + e.reason);
                print((e.evidence || '').
                        replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
                print('');
            }
        }
        quit(2);
    } else {
        print("jslint: No problems found in " + a[0]);
        quit();
    }
}(arguments));