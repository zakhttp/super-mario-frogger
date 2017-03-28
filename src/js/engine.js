var engine = (function (config) {
    'use strict';

    var $ = config,
        width = $.colWidth * $.cols,
        height = $.rowHeight * $.rows,
        lastTime;

    var canvas = createCanvas(width, height),
        context = createContext(canvas),
        gameContainer = document.querySelector($.gameContainerElement);

    /**
     * @description  Initialize the game engine
     */
    function init() {

        mountCanvas(canvas);
        showSplashscreen(context);
        lastTime = Date.now();

    }

    /**
     * @description  Start the game engine
     */
    function start() {

        console.log('Engine started!!');
        var assets = [].concat($.tiles, $.assets);
        Resources.load(assets);
        Resources.onReady(init);

    }

    /**
     * @description Engine's game loop
     */
    function loop() {

        // 1. Set the variable now to the actual time
        var now = Date.now();
        // 2. Calculate delta of time to allow smooth animation between
        // the previous frame and the next one.
        var dt = (now - lastTime) / 1000.0;
        // 3. Update positions of the game entities
        update(dt);
        // 4. Render the game board & game entities
        render();
        // 5. Set last time to the moment after render
        lastTime = now;

        // 6. Request browser to repeat whenever possible
        window.requestAnimationFrame(loop);
    }

    /**
     * @description          Update the game entities
     * @param  {number}  dt  Delta time to allow smooth animation
     */
    function update(dt) {

        player.update($.bounds);
        allEnemies.forEach(function(enemy) {
            enemy.update(dt, $.bounds);
        });
        allClouds.forEach(function(cloud) {
            cloud.update(dt, $.bounds);
        });

    }


    /**
     * @description  Render the game board & game entities
     */
    function render() {

        renderGameBoard(context);

        allCoins.forEach(function(coin) {
            coin.render(context);
        });

        allClouds.forEach(function(cloud) {
            cloud.render(context);
        });
        allEnemies.forEach(function(enemy) {
            enemy.render(context);
        });
        player.render(context); // TODO define entities and playe container

    }

    /**
     * @description              Create the game canvas
     * @param  {number}  width   The width of the game board
     * @param  {number}  height  The height of the game board
     * @return {object}  canvas  The game board canvas object
     */
    function createCanvas(width, height) {

        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.className = 'shadow';
        return canvas;

    }

    /**
     * @description               Create the context of the game board canvas
     * @param  {object}  canvas   The game board canvas object
     * @return {object}  context  The context oof the game board canvas
     */
    function createContext(canvas) {
        return canvas.getContext('2d');
    }

    /**
     * @description              Mount the canvas on the body of the page
     * @param  {object}  canvas  The game board canvas object
     */
    function mountCanvas(canvas) {
        gameContainer.appendChild(canvas);
    }

    /**
     * @description      Populate the game board using image asssets
     * @param  {object}  context The context oof the game board canvas
     */
    function renderGameBoard(context) {

        var row, col;
        for (row = 0; row < $.rows; row++) {
            for (col = 0; col < $.cols; col++) {
                var tile = Resources.get($.tiles[row]);
                context.drawImage(tile, col * $.colWidth, row * $.rowHeight);
            }
        }

    }

    /**
     * @description               Displays the splash screen of the game
     * @param  {object}  context  The context oof the game board canvas
     */
    function showSplashscreen(context) {

        var splashScreen = new InfoModal(
            config.splashScreen,
            config.infoModal,
            loop
        );
        splashScreen.render(context);

    }

    /**
     * Public API of the engine
     * @type {Object}
     */
    var engine = {

        start: start,
        context: context

    };

    return engine;

})(config);
