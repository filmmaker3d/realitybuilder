// AMD plus web pattern, according to:
//
//   https://github.com/umdjs/umd/blob/master/amdWeb.js

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        root.realityBuilder = factory();
    }
}(this, function () {
