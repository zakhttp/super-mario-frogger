'use strict';

/**
 * @description                 Clouds class
 * @param {number}  x           Horizontal position of the cloud
 * @param {number}  y           Vertical position of the cloud
 * @param {number}  speed       Speed of the cloud
 * @param {number}  speedRatio  Speed ratio of the cloud
 * @param {number}  rowHeight   Height of each row of the game board
 */
var Cloud = function(x, y, speed, speedRatio, rowHeight) {
    this.x = x;
    this.y = (y * rowHeight) + (0.5 * rowHeight) - 50;
    this.speed = speed * speedRatio;
    // Randomly assign a big cloud or small cloud to the sprite property of the cloud object
    this.sprite = Math.random() < 0.5 ? 'images/small-cloud.png' : 'images/big-cloud.png';
};


/**
 * @description          Update the position of the cloud
 * @param  {number}  dt  Time delta for a smooth animation
 */
Cloud.prototype.update = function(dt, bounds) {
    this.x += this.speed * dt;
    if (this.x > (bounds.right + 100)) {
        this.x = bounds.left;
    }
};

/**
 * @description               Render a cloud on the gameboard
 * @param  {object}  context  Context to use to draw the cloud
 */
Cloud.prototype.render = function(context) {
    context.drawImage(Resources.get(this.sprite), this.x, this.y);
};
