// Global namespace for the game objects
var game = {};

// Start the game engine
engine.start(config);

// Create a player
game.player = new Player(config.bounds.right / 2, config.bounds.bottom);

// Create a game dashboard
game.dash = new Dash();

// Array of enemies the player should avoid
game.allEnemies = [
    // 2nd row
    new Enemy(400, 1, 30, config.speedRatio, config.rowHeight),
    new Enemy(200, 1, 40, config.speedRatio, config.rowHeight),
    new Enemy(300, 1, 90, config.speedRatio, config.rowHeight),
    new Enemy(500, 1, 50, config.speedRatio, config.rowHeight),
    new Enemy(800, 1, 60, config.speedRatio, config.rowHeight),
    // 3rd row
    new Enemy(0, 2, 40, config.speedRatio, config.rowHeight),
    new Enemy(600, 2, 40, config.speedRatio, config.rowHeight),
    new Enemy(700, 2, 40, config.speedRatio, config.rowHeight),
    new Enemy(800, 2, 40, config.speedRatio, config.rowHeight),
    // 4th row
    new Enemy(0, 3, 30, config.speedRatio, config.rowHeight),
    new Enemy(200, 3, 30, config.speedRatio, config.rowHeight),
    new Enemy(400, 3, 30, config.speedRatio, config.rowHeight),
    new Enemy(600, 3, 30, config.speedRatio, config.rowHeight),
    // 5th row
    new Enemy(100, 4, 20, config.speedRatio, config.rowHeight),
    new Enemy(450, 4, 20, config.speedRatio, config.rowHeight),
    new Enemy(700, 4, 20, config.speedRatio, config.rowHeight),

];

// Array of collectibles the player should collect
game.allCoins = (function() {
    var coins = [];
    for (var i = 0; i < config.rows; i++) {
        for (var j = 0; j < (config.cols - 2); j++) {
            coins.push(new Coin(i, j, config.colWidth, config.rowHeight));
        }
    }
    return coins;
})();

// Array of clouds that traverse the background of the gameboard
game.allClouds = [
    new Cloud(0, 2, 4, config.speedRatio, config.rowHeight),
    new Cloud(-100, 3, 2, config.speedRatio, config.rowHeight),
    new Cloud(0, 1, 3, config.speedRatio, config.rowHeight),
    new Cloud(-200, 4, 5, config.speedRatio, config.rowHeight),
    new Cloud(300, 2, 1, config.speedRatio, config.rowHeight),
];

// Handle keyboard events for moving the player around
document.addEventListener('keydown', function (e) {
    var keys = {
        38: 'up',
        40: 'down',
        37: 'left',
        39: 'right'
    };
    game.player.handleInputKey(keys[e.keyCode], config.playerStep);
});