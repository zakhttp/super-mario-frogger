'use strict';

/**
 * @description        Collectibles the player should collect
 * @param {number}  x  Horizonal position
 * @param {Number}  y  Vertical position
 */
var Coin = function(x, y) {
    this.x = (x * colWidth) + (0.5 * colWidth) - 10;
    this.y = (y * rowHeight) + (0.5 * rowHeight) + 73;
    this.sprite = 'images/big-coin.png';
};

/**
 * @description Draw a coin on the gameboard
 */
Coin.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
