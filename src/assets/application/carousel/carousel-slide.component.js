/* global angular */
/**
 * @author	Radu Macovei <radu.macovei@blackline.com>
 * @added	2017-01-11
 */
(function() {
	'use strict';

	angular
		.module('bl.login')
		.component('loginCarouselSlide', {
			templateUrl: '/assets/application/carousel/carousel-slide.component.html',
			bindings: {
				'slide': '<',
				'context': '<',
				'config': '<'
			},
			controller: ['bl.i18n', LoginCarouselSlideController]
		})
	;

	/**
	 * Manages the Login Carousel Slide component, providing support for rendering and internationalization.
	 *
	 * @constructor	LoginCarouselSlideController
	 * @author		Radu Macovei <radu.macovei@blackline.com>
	 * @added		2017-01-05
	 * @memberof	bl.login
	 * @since	 	7.13.3
	 * @param		{function}	i18n	A reference to the `bl.i18n` translation service factory
	 * @private
	 */
	function LoginCarouselSlideController(i18n) {
		/**
		 * Retrieves the proper translation for the resource specified by `id` in the current culture.
		 * 	If no translation exists for the current culture, defaults to the base language.
		 * 	If no translation exists for the base language either, uses the default culture instead.
		 * 	If that fails as well, uses the resource ID as a last resort.
		 * @method		getResource
		 * @author		Alexandru Carcea <alexandru.carcea@blackline.com>
		 * @version		1.0.0
		 * @added		2017-06-07
		 * @since		7.15.0
		 * @memberOf	LoginCarouselSlideController
		 * @param		{string}	id	The identifier for the desired resource
		 * @returns		{string}	A translation for the specified resource in the current culture
		 * @example		<caption>Basic Usage</caption>
		 * <div class="internationalizable">{{getResource('potato')}}</div>
		 */
		this.getResource = i18n(this.config.i18n, { cultures: this.config.cultures });
	}
})();
