<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://yourzone.website
 * @since      1.0.0
 *
 * @package    Video_Play_Pause
 * @subpackage Video_Play_Pause/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Video_Play_Pause
 * @subpackage Video_Play_Pause/public
 * @author     Marco Acciarri <dev@yourzone.website>
 */
class Video_Play_Pause_Public
{

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
	public function __construct($plugin_name, $version)
	{

		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Video_Play_Pause_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Video_Play_Pause_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		//wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/video-play-pause-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Video_Play_Pause_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Video_Play_Pause_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script('vimeo-player-sdk', 'https://player.vimeo.com/api/player.js', array(), null, true);
		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/video-play-pause-public.js', array('jquery', 'vimeo-player-sdk'), $this->version, true);
		wp_enqueue_script('elmentor-entrance-animate', plugin_dir_url(__FILE__) . 'js/elementor-entrance-animate.js', array('jquery'), $this->version, true);
	}

	public function show_assets_in_header()
	{
		global $post;
		if (is_object($post)) {
			global $wp_scripts;
			echo '<pre style="color:black">';
			print_r($wp_scripts->done);
			echo '</pre>';

			global $wp_styles;
			echo '<pre style="color:black">';
			print_r($wp_styles->done);
			echo '</pre>';
		}
	}

	public function show_assets_in_footer()
	{
		global $post;
		if (is_object($post)) {
			global $wp_scripts;
			echo '<pre style="color:black">';
			print_r($wp_scripts->done);
			echo '</pre>';

			global $wp_styles;
			echo '<pre style="color:black">';
			print_r($wp_styles->done);
			echo '</pre>';
		}
	}
}
