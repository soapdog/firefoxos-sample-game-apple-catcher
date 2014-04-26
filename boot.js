var game = new Phaser.Game(480, 320, Phaser.CANVAS, 'game');

game.state.add('Preloader', FruitGame.Preloader);
game.state.add('Menu', FruitGame.Menu);
game.state.add('Game', FruitGame.Game);

//	Now start the Boot state.
game.state.start('Preloader');

