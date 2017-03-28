'use strict';

/**
 * @description                 Objects the player should avoid
 * @constructor
 * @param {number}  x           position of the enemy on the 'x' axis
 * @param {number}  y           position of the enemy on the 'y' axis
 * @param {number}  speed       speed factor of the enemy
 * @param {number}  speedRatio  Speed ratio of the cloud
 * @param {number}  rowHeight   Height of each row of the game board
 */
var Enemy = function (x, y, speed, speedRatio, rowHeight) {

    this.x = x;
    this.y = y = (y * rowHeight) + (0.5 * rowHeight) + 73;
    this.speed = speed * speedRatio;
    this.sprite = 'images/goomba.png'; //TODO: remove hard coded sprite

};

/**
 * @description              Move the enemy accross the gameBord
 * @param  {number}  dt      Time delta between the previous and actual frame
 * @param  {object}  bounds  Gameboard bounds
 */
Enemy.prototype.update = function (dt, bounds) {

    this.x += this.speed * dt;
    // Return the enemy object to the left bound once they cross the right bound
    if (this.x > (bounds.right + 100)) { //TODO: provide the game bounds
        this.x = bounds.left;
    }

};

/**
 * @descritpion               Render the enemy object
 * @param  {object}  context  Context to use to draw the enemy
 */
Enemy.prototype.render = function (context) {

    context.drawImage(Resources.get(this.sprite), this.x, this.y);

};
