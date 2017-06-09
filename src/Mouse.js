// These are available to myCode
var mouse;
//XXX check 0 < theta < 360
var cos = function(theta) {
    return Math.cos(theta*Math.PI/180);
}
var sin = function(theta) {
    return Math.sin(theta*Math.PI/180);
}
var tan = function(theta) {
    return Math.tan(theta*Math.PI/180);
}
//XXX check -1 < x < 1
var arccos = function(x) {
    return Math.acos(x)*180/Math.PI;
}
var arcsin = function(x) {
    return Math.asin(x)*180/Math.PI;
}
var arctan = function(x) {
    return Math.atan(x)*180/Math.PI;
}
//XXX check that x >= 0
var sqrt = function(x) {
    return Math.sqrt(x);
}
var pow = function(base, exponent) {
    return Math.pow(base, exponent);
}
var abs = function(x){
    return Math.abs(x);
}
var getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

var makeMouse = function(Xposition, Yposition, heading) {
    //XXX
    var Xpos = Xposition;
    var Ypos = Yposition;
    var heading = heading; // between 0 and 360
    var instructions = [];

    var getX = function() {
        return Xpos;
    };
    var getY = function() {
        return Ypos;
    };
    var getDirection = function() {
        return heading;
    };
    var getInstructions = function() {
        return instructions;
    };
    var setDirection = function(dir) {

        heading = dir;
        instructions.push({do:'turn', value:dir, done:false});
    };
    //XXX check dist/dir is a number
    // 0 < dir < 360
    // dir > 0
    var setDistance = function(dist) {
        //XXX
        instructions.push({do:'move', value:dist, done:false});
        if (heading <= 90) {
            var angle = heading;
            Xpos = Xpos + dist*cos(angle);
            Ypos = Ypos + dist*sin(angle);
        } else if (heading <= 180) {
            var angle = heading - 90;
            Xpos = Xpos + dist*cos(angle);
            Ypos = Ypos - dist*sin(angle);
        } else if (heading <= 270) {
            var angle = heading - 180;
            Xpos = Xpos - dist*cos(angle);
            Ypos = Ypos - dist*sin(angle);
        } else {
            var angle = heading - 270;
            Xpos = Xpos - dist*cos(angle);
            Ypos = Ypos + dist*sin(angle);
        }
    };
    var getInstructions = function() {
        return instructions;
    };
    return {
        X: getX,
        Y: getY,
        direction: getDirection,
        faceDirection: setDirection,
        moveDistance: setDistance,
        getInstructions: getInstructions
    };
};

var makeCheeses = function(){ };
