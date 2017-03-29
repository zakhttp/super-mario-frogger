'use strict';

/**
 * @description                Collectibles the player should collect
 * @constructor
 * @param {number}  x          Horizonal position
 * @param {Number}  y          Vertical position
 * @param {[type]}  colWidth   Width of each column of the game board
 * @param {number}  rowHeight  Height of each row of the game board
 */
var Coin = function(x, y, colWidth, rowHeight) {
    this.x = (x * colWidth) + (0.5 * colWidth) - 10;
    this.y = (y * rowHeight) + (0.5 * rowHeight) + 73;
    this.sprite = 'images/big-coin.png';
};

/**
 * @description               Draw a coin on the gameboard
 * @param  {object}  context  Context to use to draw the coin
 */
Coin.prototype.render = function(context) {
    context.drawImage(Resources.get(this.sprite), this.x, this.y);
};
