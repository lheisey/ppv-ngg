/**
 * Gulpfile for ppv-ngg.
 *
 * Implements:
 *      + Live reloads browser with BrowserSync.
 *      + CSS: Sass to CSS conversion, error catching, Autoprefixing, Sourcemaps,
 *        CSS minification, and Merge Media Queries.
 *      + Separate task for conditionally loaded CSS.
 *      + JS: Concatenates & uglifies JS files.
 *      + Separate task for conditionally loaded JS.
 *      + Copy PHP files from source to plugin directory.
 *      + Copy miscellaneous files from source to plugin directory
 *        For languages, images, changelog, etc.
 *      + Copy non-processed vendor JS files from node_modules to plugin directory.
 *      + Watches files for changes in files.
 *      + Corrects the line endings.
 *      + InjectCSS instead of browser page reload.
 *      + Convert readme.txt to readme.md.
 */

/**
 * Load WPGulp Configuration.
 */
const config = require('./wpgulp.config.js');

/**
 * Load Plugins.
 *
 * Load gulp plugins and passing them semantic names.
 */
const gulp = require('gulp'); // Gulp of-course.

// CSS related plugins.
const nodeSass = require('node-sass'); // Use node-sass for Sass compilation.
const gulpSass = require('gulp-sass'); // Gulp plugin to use Sass.
const sass = gulpSass( nodeSass );
const minifycss = require('gulp-uglifycss'); // Minifies CSS files.
const autoprefixer = require('gulp-autoprefixer'); // Autoprefixing magic.
const mmq = require('gulp-merge-media-queries'); // Combine matching media queries into one.

// JS related plugins.
const concat = require('gulp-concat'); // Concatenates JS files.
const uglify = require('gulp-uglify'); // Minifies JS files.
const babel = require('gulp-babel'); // Compiles ESNext to browser compatible JS.

// Readme conversion plugin
const convertreadme = require('gulp-readme-to-markdown'); // Convert readme.txt to readme.md.

// Utility related plugins.
const rename = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css.
const lineec = require('gulp-line-ending-corrector'); // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings).
const filter = require('gulp-filter'); // Enables you to work on a subset of the original files by filtering them using a glob.
const sourcemaps = require('gulp-sourcemaps'); // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css).
const notify = require('gulp-notify'); // Sends message notification to you.
const browserSync = require('browser-sync').create(); // Reloads browser and injects CSS. Time-saving synchronized browser testing.
const remember = require('gulp-remember'); //  Adds all the files it has ever seen back into the stream.
const plumber = require('gulp-plumber'); // Prevent pipe breaking caused by errors from gulp plugins.
const beep = require('beepbeep');
const zip = require('gulp-zip'); // Zip plugin or theme file.
const changed = require('gulp-changed'); // Only pass through changed files in the stream

/**
 * Custom Error Handler.
 *
 * @param Mixed err
 */
const errorHandler = r => {
    notify.onError('\n\n❌  ===> ERROR: <%= error.message %>\n')(r);
    beep();

    // this.emit('end');
};

/**
 * Task: 'browser-sync'.
 *
 * Live Reloads, CSS injections, Localhost tunneling.
 * @link http://www.browsersync.io/docs/options/
 *
 * @param {Mixed} done Done.
 */
const browsersync = done => {
    browserSync.init({
        proxy: config.projectURL,
        open: config.browserAutoOpen,
        injectChanges: config.injectChanges,
        watchEvents: ['change', 'add', 'unlink', 'addDir', 'unlinkDir']
    });
    done();
};

// Helper function to allow browser reload with Gulp 4.
const reload = done => {
    browserSync.reload();
    done();
};

/**
 * Task: 'mainstyles'.
 *
 * Compiles Sass, Autoprefixes it and Minifies CSS.
 *
 * This task does the following:
 *    1. Gets the source scss file
 *    2. Compiles Sass to CSS
 *    3. Writes Sourcemaps for it
 *    4. Autoprefixes it and generates style.css
 *    5. Renames the CSS file with suffix .min.css
 *    6. Minifies the CSS file and generates style.min.css
 *    7. Injects CSS or reloads the browser via browserSync
 */
gulp.task('mainstyles', () => {
    return gulp
        .src(config.styleMainSRC, {allowEmpty: true})
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                errLogToConsole: config.errLogToConsole,
                outputStyle: config.outputStyle,
                precision: config.precision
            })
        )
        .on('error', sass.logError)
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(autoprefixer(config.BROWSERS_LIST))
        .pipe(sourcemaps.write('./'))
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.styleMainDEST))
        .pipe(filter('**/*.css')) // Filtering stream to only css files.
        .pipe(mmq({log: true})) // Merge Media Queries only for .min.css version.
        .pipe(browserSync.stream()) // Reloads style if that is enqueued.
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss({maxLineLen: 10}))
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.styleMainDEST))
        .pipe(filter('**/*.css')) // Filtering stream to only css files.
        .pipe(browserSync.stream()) // Reloads style min if that is enqueued.
});

/**
 * Task: 'multistyles'.
 *
 * Compiles Multiple Sass, Autoprefixes it and Minifies CSS.
 *
 * This task does the following:
 *    1. Gets alls the source scss files
 *    2. Compiles Sass to CSS
 *    3. Writes Sourcemaps for it
 *    4. Autoprefixes it and generates style.css
 *    5. Renames the CSS file with suffix .min.css
 *    6. Minifies the CSS file and generates style.min.css
 *    7. Injects CSS or reloads the browser via browserSync
 */
