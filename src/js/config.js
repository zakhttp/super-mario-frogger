/**
 * @description Game         Configuration object
 * @return {object}  config  Object containing the game settings
 */
var config = (function () {
    'use strict';
    var config = {
        bounds: {
            top: 121,
            right: 780, //808-28
            bottom: 625,
            left: 0
        },
        rowHeight: 101,
        colWidth: 101,
        numRows: 8,
        numCols: 8,
        colImages: [
            'images/plain-sky-block.png',
            'images/bridge-block.png',
            'images/bridge-block.png',
            'images/bridge-block.png',
            'images/bridge-block.png',
            'images/bridge-block.png',
            'images/ground-block.png',
            'images/plain-ground-block.png'
        ],
        playerStep: {
            x: 25,
            y: 101
        },
        /* Enemies speed ratio to fine-tune the speed*/
        speedRatio: 10,
        collisionTolerance: {
            x: 30,
            y: 30,
        }
    };
    return config;
})();
