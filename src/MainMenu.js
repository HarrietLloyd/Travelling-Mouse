
BasicGame.MainMenu = function (game) {

    this.music = null;
    this.playButton = null;

    var o = new Phaser.State();

    o.create = function() {
        this.add.sprite(0, 0, 'menuBackground');

        this.Button1 = this.add.button(this.world.centerX, this.world.centerY, 'button1', levelCallBack(1), this, 1, 0, 2);
        this.Button2 = this.add.button(this.world.centerX, this.world.centerY, 'button2', levelCallBack(2), this, 1, 0, 2);
        this.Button3 = this.add.button(this.world.centerX, this.world.centerY, 'button3', levelCallBack(3), this, 1, 0, 2);
        this.Button4 = this.add.button(this.world.centerX, this.world.centerY, 'button4', levelCallBack(4), this, 1, 0, 2);
        this.Button5 = this.add.button(this.world.centerX, this.world.centerY, 'button5', levelCallBack(5), this, 1, 0, 2);
        this.Button1.anchor.setTo(0.5,0.5);
        this.Button2.anchor.setTo(0.5,0.5);
        this.Button3.anchor.setTo(0.5,0.5);
        this.Button4.anchor.setTo(0.5,0.5);
        this.Button5.anchor.setTo(0.5,0.5);
        this.Button1.x = this.world.width*20/100;
        this.Button2.x = this.world.width*50/100;
        this.Button3.x = this.world.width*80/100;
        this.Button4.x = this.world.width*20/100;
        this.Button5.x = this.world.width*50/100;

        this.Button1.y = this.world.height*40/100;
        this.Button2.y = this.world.height*40/100;
        this.Button3.y = this.world.height*40/100;
        this.Button4.y = this.world.height*75/100;
        this.Button5.y = this.world.height*75/100;

    };

    o.update = function() {

    };

    o.clickLevel = function(level) {
        this.state.start('Level'+level, true, false, level);
    };

    var levelCallBack = function(level) {
        return function() { o.clickLevel(level) };
    }

    return o;
};
