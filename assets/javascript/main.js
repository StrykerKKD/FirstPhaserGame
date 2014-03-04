/*
This is the main entry point of the game
Dependencys: phaser.min.js, Player.js, Level.js and HUD.js
We can use phaser.min with Phaser namespace
*/
require(['lib/phaser.min','module/Player','module/Level','module/HUD'],function(Phaser,Player,Level,HUD){
    var _game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    function preload() {
        Level.init(_game);
        Level.preload();

        Player.init(_game);
        Player.preload();

        HUD.init(_game);
    }

    function create() {
        Level.create();
        Player.create();
        HUD.create();
    }

    function update() {
        Level.update();
        Player.update();
    }

});
