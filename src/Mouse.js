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
var mod = function(x, m){
    return ((x % m) + m) % m
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
    var heading = heading; // between 0 and 360 degrees
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

    // Set 0 <= heading <= 360 then add a turn instruction
    var setDirection = function(dir) {
        // Check dir is a number.
        if (typeof dir !== 'number') {
            console.log("ERROR: The direction you told the mouse to face wasn't a number.");
            console.log("It was a '" + (typeof dir) + "' and looks like this:");
            console.log(dir);
            dir = 0;
        }
        // Set 0 <= heading <= 360.
        heading = mod(dir, 360);
        // Add the turn instruction.
        instructions.push({do:'turn', value:heading, done:false});
    };
    var setDistance = function(dist) {
        //XXX make sure negative directions work.

        // Check dist is a number.
        if (typeof dist !== 'number') {
            console.log("ERROR: The distance you told the mouse to move wasn't a number.");
            console.log("It was a '" + (typeof dist) + "' and looks like this:");
            console.log(dist);
            dist = 0;
        }

        // Add the move instruction.
        instructions.push({do:'move', value:dist, done:false});

        // Update the Mouse oject's position.
        Xpos = Xpos + dist*cos(heading);
        Ypos = Ypos + dist*sin(heading);
    };
    var getInstructions = function() {
        return instructions;
    };
    return {
        X: getX,
        Y: getY,
        direction: getDirection,
        faceDirection: setDirection,
        moveForward: setDistance,
        getInstructions: getInstructions
    };
};

var makeCheeses = function(){ };
