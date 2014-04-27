FruitGame.Menu = function(game) {};

FruitGame.Menu.prototype = {

    create: function() {
       this.add.sprite(0, 0, 'cenario');
       this.add.sprite(50, 10, 'logo');
       this.playButton = this.add.button(180, 200, 'start', this.startGame, this);
    },
    startGame: function (pointer) {
        //	And start the actual game
        this.state.start('Game');
    }


}
