
BasicGame.InstructionScreen = function(game) {

    this.music = null;
    this.runButton = null;

    var o = new Phaser.State();
    var level;

    o.init = function(lvl) {
        level = lvl;
    }

    o.create = function() {
        this.add.sprite(0, 0, 'instructions_level_' + level);

        this.runButton = this.add.button(this.world.centerX - 400/2, this.world.height - 110, 'runButton', o.startGame, this, 1, 0, 2);
        this.backButton = this.add.button(0, 0, 'backButton', this.goBack, this, 1, 0, 2);
        var storedCode = localStorage.getItem("code_level_" + level);
        if ( (storedCode === null) || (storedCode === "") ){
            localStorage.setItem("code_level_" + level, "// This is (name)'s code for level " + level + "\n");
            //XXX name should be user input
        }
        BasicGame.editor.setValue(localStorage.getItem("code_level_" + level));
    };

    o.update = function() {

    };

    o.startGame = function() {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("code_level_" + level, BasicGame.editor.getValue());
        } else {
            //XXX No web storage. Show a warning maybe?
        }
        this.state.start('Game', true, false, level);
    };

    o.goBack = function() {
        this.state.start('MainMenu');
    }

    return o;
};