gulp.task('multistyles', () => {
    return gulp
        .src(config.styleMultiSRC, {allowEmpty: true})
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                errLogToConsole: config.errLogToConsole,
                outputStyle: config.outputStyle,
                precision: config.precision
            })
        )
        .on('error', sass.logError)
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(autoprefixer(config.BROWSERS_LIST))
        .pipe(sourcemaps.write('./'))
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.styleMultiDEST))
        .pipe(filter('**/*.css')) // Filtering stream to only css files.
        .pipe(mmq({log: true})) // Merge Media Queries only for .min.css version.
        .pipe(browserSync.stream()) // Reloads style if that is enqueued.
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss({maxLineLen: 10}))
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.styleMultiDEST))
        .pipe(filter('**/*.css')) // Filtering stream to only css files.
        .pipe(browserSync.stream()) // Reloads style min if that is enqueued.
});

/**
 * Task: 'mainJS'.
 *
 * Concatenate and uglify main JS scripts.
 *
 * This task does the following:
 *     1. Gets the source folder for JS main files
 *     2. Concatenates all the files and generates main.js
 *     3. Renames the JS file with suffix .min.js
 *     4. Uglifes/Minifies the JS file and generates main.min.js
 */
gulp.task('mainJS', () => {
    return gulp
        .src(config.jsMainSRC, {since: gulp.lastRun('mainJS')}) // Only run on changed files.
        .pipe(plumber(errorHandler))
        .pipe(
            babel({
                presets: [
                    [
                        '@babel/preset-env', // Preset to compile your modern JS to ES5.
                        {
                            targets: {browsers: config.BROWSERS_LIST} // Target browser list to support.
                        }
                    ]
                ]
            })
        )
        .pipe(remember(config.jsMainSRC)) // Bring all files back to stream.
        .pipe(concat(config.jsMainFile + '.js'))
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.jsMainDEST))
        .pipe(
            rename({
                basename: config.jsMainFile,
                suffix: '.min'
            })
        )
        .pipe(uglify())
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.jsMainDEST))
});

/**
 * Task: 'multiJS'.
 *
 * Uglify mutliple JS scripts.
 *
 * This task does the following:
 *     1. Gets the source folder for JS files
  *    2. Copies source JS files to plugin folder
 *     3. Renames the JS files with suffix .min.js
 *     4. Uglifes/Minifies the JS files and places them in plugin folder
 */
gulp.task('multiJS', () => {
    return gulp
        .src(config.jsMultiSRC, {since: gulp.lastRun('multiJS')}) // Only run on changed files.
        .pipe(plumber(errorHandler))
        .pipe(
            babel({
                presets: [
                    [
                        '@babel/preset-env', // Preset to compile your modern JS to ES5.
                        {
                            targets: {browsers: config.BROWSERS_LIST} // Target browser list to support.
                        }
                    ]
                ]
            })
        )
        .pipe(remember(config.jsMultiSRC)) // Bring all files back to stream.
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.jsMainDEST))
        .pipe(
            rename({
                suffix: '.min'
            })
        )
        .pipe(uglify())
        .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
        .pipe(gulp.dest(config.jsMainDEST))
});

/**
 * Task: 'copyvendorJS'.
 *
 * Copy non-processed vendor JS files from node_modules to plugin directory.
 * simplelightbox, justifiedGallery
 */
gulp.task('copyvendorJS', () => {
    return gulp
        .src(config.vendorJsSRC)
        // .pipe(changed(config.vendorJsDEST))
        .pipe(gulp.dest(config.vendorJsDEST))
});

/**
 * Task: 'copyPHP'.
 *
 * Copy PHP files from source to plugin directory.
 *
 */
gulp.task('copyPHP', () => {
    return gulp
        .src(config.phpSRC)
        .pipe(changed(config.phpDEST))
        .pipe(gulp.dest(config.phpDEST))
});

/**
 * Task: 'copymisc'.
 *
 * Copy miscellaneous files from source to plugin directory.
 * languages, images, changelog, etc.
 */
gulp.task('copymisc', () => {
    return gulp
        .src(config.miscGlob)
        .pipe(changed(config.miscDEST))
        .pipe(gulp.dest(config.miscDEST))
});

/**
 * Task: 'readme'.
 *
 * Convert WordPress readme.txt to github readme.md
 */
gulp.task('readme', (done) => {
    gulp.src([ config.readmeSRC ])
        .pipe(convertreadme({
            details: false
        }))
        .pipe(gulp.dest(config.readmeDEST));
    done();
});

/**
 * Task: 'package'.
 *
 * Packages all the processed plugin files in a ZIP file.
 * Base option of gulp.src is one level above plugin folder
 *     so the packaged zip has the folder name inside the zip.
 *
 * Zip file source: ../site/wp-content/plugins/pluginName.
 * Zip destination: ./dist.
 * zipName: pluginName.zip.
 */
gulp.task('package', () => {
    return gulp
        .src(config.zipSRC, {base: config.WPpluginFolder})
        .pipe(zip(config.zipName))
        .pipe(gulp.dest(config.zipDEST));
});

/**
 * Watch Tasks.
 *
 * Watches for file changes and runs specific tasks.
 * Does not watch readme or copyvendorJS.
 */
gulp.task(
    'default',
    gulp.series( 'readme', gulp.parallel('mainstyles', 'multistyles', 'mainJS', 'multiJS', 'copyPHP', 'copymisc', 'copyvendorJS', browsersync, () => {
        gulp.watch(config.watchPhp, gulp.series('copyPHP', reload)); // Reload on PHP file changes.
        gulp.watch(config.watchMisc, gulp.series('copymisc', reload)); // Reload on miscellaneous file changes.
        gulp.watch(config.watchStyles, gulp.parallel('mainstyles', 'multistyles')); // Reload on SCSS file changes.
        gulp.watch(config.watchJs, gulp.series('mainJS', 'multiJS', reload)); // Reload on JS file changes.

    }))
);
