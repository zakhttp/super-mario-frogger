var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({
    lazy: true
});
var del = require('del');
var mainBowerFiles = require('main-bower-files');

var config = require('./gulp.config.js')();


/**
 * ----------------------------------------------------------------------------
 * Lazy Loaded Gulp Packages
 * ----------------------------------------------------------------------------
 *
 *      gulp-autoprefixer
 *      gulp-imagemin
 *      gulp-jscs
 *      gulp-jshint
 *      gulp-plumber
 *      gulp-task-listing
 *      gulp-util
 */


/**
 * ----------------------------------------------------------------------------
 * Tasks List
 * ----------------------------------------------------------------------------
 *
 *      gulp default        => Test, build and serve the project.
 *      gulp help           => Display the available tasks.
 *
 *      gulp clean          => Delete the dist folder.
 *      gulp build          => Build the project.
 *      gulp serve          => Serve the project in the browser.
 *
 *      gulp auto           => Run tests continuously.
 *      gulp test           => Run tests in single run mode.
 *
 *      gulp inject         => Inject JS and CSS assets into index.html.
 *                             then Copy to the dist. folder.
 *
 *      gulp lib            => Copy Bower dependencies to the dist. folder.
 *      gulp clean-lib      => Clean the distribued vendor JS & CSS files.
 *
 *      gulp vet            => Run jshint & jscs against all js code.
 *      gulp scripts        => Copy app JS files to the dist. folder.
 *      gulp-clean-scripts  => Clean the distribued JS files.
 *
 *      gulp styles         => Add vendor prefixes to CSS and copy to the dist. folder.
 *      gulp clean-styles   => Clean the distributed CSS files.
 *
 *      gulp images         => Optimize images and copy to the dist. folder.
 *      gulp clean-images   => Clean the distributed image files.
 *
 *      gulp-fonts          => Copy fonts to the dist. folder.
 *      gulp-clean-fonts    => Clean the distributed font files.
 *
 */

gulp.task('help', $.taskListing);

gulp.task('default', ['serve', 'test']);

gulp.task('vet', function (done) {
    log('Checking JS files for errors with JSHINT & JSCS');
    return gulp
        .src(config.js)
        .pipe($.plumber())
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
    //     .pipe($.jshint.reporter('fail'));
});

gulp.task('scripts', ['vet', 'clean-scripts'], function () {
    log('Copying app JS files to the distribution folder');
    return gulp
        .src(config.js)
        .pipe($.plumber())
        .pipe(gulp.dest(config.dist + 'js'));
});

gulp.task('clean-scripts', function (done) {
    clean(config.dist + 'js', done);
});

gulp.task('lib', ['clean-lib'], function () {
    log('Copying vendor JS & CSS files to the distribution folder');
    return gulp
        .src(mainBowerFiles())
        .pipe($.plumber())
        .pipe(gulp.dest(config.dist + 'lib'));
});

gulp.task('clean-lib', function (done) {
    clean(config.dist + 'lib', done);
});

gulp.task('styles', ['clean-styles'], function () {
    log('Adding vendor prefixes to CSS using autoprefixer');
    return gulp
        .src(config.css)
        .pipe($.plumber())
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', '>5%']
        }))
        .pipe(gulp.dest(config.dist + 'css'));
});

gulp.task('clean-styles', function (done) {
    clean(config.dist + 'css', done);
});

gulp.task('images', ['clean-images'], function () {
    log('Optimizing images and copying them to the distribution folder');
    return gulp
        .src(config.images)
        .pipe($.plumber())
        .pipe($.imagemin({
            optimizationLevel: 4,
            verbose: true //TODO: add cli arguments support for verbose
        }))
        .pipe(gulp.dest(config.dist + 'images'));
});

gulp.task('clean-images', function (done) {
    clean(config.dist + 'images', done);
});

