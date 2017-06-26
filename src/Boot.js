BasicGame = {

    // Global variables that persist through State changes.
    clockString: "",
    milliseconds: 0,
    editor: null,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false

};

BasicGame.Boot = function (game) {
    var o = new Phaser.State();

    o.gameResized = function(scale, parentBounds) {
        var hTrim = 0;
        var vTrim = 1;
        var newScale = 1;
        if (0.5*window.innerWidth / window.innerHeight > 8/9) {
            newScale = window.innerHeight / game.height;
        } else {
            newScale = 0.5*window.innerWidth / game.width;
        }
        scale.setUserScale(newScale, newScale, hTrim, vTrim);
    };

    o.init = function() {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.scale.setResizeCallback(o.gameResized, this);

        if (!this.game.device.desktop) {
            this.scale.forceOrientation(true, false);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }

        // Set up the editor
        BasicGame.editor = ace.edit("editor");
        BasicGame.editor.setTheme("ace/theme/monokai");
        BasicGame.editor.getSession().setMode("ace/mode/javascript");

    };

    o.preload = function() {
        this.load.image('preloaderBar', 'images/preloader_bar.png');
    };

    o.create = function() {
        this.state.start('Preloader');
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
