
var game = new Phaser.Game(480, 320, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });

var player;
var timer = 0;
var total = 0;
var score = 0;
var frutas;
var scoreText;

function preload() {

    game.load.image('cenario', 'assets/pics/cenario.png');
    game.load.image('fruta_boa', 'assets/pics/fruta_boa.png');
    game.load.image('cesta', 'assets/pics/cesta.png');

}

function create() {

    // incializa o sistema de física
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // adiciona o background
    game.add.sprite(0, 0, 'cenario');

    // Adiciona o jogador
    player = game.add.sprite(300, 240, 'cesta');
    game.physics.arcade.enable(player);
    player.enableBody = true;
    player.body.collideWorldBounds = true;

    // Adiciona as frutas
    frutas = game.add.group();
    frutas.enableBody = true;
    frutas.physicsBodyType = Phaser.Physics.ARCADE;

    // Adiciona a pontuação
    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#f3fbfe' });
}

function criarNovaFruta() {

    var x = game.world.randomX;
    var fruta = frutas.create(x, -20, 'fruta_boa');

    fruta.angle = game.rnd.angle();

    game.physics.arcade.accelerateToXY(fruta, x, 400, 100);

    total++;
    timer = game.time.now + 2000;
}

function pegouFrutra(inPlayer, inFruta) {
    console.log("pegou!!!!");
    total--;
    score++;

    scoreText.text = 'Score: ' + score;

    inPlayer.body.velocity.y = -20;

    inFruta.kill();

}

function destruirFrutasForaDaTela(fruta) {
    if (fruta.world.y > 320) {
        fruta.kill();
        total--;
    }
}


function update() {

    // movimento da cesta do jogador

    if (game.input.pointer1.isDown) {
      if (game.input.pointer1.worldX > 240) {
           player.body.velocity.x = 150;
      }

      if (game.input.pointer1.worldX <= 240) {
           player.body.velocity.x = -150;
      }
    }

    // se a cesta estiver na posição Y original, cancele o movimento vertical...

    if (player.world.y <= 240) {
        player.body.velocity.y = 0;
    }

    // Criar mais frutinhas

    if (total < 50  && game.time.now > timer)
    {
        criarNovaFruta();
    }

    // Checar colisão

    game.physics.arcade.collide(player, frutas, pegouFrutra);

    frutas.forEach(destruirFrutasForaDaTela, this);


}
