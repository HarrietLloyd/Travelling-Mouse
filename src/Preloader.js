BasicGame.Preloader = function (game) {
    var o = new Phaser.State();

    this.background = null;
    this.preloadBar = null;
    this.ready = false;

    o.preload = function() {

        // The assets that were loaded in Boot.js can be used here.
        //this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');

        // The preloadBar sprite is progressively less cropped as the game assets are loaded in.
        this.load.setPreloadSprite(this.preloadBar);

        // Assets needed in the game:
        this.load.image('instructions_level_1', 'images/instructions_level_1.png');
        this.load.image('instructions_level_2', 'images/instructions_level_2.png');
        this.load.image('instructions_level_3', 'images/instructions_level_3.png');
        this.load.image('instructions_level_4', 'images/instructions_level_4.png');
        this.load.image('instructions_level_5', 'images/instructions_level_5.png');
        this.load.image('instructions_level_6', 'images/instructions_level_6.png');
        this.load.image('mouse1', 'images/player1.png');
        this.load.image('mouse2', 'images/player2.png');
        this.load.image('mouse3', 'images/player3.png');
        this.load.image('mouse4', 'images/player4.png');
        this.load.image('mouse5', 'images/player5.png');
        this.load.image('menuBackground', 'images/menu_background.png');
        this.load.image('cheese', 'images/cheese.png');
        this.load.image('origin', 'images/hole.png');
        this.load.image('point', 'images/point.png');
        this.load.image('point2', 'images/point2.png');
        this.load.image('gameBackground', 'images/background.png');
        this.load.spritesheet('runButton', 'images/button_run.png', 400, 104);
        this.load.spritesheet('button1', 'images/button_level_1.png', 250, 284);
        this.load.spritesheet('button2', 'images/button_level_2.png', 250, 284);
        this.load.spritesheet('button3', 'images/button_level_3.png', 250, 284);
        this.load.spritesheet('button4', 'images/button_level_4.png', 250, 284);
        this.load.spritesheet('button5', 'images/button_level_5.png', 250, 284);
        this.load.spritesheet('backButton', 'images/button_back.png', 201, 200);
    };

    o.create = function() {
        this.state.start('MainMenu');
    }

    return o;
};
