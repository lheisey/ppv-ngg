<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://github.com/lheisey/
 * @since             1.0.0
 * @package           Ppv_Ngg
 *
 * @wordpress-plugin
 * Plugin Name:       Picturesque Photo Views NextGEN Addons
 * Plugin URI:        https://github.com/lheisey/ppv-ngg/
 * Description:       Adds album and justified gallery templates for the NextGEN Gallery plugin.
 * Version:           1.1.0
 * Author:            Loren Heisey
 * Author URI:        https://github.com/lheisey/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       ppv-ngg
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PPV_NGG_VERSION', '1.1.0' );

/**
 * Setup plugin constants.
 * Relative to plugin root directory.
 */
// Plugin Folder Path.
if ( ! defined( 'PPV_NGG_PLUGIN_DIR' ) ) {
    define( 'PPV_NGG_PLUGIN_DIR', trailingslashit( plugin_dir_path( __FILE__ ) ) );
}
// Plugin Folder URL.
if ( ! defined( 'PPV_NGG_PLUGIN_URL' ) ) {
    define( 'PPV_NGG_PLUGIN_URL', trailingslashit( plugin_dir_url( __FILE__ ) ) );
}
// Plugin Root File.
if ( ! defined( 'PPV_NGG_PLUGIN_FILE' ) ) {
    define( 'PPV_NGG_PLUGIN_FILE', trailingslashit( __FILE__ ) );
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-ppv-ngg-activator.php
 */
function activate_ppv_ngg() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-ppv-ngg-activator.php';
	Ppv_Ngg_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-ppv-ngg-deactivator.php
 */
function deactivate_ppv_ngg() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-ppv-ngg-deactivator.php';
	Ppv_Ngg_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_ppv_ngg' );
register_deactivation_hook( __FILE__, 'deactivate_ppv_ngg' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-ppv-ngg.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_ppv_ngg() {

	$plugin = new Ppv_Ngg();
	$plugin->run();

}
run_ppv_ngg();
