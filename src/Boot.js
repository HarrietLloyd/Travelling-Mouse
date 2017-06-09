BasicGame = {

    // Global variables that persist through State changes.
    clockString: "",
    milliseconds: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false

};

BasicGame.Boot = function (game) {
    var o = new Phaser.State();

    o.init = function() {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(480, 270, 1920, 1080);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        if (!this.game.device.desktop) {
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
    };

    o.preload = function() {
        this.load.image('preloaderBar', 'images/preloader_bar.png');
    };

    o.create = function() {
        this.state.start('Preloader');
    };

    o.gameResized = function(width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.

    };

    o.enterIncorrectOrientation = function() {

        BasicGame.orientated = false;
        document.getElementById('orientation').style.display = 'block';

    };
    o.leaveIncorrectOrientation = function() {

        BasicGame.orientated = true;
        document.getElementById('orientation').style.display = 'none';

    };
    return o;
};