gulp.task('fonts', ['clean-fonts'], function () {
    log('Copying fonts to the distribution folder');
    return gulp
        .src(config.fonts)
        .pipe($.plumber())
        .pipe(gulp.dest(config.dist + 'fonts'));
});

gulp.task('clean-fonts', function (done) {
    clean(config.dist + 'fonts', done);
});

gulp.task('clean', function (done) {
    clean(config.dist, done);
});

gulp.task('inject', ['clean-index'], function () {
    log('Wiring up app/vendor JS and CSS files');
    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(mainBowerFiles('**/*.js'), {
            read: false
        }), {
            starttag: '<!-- inject:vendorJS -->',
            transform: transformJsPath
        }))
        .pipe($.inject(gulp.src(mainBowerFiles('**/*.css'), {
            read: false
        }), {
            starttag: '<!-- inject:vendorCSS -->',
            transform: transformCssPath
        }))
        .pipe($.inject(gulp.src(config.js, {
            read: false
        }), {
            ignorePath: '/src/',
            relative: true,
            starttag: '<!-- inject:appJS -->',

        }))
        .pipe($.inject(gulp.src(config.css, {
            read: false
        }), {
            ignorePath: '/src/',
            relative: true,
            starttag: '<!-- inject:appCSS -->',
        }))
        .pipe(gulp.dest(config.dist));
});

gulp.task('clean-index', function (done) {
    clean(config.dist + 'index.html', done);
});

gulp.task('build', ['lib', 'scripts', 'test', 'styles', 'images', 'fonts', 'inject']);

gulp.task('serve', ['build'], function () {
    log('Serving the project in the browser');
    gulp.watch(config.js, ['scripts', 'test', 'inject']);
    gulp.watch(config.test, ['test']);
    gulp.watch(config.bowerDir, ['lib', 'inject']);
    gulp.watch(config.css, ['styles', 'inject']);
    gulp.watch(config.css, ['images', 'images']);
    gulp.watch(config.css, ['fonts', 'fonts']);

    var options = {
        server: {
            baseDir: config.dist
        },
        port: 3000,
        files: config.dist,
        ghostMode: {
            clicks: true,
            location: true,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'info',
        logPrefix: 'gulp',
        reloadDelay: 500
    };
    browserSync(options);
});

gulp.task('test', function (done) {
    log('Testing code');
    startTests(true, done);
});

gulp.task('autotest', ['vet'], function (done) {
    log('Testing code in single run mode');
    startTests(false, done);
});


/**
 * ----------------------------------------------------------------------------
 * Helper functions
 * ----------------------------------------------------------------------------
 */

function clean(path, done) {
    log('Cleaning assets in: ' + path, 'warning');
    del(path)
        .then(function fullfilled() {
            return done();
        })
        .catch(function rejected(exception) {
            log(exception, 'error');
        });
}

function log(message, logType) {
    logType = logType || 'info';
    var logTypes = {
        info: 'blue',
        warning: 'yellow',
        error: 'red'
    };
    var color = logTypes[logType] ? logTypes[logType] : 'blue';

    $.util.log($.util.colors[color](message));
}

// Bower files injection helpers

function stripBowerPath(path) {
    return path.replace(/\/bower_components\/(\w+\/)+/, '');
}

function transformJsPath(filePath) {
    var fileName = stripBowerPath(filePath);
    return '<script src="lib/' + fileName + '"></script>';
}

function transformCssPath(filePath) {
    var fileName = stripBowerPath(filePath);
    return '<link rel="stylesheet" href="lib/' + fileName + '">';
}

// Tests Helpers

function startTests(singleRun, done) {
    var Server = require('karma').Server;
    var excludeFiles = [];

    var server = Server.start({
        configFile: __dirname + '/karma.conf.js',
        exclude: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted);

    function karmaCompleted(karmaResult) {
        var status = karmaResult === 1 ? 'ERROR' : 'SUCCESS';
        log('karma completed with status: ' + status);
        done();
    }
}
