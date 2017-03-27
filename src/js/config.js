/**
 * @description Game         Configuration object
 * @return {object}  config  Object containing the game settings
 */
var config = (function () {
    'use strict';

    var cols = 8,
        rows = 8,
        colWidth = 101,
        rowHeight = 101,
        width = cols * colWidth,
        height = rows * rowHeight;

    var config = {
        // Element to attach the gameboard to
        gameContainerElement: '.game-container',
        // Player bounds
        bounds: {
            top: 121,
            right: 780, //808-28
            bottom: 625,
            left: 0
        },
        // Row height of the gameboard
        rowHeight: rowHeight,
        // Column width of the gameboard
        colWidth: colWidth,
        // Number of rows of the gameboard
        rows: rows,
        // Number of columns of the gameboard
        cols: cols,
        // Calculated width of the gameboard
        width: width,
        // Calculated height of the gameboard
        height: height,
        // Gamebaord image tiles
        tiles: [
            'images/plain-sky-block.png',
            'images/bridge-block.png',
            'images/bridge-block.png',
            'images/bridge-block.png',
            'images/bridge-block.png',
            'images/bridge-block.png',
            'images/ground-block.png',
            'images/plain-ground-block.png'
        ],
        // Images assets of the game
        assets: [
            'images/splash.jpg',
            'images/plain-sky-block.png',
            'images/sky-block.png',
            'images/bridge-block.png',
            'images/ground-block.png',
            'images/plain-ground-block.png',
            'images/goomba.png',
            'images/mario-right.png',
            'images/mario-left.png',
            'images/small-cloud.png',
            'images/big-cloud.png',
            'images/big-coin.png',
            'images/small-coin.png'
        ],
        // Player mouvement steps in pixels
        playerStep: {
            x: 25,
            y: 101
        },
        /* Enemies speed ratio to fine-tune the speed*/
        speedRatio: 10,
        collisionTolerance: {
            x: 30,
            y: 30,
        },
        // Splashscreen background image
        splashScreen: 'images/splash.jpg',
        // Modal configuration object
        infoModal: {
            bg: {
                position: {
                    x1: 0,
                    y1: 0,
                    x2: width,
                    y2: height
                }
            },
            overlay: {
                bgColor: 'rgba(0, 0, 0, 0.6)',
                position: {
                    x1: 50,
                    y1: height - 550,
                    x2: width - 100,
                    y2: height - 500
                }
            },
            title: {
                text: 'super mario frogger',
                color: '#bd312e',
                fontSize: '30px',
                position: {
                    x1: 100,
                    y1: height - 450
                }
            },
            body: {
                text: [
                    'How to play: Use the keyboard arrows up/down/left/right to move around.'
                ],
                color: '#bbbbbb',
                fontSize: '11px',
                position: {
                    x1: 100,
                    y1: height - 400
                }
            },
            callToAction: {
                text: 'press any key to start...',
                color: '#bbbbbb',
                fontSize: '18px',
                position: {
                    x1: 100,
                    y1: height - 350
                }
            }
        }
    };
    return config;
})();
