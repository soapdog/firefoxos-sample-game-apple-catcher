FruitGame.Game = function(game) {};

FruitGame.Game.prototype = {
    create: function() {
        /*
        Nessa função inicializamos o ambiente (World) do jogo.
         */
        this.timer = 0;
        this.total = 0;
        this.score = 0;
        // incializa o sistema de física
        this.physics.startSystem(Phaser.Physics.ARCADE);

        // adiciona o background
        this.add.sprite(0, 0, 'cenario');

        // Adiciona o jogador
        this.player = this.add.sprite(300, 240, 'cesta');
        this.physics.arcade.enable(this.player);
        this.player.enableBody = true;
        this.player.body.collideWorldBounds = true;

        // Adiciona as frutas
        this.frutas = this.add.group();
        this.frutas.enableBody = true;
        this.frutas.physicsBodyType = Phaser.Physics.ARCADE;

        // Adiciona as estragadas
        this.estragadas = this.add.group();
        this.estragadas.enableBody = true;
        this.estragadas.physicsBodyType = Phaser.Physics.ARCADE;

        // Adiciona a pontuação
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#f3fbfe' });

        this.cursors = this.input.keyboard.createCursorKeys()
    },

    criarNovaFruta: function() {
        /*
        Essa função cria uma nova fruta um pouco acima da tela visivel.
        Existe 60% de chance da fruta ser boa.

        Frutas boas valem 1 ponto
        Frutas estragadas valem -10 pontos.
         */
        var x = this.world.randomX;
        var fruta;
        var chance = Math.random() * 100;

        if (chance < 60) {
            fruta = this.frutas.create(x, -20, 'fruta_boa');
        } else {
            fruta = this.estragadas.create(x, -40, 'fruta_ruim');
        }

        fruta.angle = this.rnd.angle();
        fruta.body.mass = 20;

        this.physics.arcade.accelerateToXY(fruta, x, 400, 100);

        this.total++;
        this.timer = this.time.now + 2000;
    },

    pegouFruta: function(inPlayer, inFruta) {
        /*
        Essa função é chamada na colisão da fruta boa com a cesta.
         */
        console.log("pegou!!!!");
        this.total--;
        this.score++;

        this.scoreText.text = 'Score: ' + this.score;

        inPlayer.body.velocity.y = -20;

        inFruta.kill();

    },

    pegouEstragada: function(inPlayer, inFruta) {
        /*
        Essa função é chamada na colisão da fruta estragada com a cesta.
         */
        console.log("Rodou!!!!");
        this.total--;
        this.score -= 10;

        this.scoreText.text = 'Score: ' + this.score;

        inPlayer.body.velocity.y = -20;

        inFruta.kill();

    },

    destruirFrutasForaDaTela: function(fruta) {
        /*
        Essa função é chamada a todo update da tela e tem como função destruir
        as frutas que já cairam abaixo da tela visível.
         */
        if (fruta.world.y > 320) {
            fruta.kill();
            this.total--;
        }
    },


    update: function() {
        /*
        Essa função é chamada em um loop para construir a tela do jogo.
        Ela é chamada com "requestanimationframe()" que é o método mais indicado para a construção
        de game loops com canvas.
         */
        // movimento da cesta do jogador com toque

        if (this.input.pointer1.isDown) {
            if (this.input.pointer1.worldX > 240) {
                this.player.body.velocity.x = 150;
            }

            if (this.input.pointer1.worldX <= 240) {
                this.player.body.velocity.x = -150;
            }
        }

        // Movimento da cesta do jogador com teclado

        if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
        }

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
        }


        // se a cesta estiver na posição Y original, cancele o movimento vertical...

        if (this.player.world.y <= 240) {
            this.player.body.velocity.y = 0;
        }

        // Criar mais frutinhas

        if (this.total < 50 && this.time.now > this.timer) {
            this.criarNovaFruta();
        }

        // Checar colisões

        this.physics.arcade.collide(this.player, this.frutas, this.pegouFruta, null, this);
        this.physics.arcade.collide(this.player, this.estragadas, this.pegouEstragada, null, this);

        // Destruir frutas fora da tela
        this.frutas.forEach(this.destruirFrutasForaDaTela, this);
        this.estragadas.forEach(this.destruirFrutasForaDaTela, this);

    }

}
