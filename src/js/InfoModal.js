'use strict';
/**
 * The InfoWindow Constructor acceps an object that fullfils the following
 * Interface
 *
 * var config = {
    bg: {
        position: {
            x1: Number,
            y1: Number,
            x2: Number,
            y2: Number
        }
    },
    overlay: {
        bgColor: String,
        position: {
            x1: Number,
            y1: Number,
            x2: Number,
            y2: Number
        }
    },
    title: {
        text: String,
        color: String,
        fontSize: Number,
        position: {
            x1: Number,
            y1: Number
        }
    },
    callToAction: {
        text: String,
        color: String,
        fontSize: Number,
        position: {
            x1: Number,
            y1: Number
        }
    },
    body: {
        text: String,
        color: String,
        fontSize: Number,
        position: {
            x1: Number,
            y1: Number
        }
    },
    nextCallback: Object // callback function
};
 */

/**
 * @description                  Creates a modal to display informations
 * @param {string}  bg            Path of the background image
 * @param {object}  config        Object containing the settings of the modal
 * @param {object}  nextCallback  Function to call when the user presses a key
 */
var InfoModal = function (bg, config, nextCallback) {
    this.bg = bg;
    this.config = config;
    this.nextCallback = nextCallback;
};

/**
 * @description 			  Renders the modal
 * @param  {object}  context  Context the render should render in
 */
InfoModal.prototype.render = function (context) {

    var config = this.config,
        bgImage = this.bg,
        bgX1 = config.bg.position.x1,
        bgY1 = config.bg.position.y1,
        bgX2 = config.bg.position.x2,
        bgY2 = config.bg.position.y2,

        overlayBg = config.overlay.bgColor,
        overlayX1 = config.overlay.position.x1,
        overlayY1 = config.overlay.position.y1,
        overlayX2 = config.overlay.position.x2,
        overlayY2 = config.overlay.position.y2;

    // Draw the background Image
    if (bgImage) {
        context.drawImage(Resources.get(bgImage), bgX1, bgY1, bgX2, bgY2);
    }

    // Draw the background overlay
    console.log(overlayBg);
    context.fillStyle = overlayBg;
    context.fillRect(overlayX1, overlayY1, overlayX2, overlayY2);

    // Write the title
    writeLine(config.title);

    // Write the body
    writeLine(config.body);

    // Write the call to action
    writeLine(config.callToAction);

    // Handle keypress event to go to the next screen
    document.addEventListener('keydown', function (event) {
        this.nextCallback();
    }.bind(this));

    /**
     * @description                Writes a single line of text in the canvas
     * @param  {object}  textLine  Contains content and formatting of the text
     */
    function writeLine(textLine) {

        context.font = textLine.fontSize + ' pixel-emulator';
        context.fillStyle = textLine.color;
        context.fillText(textLine.text, textLine.position.x1, textLine.position.y1);

    }

};
