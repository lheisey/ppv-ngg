<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://github.com/lheisey/
 * @since      1.0.0
 *
 * @package    Ppv_Ngg
 * @subpackage Ppv_Ngg/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Ppv_Ngg
 * @subpackage Ppv_Ngg/public
 * @author     Loren Heisey <imwsite@cox.net>
 */
class Ppv_Ngg_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
		$this->justifiedstyles = 'justified-styles';
		$this->justifiedscripts = 'justified-scripts';
		$this->simplelightboxstyles = 'simplelightbox-styles';
		$this->simplelightboxscripts = 'simplelightbox-scripts';

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Ppv_Ngg_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Ppv_Ngg_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		// Only load Justified Gallery CSS on specified pages
		if (is_page(['gallery', 'galleries', 'picture-galleries', 'picture-albums'])) {
			wp_enqueue_style( $this->justifiedstyles, PPV_NGG_PLUGIN_URL . 'assets/css/justifiedGallery-custom.min.css', array(), $this->version, 'all' );
		}
		wp_enqueue_style( $this->simplelightboxstyles, PPV_NGG_PLUGIN_URL . 'assets/css/simple-lightbox-custom.min.css', array(), $this->version, 'all' );
		wp_enqueue_style( $this->plugin_name, PPV_NGG_PLUGIN_URL . 'assets/css/ppv-ngg-main.min.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Ppv_Ngg_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Ppv_Ngg_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		// Only load Justified Gallery JS on specified pages
		if (is_page(['gallery', 'galleries', 'picture-galleries', 'picture-albums'])) {
			wp_enqueue_script( $this->justifiedscripts, PPV_NGG_PLUGIN_URL . 'assets/js/jquery.justifiedGallery.min.js', array( 'jquery' ), $this->version, true );
		}
		wp_enqueue_script( $this->simplelightboxscripts, PPV_NGG_PLUGIN_URL . 'assets/js/simple-lightbox.jquery.min.js', array( 'jquery' ), $this->version, true );
		wp_enqueue_script( $this->plugin_name, PPV_NGG_PLUGIN_URL . 'assets/js/ppv-ngg-main.min.js', array( 'jquery' ), $this->version, true );

	}

}
