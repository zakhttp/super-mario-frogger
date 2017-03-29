'use strict';

/**
 * @description Game dashboard
 * @constructor
 */
var Dash = function() {
    this.score = 0;
    this.coins = 0;
    this.sprite = 'images/small-coin.png';
};

/**
 * @description               Render the dashboard on the gameboard
 * @param  {object}  context  Context to use to draw the dashboard
 */
Dash.prototype.render = function(context) {
    // Center-align the canvas context
    context.textAlign = 'center';
    // Set the context font style
    context.font = '12px pixel-emulator';
    // Set the text color
    context.fillStyle = '#e4fffa';
    // Draw the dash elements
    context.fillText('MARIO', 50, 25);
    context.fillText(this.score, 50, 40);
    context.drawImage(Resources.get(this.sprite), 354, 29);
    context.fillText('x', 374, 40);
    context.fillText(this.coins, 390, 40);
    context.fillText('WORLD', 758, 25);
    context.fillText('F-1', 758, 40);
};