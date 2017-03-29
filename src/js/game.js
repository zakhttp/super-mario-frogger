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
    new Enemy(0, 1, 10, config.speedRatio, config.rowHeight)

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
    new Cloud(0, 2, 1, config.speedRatio, config.rowHeight),
    new Cloud(-800, 3, 2, config.speedRatio, config.rowHeight),
    new Cloud(-600, 1, 3, config.speedRatio, config.rowHeight),
    new Cloud(-100, 4, 5, config.speedRatio, config.rowHeight),
    new Cloud(-100, 2, 1, config.speedRatio, config.rowHeight),
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