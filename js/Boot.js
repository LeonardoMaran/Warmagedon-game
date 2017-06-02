



/* Trabalho de Desenvolvimento de Games 
Professor Gabriel Militello IBTA - Paulista
Grupo Maran007 - 
Aluno: Leonardo Gustavo Maran
RA: 14000820 - CCO
*/

var boot = function (game) {};
boot.prototype = {
    totalScore:0,
    totalOgive:0,
    preload: function () {
       
        game.load.image('ogive', 'assets/images/ogive.png');
        game.load.spritesheet('uranio', 'assets/images/uranio.png', 32, 32);
        
        game.load.image('fundo', 'assets/images/fundo1.png');
		game.load.image('fundo2', 'assets/images/fundo2.png');
		game.load.image('fundo3', 'assets/images/fundo3.png');
		game.load.image('fundo4', 'assets/images/fundo4.png');
        game.load.image('ground', 'assets/images/chao.png');
		game.load.image('iwall', 'assets/images/invisibleWall.png');
		game.load.spritesheet('tank', 'assets/images/tank.png', 65, 86);
		game.load.image('bullet', 'assets/images/bullet.png');
        game.load.image('sub-ground', 'assets/images/chao2.png');
        game.load.spritesheet('soldier', 'assets/images/soldier.png', 60, 61);
		game.load.spritesheet('trump', 'assets/images/trump.png', 56, 83);
		game.load.spritesheet('putin', 'assets/images/putin.png', 56, 83);
		game.load.spritesheet('un', 'assets/images/un.png', 56, 83);
		

        
    
     
    },
    create: function () {
        game.state.start("Level1");
    }

};

