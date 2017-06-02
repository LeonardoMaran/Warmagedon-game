
/* Trabalho de Desenvolvimento de Games 
Professor Gabriel Militello IBTA - Paulista
Grupo Maran007 - 
Aluno: Leonardo Gustavo Maran
RA: 14000820 - CCO
*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Third World War');
game.state.add("Boot", boot);
game.state.add('Level1', level1);
game.state.add('Level2', level2);
game.state.add('Level3', level3);
game.state.add('Finish', finish);
game.state.start("Boot");