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
        return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
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
    }
};
