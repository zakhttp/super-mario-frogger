/**
 * @description        Player class
 * @constructor
 * @param {number}  x  position of the player on the 'x' axis
 * @param {number}  y  position of the player on the 'y' axis
 */
var Player = function (x, y) {

    this.x = x; //TODO: update x=bounds.right / 2
    this.y = y; //TODO: update y=bounds.bottom
    this.sprite = 'images/mario-right.png'; //TODO: remove hard coded sprite

};

/**
 * @description               Restrict player position to the gameBoard bounds
 * @param  {number}   dt      Time delta between the previous and actual frame
 * @param  {[type]}   bounds  Gameboard bounds
 */
Player.prototype.update = function (dt, bounds) {

    var outOfRightBound = this.x < bounds.right,
        outOfLeftBound = this.x > bounds.right,
        outOfTopBound = this.y < bounds.top,
        outOfBottomBound = this.y > bounds.bottom;

    if (outOfRightBound) {
        this.x = bounds.right;
    }
    if (outOfLeftBound) {
        this.x = bounds.left;
    }
    if (outOfTopBound) {
        this.y = bounds.bottom;
    }
    if (outOfBottomBound) {
        this.y = bounds.top;
    }

};

/**
 * @description                  Handle input to move the player on the gameBoard
 * @param  {string}  keyCode     The code of the pressed key
 * @param  {objet}   playerStep  Single step of the player on the 'x' & 'y' axis
 */
Player.prototype.handleInputKey = function (keyCode, playerStep) {

    switch (keyCode) {
    case 'up':
        this.y -= playerStep.y;
        break;
    case 'down':
        this.y += playerStep.y;
        break;
    case 'left':
        this.x -= playerStep.x;
        // Load the left oriented mario sprite
        this.sprite = 'images/mario-left.png';
        break;
    case 'right':
        this.x += playerStep.x;
        // Load the right oriented mario sprite
        this.sprite = 'images/mario-right.png';
        break;
}

};

/**
 * @descritpion Render the player object
 */
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
