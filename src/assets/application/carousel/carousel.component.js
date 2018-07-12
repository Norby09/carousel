/*global angular */
/**
 * @author  Radu Macovei <radu.macovei@blackline.com>
 * @added   2017-01-04
 */
(function() {
	'use strict';

	angular
		.module('bl.login', ['ngRoute', 'ngSanitize', 'bl.globalization'])
		.value('bl.login.carousel.config', {})
		.value('bl.login.carousel.configUrl', '')
		.component('loginCarousel', {
			templateUrl: './assets/application/carousel/carousel.component.html',
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
				console.log(response);
				console.log(carouselConfigUrl);
				var DEFAULT_CONFIG = {
						slideshow: {
							autoPlay: false,
							interval: 5000,
							restart: 2000
						}
					}
					, carouselConfig = response.data
					, data = model.data = angular.merge({}, DEFAULT_CONFIG, carouselDefaultConfig, carouselConfig, model.data)
					// , data = { "types": { "standard": 1, "custom": 2, "customTemplate": 3 }, "settings": { "templateStyle": ".bl--login-carousel-slide-background{background-position:bottom center;}.bl--login-carousel-slide-content{top:70px;}.bl--mkt-itb-title{padding:260px 50px 0 50px;text-transform:none;font-size:40px;line-height:48px;margin-bottom:10px;font-weight:bold;}.bl--mkt-itb-description{color:#BABABA;margin-bottom:42px;line-height:24px;font-size:20px;font-weight:300;padding:0 50px 0 50px;}.bl--mkt-itb-button{font-size:14px;color:#fff;font-weight:bold;line-height:18px;padding:12px 20px;background:#117CBF;border:none;}.bl--mkt-itb-button:hover{color: #fff; background: #00A7EA;} @media all and (min-width: 481px) and (max-width: 768px) { .bl--mkt-itb-title { padding-top: 0; } }" }, "items": [{ "backgroundColor": "#000", "backgroundUrl": "https://static1.blackline.com/fcs-fe-resources/carousel/Intercompany_banner_2089x1468.jpg", "components": { "title": { "cssClass": "bl--mkt-itb-title", "text": "@title1", "type": 1 }, "description": { "cssClass": "bl--mkt-itb-description", "text": "@description1", "type": 2 }, "links": [{ "cssClass": "bl--mkt-itb-button", "text": "@registerNow1", "url": "https://www.blackline.com/resources/webinars/may-product-release-webinar-increase-visibility-control-and-accuracy", "type": 3 }] }, "id": 1, "type": 1 }, { "backgroundColor": "#000", "backgroundUrl": "https://static1.blackline.com/fcs-fe-resources/carousel/BestPracticeSummit_banner_2089x1468.jpg", "components": { "title": { "cssClass": "bl--mkt-itb-title", "text": "@title2", "type": 1 }, "description": { "cssClass": "bl--mkt-itb-description", "text": "@description2", "type": 2 }, "links": [{ "cssClass": "bl--mkt-itb-button", "text": "@attend1", "url": "https://pages.blackline.com/best-practice-summits.html", "type": 3 }] }, "id": 2, "type": 1 }, { "backgroundColor": "#000", "backgroundUrl": "https://static1.blackline.com/fcs-fe-resources/carousel/BlackLineUStore.jpg", "components": { "title": { "cssClass": "bl--mkt-itb-title", "text": "@title3", "type": 1 }, "description": { "cssClass": "bl--mkt-itb-description", "text": "@description3", "type": 2 }, "links": [{ "cssClass": "bl--mkt-itb-button", "text": "@reserveSeat", "url": "https://www.blackline.com/services/training", "type": 3 }] }, "id": 3, "type": 1 }], "slideshow": { "autoPlay": false, "interval": 5000, "restart": 2000 }, "i18n": { "en": { "@title1": "May Product Release: See What’s New", "@description1": "May 15, 2018 – 12:00 PM ET/9:00 AM PT", "@registerNow1": "REGISTER NOW", "@title2": "BlackLine''s Best Practices Summit is Coming to a City Near You", "@description2": "Metrics Matter: Turning Numbers into Knowledge", "@attend1": "ATTEND A SUMMIT", "@title3": "BlackLine U Store Now Open for Business", "@description3": "Access CPE annual e-learning passes and seats to live BlackLine U classes", "@reserveSeat": "RESERVE A SEAT" } } }
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
