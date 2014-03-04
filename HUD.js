/*
HUD module
Dependency: null
*/
define(function(){

    //Private variables
    var _game = null,
        _score = 0,
        _scoreText = null;

    //Public functions
    return{
        init: function(game) {
            _game = game;
        },
        create: function() {
		  _scoreText = _game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        },
        addToScore: function(value) {
            _score+=10;
        },
        updateScoreText: function() {
            _scoreText.content = 'Score: ' + _score;
        }
    }
});
