
BasicGame.WinScreen = function(game) {

    var o = new Phaser.State();

    o.create = function() {
        this.add.sprite(0, 0, 'menuBackground');

        this.backButton = this.add.button(0, 0, 'backButton', this.goBack, this, 1, 0, 2);

        congratsText = this.game.add.text(game.world.centerX, game.world.height*3/8, "Congratulations!");
        // Center align
        congratsText.anchor.set(0.5);
        congratsText.align = 'center';
        // Font style
        congratsText.font = 'Arial Black';
        congratsText.fontSize = 80;
        congratsText.fontWeight = 'bold';
        // Stroke color and thickness, and text fill color
        congratsText.stroke = '#000000';
        congratsText.strokeThickness = 6;
        congratsText.fill = '#1B88FF';

        winText = this.game.add.text(game.world.centerX, game.world.height*4/8, "Level completed in time:");
        // Center align
        winText.anchor.set(0.5);
        winText.align = 'center';
        // Font style
        winText.font = 'Arial Black';
        winText.fontSize = 30;
        winText.fontWeight = 'bold';
        // Stroke color and thickness, and text fill color
        winText.stroke = '#000000';
        winText.strokeThickness = 6;
        winText.fill = '#1B88FF';

        timeText = this.game.add.text(game.world.centerX, game.world.height*5/8, BasicGame.clockString);
        // Center align
        timeText.anchor.set(0.5);
        timeText.align = 'center';
        // Font style
        timeText.font = 'Arial Black';
        timeText.fontSize = 150;
        timeText.fontWeight = 'bold';
        // Stroke color and thickness, and text fill color
        timeText.stroke = '#000000';
        timeText.strokeThickness = 6;
        timeText.fill = '#FF1B1B';

    };

    o.update = function() {

    };

    o.goBack = function() {
        this.state.start('MainMenu');
    }

    return o;
};
