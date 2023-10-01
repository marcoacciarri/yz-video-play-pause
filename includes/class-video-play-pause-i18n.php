<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://yourzone.website
 * @since      1.0.0
 *
 * @package    Video_Play_Pause
 * @subpackage Video_Play_Pause/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Video_Play_Pause
 * @subpackage Video_Play_Pause/includes
 * @author     Marco Acciarri <dev@yourzone.website>
 */
class Video_Play_Pause_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'video-play-pause',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
