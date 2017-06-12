//XXX destroy stuff when leaving state.

BasicGame.Game = function (game) {

    // Reserved words (properties this State already has):

    this.game;      // a reference to the currently running game
    this.add;       // used to add sprites, text, groups, etc
    this.camera;    // a reference to the game camera
    this.cache;     // the game cache
    this.input;     // the global input manager (including this.input.keyboard, this.input.mouse)
    this.load;      // for preloading assets
    this.math;      // lots of useful common math operations
    this.sound;     // the sound manager - add a sound, play one, set-up markers
    this.stage;     // the game stage
    this.time;      // the clock
    this.tweens;    // the tween manager
    this.world;     // the game world
    this.particles; // the particle manager
    this.physics;   // the physics manager
    this.rnd;       // the repeatable random number generator

    var o = new Phaser.State();

    // Private Variables:
    var ERRORTOLERANCE = 1;
    var ANGLETOLERANCE = 0.02;
    var TILESIZE = 56.88;
    var bottomLeft = {x : 23 + TILESIZE/2, y : 1057 - TILESIZE/2};
    var gameOrigin = {x : 23 + TILESIZE, y : 1057 - TILESIZE};
    var numMouseRows = 16;
    var numMouseCols = 32;
    var mouseOrigin = {x: 0, y:0};
    var mouseSprite;
    var originSprite;
    var cheeseSprites = [];
    var cheeses = [];
    var instructions;
    var instruction;
    var level;
    var clock;

    // Private Methods
    var toGameCoords = function(Xpos, Ypos) {
        var x = gameOrigin.x + Xpos*TILESIZE;
        var y = gameOrigin.y - Ypos*TILESIZE;
        return {x, y};
    };
    var toMouseCoords = function(Xpixel, Ypixel) {
        var x = (Xpixel - gameOrigin.x)/TILESIZE;
        var y = (gameOrigin.y - Ypixel)/TILESIZE;
        return {x, y};
    };
    var toGameAngle = function(angle) {
        //XXX assert 0 <= angle <= 360
        var theta = 2*Math.PI - angle*Math.PI/180;
        return theta;
    };
    var toMouseAngle = function(theta){
        //XXX assert 0 <= angle <= 2pi
        var angle = 360 - theta*180/Math.PI;
        return angle;
    }
    var updateClock = function(elapsedSeconds) {
        var clockTime = Math.floor(elapsedSeconds);
        var minutes = Math.floor(clockTime / 60);
        var seconds = clockTime % 60;
        var milliseconds = Math.floor(60*(elapsedSeconds - clockTime));
        BasicGame.clockString = "";
        if (seconds < 10) {
            BasicGame.clockString = minutes + ' : 0' + seconds;
        } else {
            BasicGame.clockString = minutes + ' : ' + seconds;
        }
        if (milliseconds < 10) {
            BasicGame.clockString = BasicGame.clockString + ' : 0' + milliseconds;
        } else {
            BasicGame.clockString = BasicGame.clockString + ' : ' + milliseconds;
        }
        clock.setText(BasicGame.clockString);
        return;
    };

    var eatCheese = function(){
        cheeseSprites.forEach(function(cheeseSprite) {
            if (cheeseSprite !== null) {
                var dx = abs(mouseSprite.x - cheeseSprite.x);
                var dy = abs(mouseSprite.y - cheeseSprite.y);
                if ((dx < ERRORTOLERANCE) && (dy < ERRORTOLERANCE)) {
                    // Remove cheeseSprite.
                    cheeseSprite.destroy();
                }
            }
        });
        return;
    };

    var winCheck = function() {

    }

    // Set up the direction to turn in.
    var prepareToTurn = function() {
        var targetTheta = instruction.value;
        if ((0 <= targetTheta)&&(targetTheta < Math.PI)) {
            // Split the circle in half and determine which half the mouse is in.
            var backTheta = targetTheta + Math.PI;
            if ((targetTheta <= mouseSprite.rotation)&&(mouseSprite.rotation <= backTheta)) {
                instruction.turndelta = (-1);   // go anticlockwise
            } else {
                instruction.turndelta = 1;      // go clockwise
            }
        } else if ((Math.PI <= targetTheta)&&(targetTheta <= 2*Math.PI)) {
            // Split the circle in half and determine which half the mouse is in.
            var backTheta = targetTheta - Math.PI;
            if ((mouseSprite.rotation <= targetTheta)&&(backTheta <= mouseSprite.rotation)) {
                instruction.turndelta = 1;      // go clockwise
            } else {
                instruction.turndelta = (-1);   // go anticlockwise
            }
        }else{
            console.log("Something went wrong. targetTheta is:")
            console.log(targetTheta);
            console.log("...but was expected to be between 0 and 6.28");
        }
        instruction.started = true;
        return;
    }

    // Turn the mouse towards the instructed target angle
    var turn = function() {
        if (abs(mouseSprite.rotation - instruction.value) < ANGLETOLERANCE) {
            // ...then we're close enough to the target angle, and can finish turning.
            mouseSprite.rotation = instruction.value;
            instruction.done = true;
        } else {
            // Keep turning the mouse.
            mouseSprite.rotation = mouseSprite.rotation + instruction.turndelta*ANGLETOLERANCE;
            mouseSprite.rotation = mod(mouseSprite.rotation, 2*Math.PI);
        }
        return;
    }

    // Set up the end point the mouse is aiming for.
    var prepareToMove = function() {
        // Calculate the end point.
        var distance = instruction.value*TILESIZE;
        instruction.endPoint.x = mouseSprite.x + distance*Math.cos(mouseSprite.rotation);
        instruction.endPoint.y = mouseSprite.y + distance*Math.sin(mouseSprite.rotation);

        instruction.started = true;

        console.log("Mouse is moving towards this end point:");
        var mouseCoord = toMouseCoords(instruction.endPoint.x, instruction.endPoint.y);
        console.log("x: " + (+(mouseCoord.x).toFixed(12)) );
        console.log("y: " + (+(mouseCoord.y).toFixed(12)) );
        return;
    }

    // Move the mouse closer to the end point.
    var move = function() {
        var Xdist = abs(mouseSprite.x - instruction.endPoint.x);
        var Ydist = abs(mouseSprite.y - instruction.endPoint.y);
        if ((Xdist < ERRORTOLERANCE) && (Ydist < ERRORTOLERANCE)) {
            // ...then we're close enough to the target position. Teleport there.
            mouseSprite.x = instruction.endPoint.x;
            mouseSprite.y = instruction.endPoint.y;
            instruction.done = true;
        } else {
            // Keep moving the mouse.
            mouseSprite.x = mouseSprite.x + Math.cos(mouseSprite.rotation);
            mouseSprite.y = mouseSprite.y + Math.sin(mouseSprite.rotation);
        }
        return;
    }

    // Public Methods
    o.init = function(lvl) {
        level = lvl;
    };

    o.create = function() {
        if (level === 1) {
            mouseOrigin = {x:0, y:0};
            cheeses[0] = {x:4, y:3};
        } else if (level === 2) {
            mouseOrigin = {x:5, y:12};
            cheeses[0] = {x:14, y:10};
        } else if (level === 3) {
            mouseOrigin = {x: getRandomInt(0,33), y: getRandomInt(0,17)};
            cheeses[0] = {x: getRandomInt(0,33), y:getRandomInt(0,17)};
        } else if (level === 4) {
            mouseOrigin = {x: 32, y: 16};
            cheeses[0] = {x: 32, y: 0};
        } else if (level === 5) {
            mouseOrigin.y = getRandomInt(0,17);
            mouseOrigin.x = getRandomInt(0,33);
        }

        mouse = makeMouse(mouseOrigin.x, mouseOrigin.y, 0);

        this.add.sprite(0, 0, 'gameBackground');

        // Add the origin picture.
        originSprite = this.add.sprite(0, 0, 'origin');
        originSprite.anchor.setTo(0.5,0.5);
        originSprite.x = bottomLeft.x;
        originSprite.y = bottomLeft.y;

        // Add the cheeses.
        for(var i = 0; i < cheeses.length; i++) {
            var spriteCoord = toGameCoords(cheeses[i].x, cheeses[i].y);
            cheeseSprites[i] = this.add.sprite(spriteCoord.x, spriteCoord.y, 'cheese');
            cheeseSprites[i].anchor.setTo(0.5,0.5);
        }

        // Add the axes.
        for (var i = 0; i < numMouseCols; i++) {
            var colText = this.game.add.text(0, 0, "" + i, {align:'center', font:'Arial Black', fontSize:30, stroke:'#000000', strokeThickness: 6, fill: '#1B88FF'});
            colText.anchor.set(0.5);
            colText.alpha = 0.5;
            colText.x = gameOrigin.x + i*TILESIZE;
            colText.y = gameOrigin.y + TILESIZE/2;
        }
        for (var i = 0; i < numMouseRows; i++) {
            var rowText = this.game.add.text(0, 0, "" + i, {align:'center', font:'Arial Black', fontSize:30, stroke:'#000000', strokeThickness: 6, fill: '#1B88FF'});
            rowText.anchor.set(0.5);
            rowText.alpha = 0.5;
            rowText.x = gameOrigin.x - TILESIZE/2;
            rowText.y = gameOrigin.y - i*TILESIZE + 1;
        }
        var axes = this.game.add.graphics(gameOrigin.x,gameOrigin.y);
        axes.lineStyle(5, 0x1B88FF, 1);
        axes.lineTo(numMouseCols*TILESIZE, 0);
        axes.moveTo(0,0);
        axes.lineTo(0, -numMouseRows*TILESIZE);

        // Add the mouse.
        mouseSprite = this.add.sprite(this.world.centerX, this.world.centerY, 'mouse' + level);
        mouseSprite.anchor.setTo(0.6,0.5);
        var mouseSpriteCoord = toGameCoords(mouseOrigin.x, mouseOrigin.y);
        mouseSprite.x = mouseSpriteCoord.x;
        mouseSprite.y = mouseSpriteCoord.y;
        var mousePointSprite = this.add.sprite(mouseSprite.x, mouseSprite.y, 'point2');
        mousePointSprite.anchor.setTo(0.5,0.5);

        // Add the points.
        for (var i = 0; i < cheeses.length; i++) {
            // A dot to show the exact location of the point.
            var spriteCoord = toGameCoords(cheeses[i].x, cheeses[i].y);
            var pointSprite = this.add.sprite(spriteCoord.x, spriteCoord.y, 'point');
            pointSprite.anchor.setTo(0.5,0.5);

            // Text to show the coordinate of the point.
            var pointText = this.game.add.text(0, 0, "( "+cheeses[i].x+", "+cheeses[i].y+")", {align:'center', font:'Arial Black', fontSize:30, stroke:'#000000', strokeThickness: 6, fill: '#1B88FF'});
            pointText.x = spriteCoord.x+5;
            pointText.y = spriteCoord.y-5;
        }

        // Add the back button.
        this.backButton = this.add.button(0, 0, 'backButton', this.quitGame, this, 1, 0, 2);

        //XXX check that my-code exists somewhere?

        // Run the instruction code.
        myCode();

        // Make the instructions useable
        instructions = mouse.getInstructions();
        if (instructions.length === 0) {
            console.log("ERROR: Your code isn't giving the mouse any instructions!");
            this.state.start('MainMenu');
            instruction = {do: 'turn', value: 0, done: true}; // A dummy instruction for the update method
        } else {
            instructions.forEach(function(instr) {
                if (instr.do === 'turn') {
                    instr.value = toGameAngle(instr.value);
                    instr.started = false;
                    instr.turndelta = 1;
                } else if (instr.do === 'move') {
                    instr.started = false;
                    instr.endPoint = {x: 0, y: 0};
                }
            });
            instruction = instructions.shift();
        }
        clock = this.game.add.text(game.world.centerX, 50, "clock");

        // Center align
        clock.anchor.set(0.5);
        clock.align = 'center';

        // Font style
        clock.font = 'Arial Black';
        clock.fontSize = 50;
        clock.fontWeight = 'bold';

        // Stroke color and thickness
        clock.stroke = '#000000';
        clock.strokeThickness = 6;
        clock.fill = '#FFFFFF';

        this.game.time.reset();

    };

    o.update = function() {
        updateClock(this.game.time.totalElapsedSeconds());
        if (instruction.done === true) {
            eatCheese();
            if (instructions.length > 0) {
                // Cue the next instruction.
                instruction = instructions.shift();
            } else {
                // ...all instructions are completed. Check for win or loss.
                console.log("All instructions completed.");
                var allCheesesEaten = true;
                cheeseSprites.forEach(function(cheeseSprite) {
                    if (cheeseSprite.alive === true) {
                        allCheesesEaten = false;
                    }
                });
                if (allCheesesEaten === true) {
                    this.state.start('WinScreen');
                } else {
                    this.state.start('LoseScreen');
                }
            }
        } else {
            if (instruction.do === 'turn') {
                if (instruction.started === false) {
                    prepareToTurn();
                } else {
                    turn();
                }
            } else if (instruction.do === 'move') {
                if (instruction.started === false) {
                    prepareToMove();
                } else {
                    move();
                }
            } else {
                // Shouldn't get here
                console.log("Something went wrong. instruction.do is: " + instruction.do);
            }
        }
    };

    o.quitGame = function() {
        // XXX destroy anything no longer needed.
        // Stop music, delete sprites, purge caches, free resources, etc.

        // Return to the main menu.
        this.state.start('MainMenu');
    };

    return o;
};
