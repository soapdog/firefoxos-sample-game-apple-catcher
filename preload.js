/**
 *
 * Esse é o pre-loader do aplicativo. Ele é resposável por garantir que os gráficos do app
 * estão na memória antes do jogo começar.
 */

var FruitGame = {};

FruitGame.Preloader = function(game) {};

FruitGame.Preloader.prototype = {

    preload: function() {
        this.load.image('cenario', 'assets/pics/cenario.png');
        this.load.image('fruta_boa', 'assets/pics/fruta_boa.png');
        this.load.image('fruta_ruim', 'assets/pics/fruta_ruim.png');
        this.load.image('cesta', 'assets/pics/cesta.png');
        this.load.image('logo', 'assets/pics/logo_2.png');
        this.load.image('start', 'assets/pics/start_btn.png');
    },
    update: function() {
        this.state.start('Menu');
    }


}