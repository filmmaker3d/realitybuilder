@ECHO OFF

REM Checks a JavaScript file with JSLint.

REM Felix E. Klee <felix.klee@inka.de>

SET FILE=%CD%\%1

PUSHD %~pd0

java -classpath ../dojo-release-1.4.3-src/util/shrinksafe/js.jar;../dojo-release-1.4.3-src/util/shrinksafe/shrinksafe.jar org.mozilla.javascript.tools.shell.Main jslint.js "%FILE%"

POPD