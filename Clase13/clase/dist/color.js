"use strict";
var generateRandom = function () {
    return Math.floor(Math.random() * 255);
};
var Color = /** @class */ (function () {
    function Color() {
        this.rgb = "".concat(generateRandom(), ", ").concat(generateRandom(), ", ").concat(generateRandom());
    }
    return Color;
}());
var color1 = new Color();
var color2 = new Color();
console.log(color1, color2);
