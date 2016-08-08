/**
 * Created by funfungo on 16/6/10.
 */
var util = {
    norm: function (value, min, max) {
        return (value - min) / (max - min);
    },
    lerp: function (norm, min, max) {
        return min + norm * (max - min);
    },
    map: function (value, sourceMin, sourceMax, destMin, destMax) {
        return this.lerp(this.norm(value, sourceMin, sourceMax), destMin, destMax);
    },
    clamp: function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    },
    distance: function (x0, y0, x1, y1) {
        var dx = x0 - x1;
        var dy = y0 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    },
    randomRange: function (min, max) {
        return min + Math.random() * (max - min);
    },
    randomInt: function (min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    },
    degreesToRads: function (degrees) {
        return degress / 180 * Math.PI
    },
    radsToDegrees: function (radians) {
        return radians * 180 / Math.PI;
    },
    roundToPlaces: function (value, places) {
        var mult = Math.pow(10, places);
        return Math.round(value * mult) / mult;
    },
    roundNearest: function (value, nearest) {
        return Math.round(value / nearest) * nearest;
    }
};
