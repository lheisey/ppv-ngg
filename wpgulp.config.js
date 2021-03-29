/**
 * WPGulp Configuration File
 *
 * 1. Edit the variables as per your project requirements.
 * 2. In paths you can add <<glob or array of globs>>.
 *
 * @package WPGulp
 */

// Project options.

// Local project URL of your already running WordPress site.
// > Could be something like "wpgulp.local" or "localhost"
// > depending upon your local WordPress setup.
const projectURL = 'wpsite';

const pluginName = 'ppv-ngg';

// Theme/Plugin URL. Relative path from source to WordPress plugins.
const WPpluginFolder = '../wpsite/wp-content/plugins/';
const pluginFolder = WPpluginFolder + pluginName;
const browserAutoOpen = false;
const injectChanges = true;

// >>>>> Main Style options.
// Path to main .scss file.
const styleMainSRC = './assets/scss/main/ppv-ngg-main.scss';

// Path to place the compiled main CSS file.
const styleMainDEST = pluginFolder + '/assets/css/';

// >>>>> Multiple Style options.
// Path to .scss files.
const styleMultiSRC = './assets/scss/multi/*.scss';

// Path to place the compiled Multiple CSS files.
const styleMultiDEST = pluginFolder + '/assets/css/';

// Available options → 'compact' or 'compressed' or 'nested' or 'expanded'
const outputStyle = 'expanded';
const errLogToConsole = true;
const precision = 10;

// JS Main options.

// Path to JS Main folder.
const jsMainSRC = './assets/js/main/*.js';

// Path to place the compiled JS Admin file.
const jsMainDEST = pluginFolder + '/assets/js/';

// Compiled JS Admin file name. Example set to custom i.e. custom.js.
const jsMainFile = 'ppv-ngg-main';

// JS Multi options which are not concatenated.

// Path to JS Public vendor files.
const jsMultiSRC = './assets/js/multi/*.js';

// Path to place the compiled JS Public vendors file.
const jsMultiDEST = pluginFolder + '/assets/js/';

// >>>>> Other file paths.
// Path to PHP files.
const phpSRC = [
    './**/*.php',
    '!node_modules/**/*'
];

// Path to place PHP files.
const phpDEST = pluginFolder;

// Miscellaneous files.
const miscGlob = [
    './**',
    '!./{node_modules,node_modules/**/*}',
    '!./{dist,dist/**/*}',
    '!./.git',
    '!./.svn',
    '!./gulpfile.babel.js',
    '!./wpgulp.config.js',
    '!./.eslintrc.js',
    '!./.eslintignore',
    '!./.editorconfig',
    '!./phpcs.xml.dist',
    '!./vscode',
    '!./package.json',
    '!./package-lock.json',
    '!./**/*.php',
    '!./{admin,admin/**/*}',
    '!./{public,public/**/*}',
    '!./{includes,includes/**/*}',
    '!./{(assets/js,assets/js/**/*}',
    '!./{assets/scss,assets/scss/**/*}'
];

// Path to place miscellaneous files.
const miscDEST = pluginFolder;

// Non-processed vendor JS
const vendorJsSRC = [
    './node_modules/justifiedGallery/dist/js/*.js',
    './node_modules/simplelightbox/dist/*.js'
];

// Path to place non-processed vendor JS files.
const vendorJsDEST = pluginFolder + '/assets/js/';

// Readme text file location.
const readmeSRC = './README.txt';

// Path of markdown file.
const readmeDEST = '.';

// >>>>> Watch files paths.
// Path to all *.scss files inside css folder and inside them.
const watchStyles = [
    './assets/scss/**/*.scss'
];

// Path to all *.js files.
const watchJs = [
    './assets/js/**/*.js'
];

// Path to all PHP files.
const watchPhp = phpSRC;

// Path to all miscellaneous files.
const watchMisc = [
    './assets/images/**/*',
    './languages/**/*',
    './*.md',
    './*.txt'
];

// >>>>> Zip file config.
// Must have.zip at the end.
const zipName = pluginName + '.zip';

// Path to WordPress plugin folder.
const zipSRC =  WPpluginFolder + pluginName + '/**';

// Must be a folder outside of the zipped folder.
const zipDEST = './dist';  // Folder to put Zip file in

// Browsers you care about for auto-prefixing. Browserlist https://github.com/ai/browserslist
// The following list is set as per WordPress requirements. Though; Feel free to change.
const BROWSERS_LIST = [
    '>= 1%',
    'last 1 major version',
    'not dead',
    'Chrome >= 45',
    'Firefox >= 38',
    'Edge >= 12',
    'Explorer >= 11',
    'iOS >= 9',
    'Safari >= 9',
    'Android >= 4.4',
    'Opera >= 30'
];

// Export.
module.exports = {
    projectURL,
    pluginName,
    WPpluginFolder,
    pluginFolder,
    browserAutoOpen,
    injectChanges,
    styleMainSRC,
    styleMainDEST,
    styleMultiSRC,
    styleMultiDEST,
    outputStyle,
    errLogToConsole,
    precision,
    jsMainSRC,
    jsMainDEST,
    jsMainFile,
    jsMultiSRC,
    jsMultiDEST,
    phpSRC,
    phpDEST,
    miscGlob,
    miscDEST,
    readmeSRC,
    readmeDEST,
    vendorJsSRC,
    vendorJsDEST,
    watchStyles,
    watchJs,
    watchPhp,
    watchMisc,
    zipName,
    zipSRC,
    zipDEST,
    BROWSERS_LIST
};
