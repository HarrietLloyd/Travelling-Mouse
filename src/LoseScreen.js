
BasicGame.LoseScreen = function(game) {

    var o = new Phaser.State();

    o.create = function() {
        this.add.sprite(0, 0, 'menuBackground');

        this.backButton = this.add.button(0, 0, 'backButton', this.goBack, this, 1, 0, 2);

        congratsText = this.game.add.text(game.world.centerX, game.world.height*3/8, "Oh no!");
        // Center align
        congratsText.anchor.set(0.5);
        congratsText.align = 'center';
        // Font style
        congratsText.font = 'Arial Black';
        congratsText.fontSize = 100;
        congratsText.fontWeight = 'bold';
        // Stroke color and thickness, and text fill color
        congratsText.stroke = '#000000';
        congratsText.strokeThickness = 6;
        congratsText.fill = '#FF1B1B';

        loseText = this.game.add.text(game.world.centerX, game.world.height*4/8, "Your mouse didn't eat the cheese.");
        // Center align
        loseText.anchor.set(0.5);
        loseText.align = 'center';
        // Font style
        loseText.font = 'Arial Black';
        loseText.fontSize = 30;
        loseText.fontWeight = 'bold';
        // Stroke color and thickness, and text fill color
        loseText.stroke = '#000000';
        loseText.strokeThickness = 6;
        loseText.fill = '#1B88FF';

    };

    o.update = function() {

    };

    o.goBack = function() {
        this.state.start('MainMenu');
    }

    return o;
};
