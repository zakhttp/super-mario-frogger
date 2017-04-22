/**
 * Resources.js loads the images files to be used in the game.
 * Includes a simple caching layer to help reuse the same image multiple times
 */
(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    /**
     * Load either a single or array of images
     */
    function load(urlOrArray) {
        if (urlOrArray instanceof Array) {
            urlOrArray.forEach(function(url) {
                _load(url);
            });
        } else {
            _load(urlOrArray);
        }
    }

    /**
     * Image loading utility
     */
    function _load(url) {
        if (resourceCache[url]) {
            // Return the chached image in case it was previously cached
            return resourceCache[url];
        } else {
            // Create and load a new image in case not found in the cached images object
            var img = new Image();
            img.onload = function() {
                // Add the image to the cache object once properly loaded
                resourceCache[url] = img;
                // Once the image is loaded and cached, call all the onReady() callbacks
                if (isReady()) {
                    readyCallbacks.forEach(function(func) {
                        func();
                    });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    /**
     * Get references to images previously loaded
     */
    function get(url) {
        return resourceCache[url];
    }
    /**
     *
     * Detect if all images have been properly loaded
     */
    function isReady() {
        var ready = true;
        for (var k in resourceCache) {
            if (resourceCache.hasOwnProperty(k) &&
                !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }
    /**
     * Add a function to the callback stack that will be called once all
     * requested images are loaded
     */
    function onReady(func) {
        readyCallbacks.push(func);
    }
    /**
     * Public Interface attached to the window object
     */
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();
