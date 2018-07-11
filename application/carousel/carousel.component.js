/*global angular */
/**
 * @author  Radu Macovei <radu.macovei@blackline.com>
 * @added   2017-01-04
 */
(function() {
	'use strict';

	angular
		.module('bl.login')
		.value('bl.login.carousel.config', {})
		.value('bl.login.carousel.configUrl', '')
		.component('loginCarousel', {
			templateUrl: '/assets/global/modules/login/carousel/carousel.component.html',
			bindings: {
				'animation': '@',
				'cssns': '@',
				'data': '<'
			},
			controller: ['bl.login.carousel.config', 'bl.login.carousel.configUrl', 'LoginCarouselService', '$interval', '$timeout', LoginCarouselController]
		})
	;

	/**
	 * Login Carousel's component Controller
	 *
	 * @constructor    LoginCarouselController
	 * @param     {object}      carouselDefaultConfig      	The config object for carousel.
	 * @param     {string}      carouselConfigUrl       The config URL for carousel.
	 * @param     {object}    	loginCarouselService   The LoginCarouselService
	 * @param     {function}    $interval           AngularJS's wrapper for window.setInterval
	 * @param     {function}    $timeout            AngularJS's wrapper for window.setTimeout
	 * @author    Radu Macovei <radu.macovei@blackline.com>
	 * @added     2017-01-05
	 * @memberof  bl.login
	 * @since     7.13.3
	 * @private
	 */
	function LoginCarouselController(carouselDefaultConfig, carouselConfigUrl, loginCarouselService, $interval, $timeout) {
		var model = this
			, state = {
				current: 0,
				length: 0
			}
			, stopAuto

			/**
			 * Enables the auto sliding per config
			 * @method    _autoSlide
			 * @author    Dina Gavriliuc <dina.gavriliuc@blackline.com>
			 * @added     2017-03-20
			 * @since     7.14.0
			 * @returns   {undefined}
			 * @private
			 */
			, _autoSlide = function() {
				var config = model.data.slideshow;
				if (stopAuto) {
					$interval.cancel(stopAuto);
				}

				if (config.autoPlay && (model.items.length > 1)) {
					stopAuto = $interval(model.showNext, config.interval);
				}
			}

			/**
			 * Corrects current slide index, when it goes out of limits.
			 * @method    handleSlideOverflow
			 * @returns   {undefined}
			 * @private
			 */
			, _handleSlideOverflow = function() {
				if (state.current >= state.length) {
					state.current = 0;
				} else if (state.current < 0) {
					state.current = state.length - 1;
				}
			}
			, _initCarousel = function(response) {
				var DEFAULT_CONFIG = {
						slideshow: {
							autoPlay: true,
							interval: 5000,
							restart: 2000
						}
					}
					, carouselConfig = response.data
					, data = model.data = angular.merge({}, DEFAULT_CONFIG, carouselDefaultConfig, carouselConfig, model.data)
				;

				angular.isObject(data.settings) || (data.settings = {});
				angular.isArray(data.items) || (data.items = []);
				angular.isObject(data.types) || (data.types = {});
				angular.isObject(data.slideshow) || (data.slideshow = DEFAULT_CONFIG.slideshow);

				model.state = state;
				model.animation = data.settings.animation || 'slide';
				model.state.length = data.items.length;
				model.items = data.items;
				model.types = data.types;
				model.settings = data.settings;
				model.showControls = data.items.length > 1;
				model.carouselLoading = true;

				_processSlidesProperties(model.items);
				_autoSlide();
			}

			/**
			 * Goes through the given array of slide objects, normalizes (or simplifies by getting rid of unnecessary
			 * 	namespaces) properties, and sets proper templates if needed.
			 * @method      processSlidesProperties
			 * @param       {Array}     items      Slides objects array to be processed
			 * @returns     {undefined}
			 * @private
			 */
			, _processSlidesProperties = function(items) {
				var sDefaultTemplateUrl = model.settings.defaultTemplateUrl
					, _ISOBJECT = angular.isObject
					, CUSTOM_TEMPLATE = model.types.customTemplate
					;

				items.forEach(function(slide) {
					var oSlideComponents
						, oData
						, oTemplate
						;

					if (!_ISOBJECT(slide)) {
						return;
					}

					if (slide.type === CUSTOM_TEMPLATE || sDefaultTemplateUrl) {
						oSlideComponents = slide.components;

						if (_ISOBJECT(oSlideComponents)) {
							oData = oSlideComponents.data;
							oTemplate = oSlideComponents.template;
						}

						slide.data = oData || {};
						slide.templateUrl = (oTemplate && oTemplate.url) || sDefaultTemplateUrl;

						// When a default template url comes through settings,
						// For all slides (except those that have their own custom template assigned)
						// The carousel slide content shall be handled through ng-template using the above mentioned default template
						slide.type = CUSTOM_TEMPLATE;
					}
				});
			}
			;

		/**
		 * Component's initialize event callback.
		 * @method    $onInit
		 * @returns   {undefined}
		 * @private
		 */
		this.$onInit = loginCarouselService.getConfigData(carouselConfigUrl).then(_initCarousel)['catch'](_initCarousel);

		/**
		 * Changes and displays current slide based on slide index parameter.
		 * @method    show
		 * @param     {number}      slideIndex      The index on slide to be shown and set as current.
		 * @returns   {undefined}
		 * @private
		 */
		model.show = function(slideIndex) {
			state.current = slideIndex;
			_handleSlideOverflow();
		};

		/**
		 * Changes and displays next slide. If there is no next slide, the very first one will be considered instead.
		 * @method    showNext
		 * @returns   {undefined}
		 * @private
		 */
		model.showNext = function() {
			state.current += 1;
			_handleSlideOverflow();
		};

		/**
		 * Changes and displays next slide. If there is no next slide, the very last one will be considered instead.
		 * @method    showPrev
		 * @returns   {undefined}
		 * @private
		 */
		model.showPrev = function() {
			state.current -= 1;
			_handleSlideOverflow();
		};

		/**
		 * Disables the auto sliding and restarts/stops the auto-sliding per config
		 * @method    stopAutoSliding
		 * @author    Dina Gavriliuc <dina.gavriliuc@blackline.com>
		 * @added     2017-03-21
		 * @since     7.14.0
		 * @returns   {undefined}
		 * @private
		 */
		model.stopAutoSliding = function() {
			var config = model.data && model.data.slideshow;
			$interval.cancel(stopAuto);

			//restart auto-sliding if required
			if (config && config.restart && (model.items.length > 1)) {
				$timeout(_autoSlide, config.restart);
			}
		};
	}
})();
