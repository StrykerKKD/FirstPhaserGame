/*
Player module
Dependencys: HUD.js and Level.js
*/
define(['HUD','Level'],function(HUD,Level) {

    //Private variables
    var _game = null,
        _sprite = null,
        _cursors = null;

    //Private functions
    var _collectStar = function(player, star){
        // Removes the star from the screen
        star.kill();

        // Add and update the score
        HUD.addToScore(10);
        HUD.updateScoreText();
    }

    //public functions
    return{
        init: function(game) {
            _game = game;
        },
        preload: function() {
            _game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        },
        create: function() {
            _sprite = _game.add.sprite(32, _game.world.height - 150, 'dude');

	       //  Player physics properties. Give the little guy a slight bounce.
	       _sprite.body.bounce.y = 0.2;
	       _sprite.body.gravity.y = 350;
	       _sprite.body.collideWorldBounds = true;

	       //  Our two animations, walking left and right.
	       _sprite.animations.add('left', [0, 1, 2, 3], 10, true);
	       _sprite.animations.add('right', [5, 6, 7, 8], 10, true);

	       _cursors = _game.input.keyboard.createCursorKeys();
        },
        update: function(){
            //  Collide the player and the stars with the platforms
            _game.physics.collide(_sprite,  Level.getPlatforms() );

            _game.physics.overlap(_sprite, Level.getStars(), _collectStar, null, this);

            _sprite.body.velocity.x = 0;

            if(_cursors.left.isDown)
            {
                _sprite.body.velocity.x = -250;

                _sprite.animations.play('left');
            }
            else if(_cursors.right.isDown)
            {
                _sprite.body.velocity.x = 250;

                _sprite.animations.play('right');
            }
            else
            {
                _sprite.animations.stop();
                _sprite.frame = 4;
            }

            //  Allow the player to jump if they are touching the ground.
            if (_cursors.up.isDown && _sprite.body.touching.down)
            {
                _sprite.body.velocity.y = -350;
            }
        }

    }
});
