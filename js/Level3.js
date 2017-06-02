
/* Trabalho de Desenvolvimento de Games 
Professor Gabriel Militello IBTA - Paulista
Grupo Maran007 - 
Aluno: Leonardo Gustavo Maran
RA: 14000820 - CCO
*/

var level3 = function (game) {
};
level3.prototype = {
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //fundo
        background = game.add.sprite(0, 0, 'fundo3');
        //plataformas
		
		this.invisibleWalls = game.add.group();
        this.invisibleWalls.enableBody = true;
        game.world.bringToTop(this.invisibleWalls);
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
          for (var i = 0; i < 600 / 40; i++) {
            for (var j = 0; j < 800 / 40; j++) {

                var tileLine = this.tileArray()[i];
                var tile = tileLine[j];

                switch (tile) {
                    case "0":
                        var ground = this.platforms.create(j * 40, i * 40, this.tileType()[tile]);
                        ground.body.immovable = true;
                        break;
                    case "e":
                        this.enemyPositions.push({ x: j * 40, y: i * 40 });
                        game.add.sprite(j * 40, i * 40, this.tileType()[tile]);
                        break;
					 case "t":
                        this.trumpPositions.push({ x: j * 40, y: i * 40 });
                        game.add.sprite(j * 40, i * 40, this.tileType()[tile]);
                        break;
                    case "i":
                        var iWall = this.invisibleWalls.create(j * 40, i * 40, 'iwall');
                        iWall.body.immovable = true;
                        game.add.sprite(j * 40, i * 40, this.tileType()[tile]);
                        break;
                    default:
                       // game.add.sprite(j * 40, i * 40, 'wall');
                        break;
                }
            }
        }
        //Personagem
        this.player = game.add.sprite(60, game.world.height - 150, 'soldier');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 315;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0, 1, 2,], 10, true);
        this.player.animations.add('right', [3, 4, 5, ], 10, true);
		
		
		
        //Uranios
        this.uranios = game.add.group();
        this.uranios.enableBody = true;
        //Posições dos uranios e ogivas
        for (var i = 0; i < 800 / 40; i++) {
            var pUranio = this.uranioArray()[i];
            if (pUranio == "U") {
                var uranio = this.uranios.create(i * 40, 0, 'uranio');
                uranio.body.gravity.y = 300;
                uranio.body.bounce.y = 0.5 + Math.random() * 0.2;
                uranio.animations.add('spin', [0, 1, 2, 3, 4, 5, 6,7], 8, true);
                uranio.animations.play('spin');
            } else if (pUranio == "O") {
                //Ogiva
                this.ogiveLevel = game.add.sprite(i * 40, 0, 'ogive');
                this.ogiveLevel.enableBody = true;
                game.physics.arcade.enable(this.ogiveLevel);
                this.ogiveLevel.body.gravity.y = 300;
                this.ogiveLevel.body.bounce.y = 0.7 + Math.random() * 0.2;
            }
        }
        //TEXTO
        this.scoreText = game.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#333'
        });
        this.OgiveText = game.add.text(16, 48, 'Ogivas: 0', {
            fontSize: '32px',
            fill: '#333'
        });
        //BOTOES
        this.cursors = game.input.keyboard.createCursorKeys();
        this.jumpBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		
		  this.enemies = game.add.group();
        this.enemies.enableBody = true;

        for (var index in this.enemyPositions) {

            var coord = this.enemyPositions[index];
            var enemy = this.enemies.create(coord.x, coord.y - 10, 'tank');
            enemy.body.gravity.y = 300;

            enemy.animations.add('left', [0, 1,2], 10, true);
            enemy.animations.add('right', [3, 4,5], 10, true);

            enemy.body.velocity.x = 50;
            enemy.animations.play('right');
            
        }
		
		
		this.trump = game.add.group();
        this.trump.enableBody = true;

        for (var index in this.trumpPositions) {

            var coord = this.trumpPositions[index];
            var trumps = this.trump.create(coord.x, coord.y - 10, 'un');
            trumps.body.gravity.y = 300;

            trumps.animations.add('left', [0, 1,2], 10, true);
            trumps.animations.add('right', [3, 4,5], 10, true);

            trumps.body.velocity.x = 50;
            trumps.animations.play('right');
            
        }
		
		 this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('enableBody', true);

		
	
    },
    update: function () {
        //Colisões
		game.physics.arcade.collide(this.trump, this.invisibleWalls, iWallHit);
		game.physics.arcade.collide(this.enemies, this.invisibleWalls, iWallHit);
        game.physics.arcade.collide(this.player, this.trump, killplayer);
		game.physics.arcade.collide(this.player, this.enemies, killplayer);
		game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.uranios, this.platforms);
        game.physics.arcade.collide(this.ogiveLevel, this.platforms);
		game.physics.arcade.collide(this.enemies, this.platforms);
		game.physics.arcade.collide(this.trump, this.platforms);
		game.physics.arcade.collide(this.trump, this.bullets, killtrump);
		game.physics.arcade.collide(this.enemies, this.bullets, killenemy);
        //Colisões com funções
        game.physics.arcade.overlap(this.player, this.uranios, collectStar, null, this);
        game.physics.arcade.overlap(this.player, this.ogiveLevel, changeLevel, null, this);

        //Funções jogador
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown && this.player.body.touching.down) {
            this.lastKeypressed = 'left';
			this.playerFacing = 'left';
            this.player.body.velocity.x = -250;
            this.player.animations.play('left');

        }
        if (this.cursors.right.isDown && this.player.body.touching.down) {
            this.lastKeypressed = 'right';
			this.playerFacing = 'right';
            this.player.body.velocity.x = 250;
            this.player.animations.play('right');

        }

        if (this.cursors.right.isDown && (!(this.player.body.touching.down))) {
            this.lastKeypressed = 'right';
			this.playerFacing = 'right';
            this.player.body.velocity.x = 80;
            this.player.animations.play('right');

        }
        if (this.cursors.left.isDown && (!(this.player.body.touching.down))) {
            this.lastKeypressed = 'left';
			this.playerFacing = 'left';
            this.player.body.velocity.x = -80;
            this.player.animations.play('left');

        }
        if (this.player.body.velocity.x == 0) {
            this.player.animations.stop();
            if (this.lastKeypressed == 'right') {
                this.player.frame = 3;
            } else if (this.lastKeypressed == 'left') {
                this.player.frame = 10;
            }
        }
        if ((this.cursors.up.isDown || this.jumpBar.isDown) && this.player.body.touching.down) {
            this.player.body.velocity.y = -300;
        }
		
		   if (this.fireButton.isDown) {
            this.fireBullet();
        }

        //Coleta
        function collectStar(player, uranio) {
            uranio.kill();
            this.score += 10;
            this.scoreText.text = 'Score: ' + this.score;
        }
		
		 function killplayer(player, enemy) {
            player.kill();
			game.state.start("Level3");
        }
		
		function killenemy(enemy, bullet) {
            enemy.kill();
			bullet.kill();
        }
		function killtrump(trumps, bullet) {
            trumps.kill();
			bullet.kill();
        }
		
		function iWallHit(trumps, wall) {

            if (trumps.body.touching.left) {
                trumps.body.velocity.x = 50;
                trumps.animations.play('right');
            }


            if (trumps.body.touching.right) {
                trumps.body.velocity.x = -50;
                trumps.animations.play('left');
            }
        }
		
		function iWallHit(enemy, wall) {

            if (enemy.body.touching.left) {
                enemy.body.velocity.x = 50;
                enemy.animations.play('right');
            }


            if (enemy.body.touching.right) {
                enemy.body.velocity.x = -50;
                enemy.animations.play('left');
            }
        }
		
        //Próxima fase
        function changeLevel(player, ogiveLevel) {
            totalScore = this.score;
            totalOgive = 1;
            game.state.start("Finish");
        }
    },
    uranioArray: function () {
        //Array de posições de ogivas e uranios
        var uranioArray = [];
        uranioArray = ['U', ' ', 'U', ' ', ' ', 'U', ' ', ' ', ' ', 'U', ' ', ' ', ' ', 'U', 'U', ' ', ' ', 'U', ' ', 'O'];

        return uranioArray;
    },
    tileArray: function () {
        //Blocos

        var tileArray = [];
        tileArray[00] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        tileArray[01] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        tileArray[02] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        tileArray[03] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 't', ' ', ' '];
        tileArray[04] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'i', ' ', 'e', ' ', ' ', ' ', ' ', 'i'];
        tileArray[05] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'i', ' ', ' ', ' ', ' ', ' ', ' ', 'i'];
        tileArray[06] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'i', ' ', 'e', ' ', 'i', '0', '0', '0', '0', '0', '0', '0', '0'];
        tileArray[07] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', 'i', ' ', ' ', ' ', 'i', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        tileArray[08] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', '0', '0', '0', '0', '0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        tileArray[09] = [' ', 'i', ' ', 'e', ' ', 'i', '0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        tileArray[10] = [' ', 'i', ' ', ' ', ' ', 'i', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        tileArray[11] = [' ', 'o', '0', '0', '0', '0', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        tileArray[12] = ['i', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '', ' ', ' ', ' ', ' ', ' ', 'i'];
        tileArray[13] = ['i', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'i'];
        tileArray[14] = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];

        return tileArray;
    },
    tileType: function () {
        //Blocos
        var tileType = [];
        tileType["1"] = 'ground';
        tileType["0"] = 'sub-ground';
        tileType["e"] = 'tank';
        tileType["i"] = 'iwall';
		tileType["t"] = 'un';
        return tileType;
    },
	
	 fireBullet: function () {

        if (game.time.now > this.bulletTime) {

            bullet = this.bullets.getFirstExists(false);

            if (bullet) {

                this.bulletTime = game.time.now + this.rateOfFire;

                if (this.playerFacing == 'right') {
                    bullet.reset(this.player.x + 10, this.player.y + 8);
                    bullet.body.velocity.x = 400;
                }

                if (this.playerFacing == 'left') {
                    bullet.reset(this.player.x - 10, this.player.y + 8);
                    bullet.body.velocity.x = -400;
                }

            }

        }

    },
	playerFacing: 'right',
	bullets: null,
    bulletTime: 0,
    fireButton: null,
    player: null,
    cursors: null,
    jumpBar: null,
    ogiveLevel: null,
    platforms: null,
    uranios: null,
    score: 0,
    scoreText: null,
    ogiveText: null,
    lastKeypressed: null,
	rateOfFire: 1000,
    enemyPositions: [],
    trump : null,
	trumpPositions: [],
    enemies : null,
    invisibleWalls : null,
};