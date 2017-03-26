'use strict';

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
 * @param  {object}   bounds  Gameboard bounds
 */
Player.prototype.update = function (bounds) {

    // out of rightBound
    if (this.x > bounds.right) {
        this.x = bounds.right;
    }
    // out of leftBound
    if (this.x < bounds.left) {
        this.x = bounds.left;
    }
    // out of topBound
    if (this.y < bounds.top) {
        this.y = bounds.top;
    }
    // out of bottomBound
    if (this.y > bounds.bottom) {
        this.y = bounds.bottom;
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
 * @descritpion               Render the player object
 * @param  {[type]}  context  The context to attach the player to
 */
Player.prototype.render = function (context) {
    context.drawImage(Resources.get(this.sprite), this.x, this.y);
};
