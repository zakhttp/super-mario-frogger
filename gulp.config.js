var wiredep = require('wiredep');

var js = [],
    test = ['./test/**/*.js'],
    bowerFiles = wiredep({
        devDependencies: true
    })['js'],
    karmaFiles = [].concat(bowerFiles, js, test),
    src = './src/',
    dist = './dist/';

module.exports = getConfig;

function getConfig() {
    var config = {
        index: src + 'index.html',
        js: js,
        css: src + 'css/**/*.css',
        images: src + 'images/**/*.***',
        fonts: src + 'fonts/*.***',
        dist: dist,
        src: src,
        test: test,
        bowerFiles: bowerFiles,
        karmaFiles: karmaFiles
    };
    return config;
}
