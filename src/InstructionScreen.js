
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

    };

    o.update = function() {

    };

    o.startGame = function() {
        this.state.start('Game', true, false, level);
    };

    o.goBack = function() {
        this.state.start('MainMenu');
    }

    return o;
};
