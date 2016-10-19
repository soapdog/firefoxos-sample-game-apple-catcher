/**
 * Esse é o arquivo de inicialização do jogo. Ele registra os diversos possíveis estados do jogo
 * "preload", "menu", "game" e inicializa o preloader.
 *
 * Ele também inicializa o canvas utilizado.
 *
 */


var game = new Phaser.Game(480, 320, Phaser.CANVAS, 'game');

game.state.add('Preloader', FruitGame.Preloader);
game.state.add('Menu', FruitGame.Menu);
game.state.add('Game', FruitGame.Game);

//	Now start the Boot state.
game.state.start('Preloader');

