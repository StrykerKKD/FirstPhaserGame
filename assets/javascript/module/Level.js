/*
Level module
Dependency: null
*/
define(function(){

    //Private variables
    var _game = null,
        _platforms = null,
        _stars = null,
        _ground = null,
        _ledge = null;

    //Public functions
    return{
        init: function(game) {
            _game = game;
        },
        preload: function() {
            _game.load.image('sky', 'assets/img/sky.png');
            _game.load.image('ground', 'assets/img/platform.png');
            _game.load.image('star', 'assets/img/star.png');
        },
        create: function() {
            // add background for this level
            _game.add.sprite(0,0,'sky');

            //  The platforms group contains the ground and the 2 ledges we can jump on
            _platforms = _game.add.group();

            // Here we create the ground.
            _ground = _platforms.create(0, _game.world.height - 64, 'ground');

            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            _ground.scale.setTo(2, 2);

            //  This stops it from falling away when you jump on it
            _ground.body.immovable = true;

            //  Now let's create two ledges
            _ledge = _platforms.create(400, 400, 'ground');
            _ledge.body.immovable = true;

            _ledge = _platforms.create(-150, 250, 'ground');
            _ledge.body.immovable = true;

            // create a group for stars
            _stars = _game.add.group();

            //  Here we'll create 12 of them evenly spaced apart
            for (var i = 0; i < 12; i++)
            {
                //  Create a star inside of the 'stars' group
                var _star = _stars.create(i * 70, 0, 'star');

                //  Let gravity do its thing
                _star.body.gravity.y = 350;

                //  This just gives each star a slightly random bounce value
                _star.body.bounce.y = 0.7 + Math.random() * 0.2;
            }
        },
        update: function() {
		  _game.physics.collide(_stars, _platforms);
        },
        getPlatforms: function() {
            return _platforms;
        },
        getStars: function() {
            return _stars;
        }
    }
});
