/* Trabalho de Desenvolvimento de Games 
Professor Gabriel Militello IBTA - Paulista
Grupo Maran007 - 
Aluno: Leonardo Gustavo Maran
RA: 14000820 - CCO
*/


var finish = function (game) {
};
finish.prototype = {
    create: function () {
        background = game.add.sprite(0, 0, 'fundo4');
        //Texto
        this.title = game.add.text(350, 16, 'Congratulations', {
            fontSize: '32px',
            fill: '#fff'
        });
        this.ScoreFinal = game.add.text(16, 96, 'Total de pontos: '+ totalScore, {
            fontSize: '32px',
            fill: '#fff'
        });
        this.KeyFinal = game.add.text(16, 148, 'TotalOgivas: '+ totalOgive, {
            fontSize: '32px',
            fill: '#fff'
        });
    },
    title:null,
    ScoreFinal:null,
    OgiveFinal:null
};


