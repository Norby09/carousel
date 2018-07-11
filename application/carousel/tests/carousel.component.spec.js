/* globals angular */
/**
 * @file loginCarousel Component Tests
 * @added 2017-01-05
 */
define([
	'intern/chai!expect',
	'intern!bdd',
	'intern/order!modules/login/carousel/tests/mocks/carousel-data',
	'intern/order!angular/angular',
	'intern/order!angular/angular-sanitize',
	'intern/order!angular/angular-mocks',
	'intern/order!modules/login/bl.globalization',
	'intern/order!modules/login/login.module',
	'intern/order!modules/login/login.templates',
	'intern/order!modules/login/carousel/carousel.component'
], function(expect, bdd, carouselData) {

	var beforeEach = bdd.beforeEach
		, afterEach = bdd.afterEach
		, describe = bdd.describe
		, it = bdd.it
		;

	describe('Login Carousel component Controller', function() {
		var
			/**
			 * Provides the passed in function with a list of dependencies.
			 * The function is not called immediately, but returned within a callable wrapper function.
			 *
			 * @param	{function|array}	fn	Function to be wrapped prepared to be called with provided dependencies as parameters.
			 * @returns	{function}	The wrapper function containing callback function prepared to be called with dependencies as parameters.
			 */
			inject = function(fn) {
				return function() {
					angular.injector(['ng', 'ngSanitize', 'ngMock', 'bl.globalization', 'bl.login']).invoke(fn);
				};
			}
			, oCtrl
			, buildScope
			, initComponent = null
			, interval
			, timeout
			;

		(inject(function($rootScope, $compile, $httpBackend, $interval, $timeout) {
			var oRootScope;

			buildScope = function(data) {
				var oScope = $rootScope.$new();

				oScope.data = data || angular.copy(carouselData);

				return oScope;
			};

			oRootScope = buildScope();
			interval = $interval;
			timeout = $timeout;
			$compile('<login-carousel data="data" cssns="bl--login-carousel"></login-carousel>')(oRootScope);
			oRootScope.$digest();

			/**
			 * Resolves a root scope and initializes/compiles the component, updating global references to component
			 * 	element, inner scope and controller.
			 *
			 * @method
			 * @param	{object}	[test]				Instance of a Test. (Like the one passed in by beforeEach method)
			 * @param	{object}	[scope]				Scope object to be used while compiling component template.
			 * @param	{boolean}	[skipDataPassing]	When true `data` attribute is set on component no more.
			 * @returns	{HTMLElement}	A reference to the HTML container for the created component
			 * @example <caption>Usage in beforeEach</caption>
			 * 	bdd.beforeEach(initComponent);
			 * @example <caption>Usage within test</caption>
			 * 	initComponent(null, rootScope.$new());
			 * 	// or (..see buildScope)
			 * 	initComponent(null, buildScope());
			 */
			initComponent = function(test, scope, skipDataPassing) {
				var el
					, elOuter
					, elChild
					, oInnerScope
					;

				oRootScope = scope || buildScope();

				el = $compile('<login-carousel ' + (skipDataPassing || 'data="data" ') + 'cssns="bl--login-carousel"></login-carousel>')(oRootScope);
				oRootScope.$digest();

				elOuter = el[0];
				elChild = elOuter.firstElementChild;
				oInnerScope = angular.element(elChild).scope();
				oCtrl = oInnerScope.$ctrl;

				return el;
			};
		}))();

		beforeEach(initComponent);

		describe('Current slide state', function() {
			it('Should initialize with proper carousel state, having proper current index', function() {
				expect(oCtrl.state.current).to.equal(0);
			});

			it('Should increment current slide index when method to show next is called', function() {
				oCtrl.showNext();
				expect(oCtrl.state.current).to.equal(1);
			});

			it('Should decrement current slide index when method to show previous is called', function() {
				var oState = oCtrl.state;

				oCtrl.showNext();
				oCtrl.showNext();
				oCtrl.showPrev();
				expect(oState.current).to.equal(1);
			});

			it('Should update current slide index when method to show particular slide is called', function() {
				oCtrl.show(2);
				expect(oCtrl.state.current).to.equal(2);
			});

			it('Should set current slide index to zero (first) index when attempt to show an item index bigger than the biggest (carousel should start over)', function() {
				oCtrl.show(5);
				expect(oCtrl.state.current).to.equal(0);

				oCtrl.show(2);
				expect(oCtrl.state.current).to.equal(2);
				oCtrl.showNext();
				expect(oCtrl.state.current).to.equal(0);
			});

			it('Should set current slide index to last index when attempt to show an item index smaller than the smallest (carousel should start over backwards)', function() {
				oCtrl.show(-1);
				expect(oCtrl.state.current).to.equal(2);

				oCtrl.show(0);
				expect(oCtrl.state.current).to.equal(0);
				oCtrl.showPrev();
				expect(oCtrl.state.current).to.equal(2);
			});

			it('Should start auto-sliding per config', function() {
				oCtrl.state.current = 0;

				expect(oCtrl.data.slideshow.autoPlay).to.be.true;
				interval.flush(oCtrl.data.slideshow.interval);

				expect(oCtrl.state.current).to.equal(1);

			});

			it('Should restart auto-sliding per config', function() {
				oCtrl.state.current = 0;

				expect(oCtrl.data.slideshow.restart).to.be.above(0);

				oCtrl.stopAutoSliding();
				timeout.flush(oCtrl.data.slideshow.restart);
				interval.flush(oCtrl.data.slideshow.interval);

				expect(oCtrl.state.current).to.equal(1);
			});

			it('Should stop auto-sliding per config', function() {
				oCtrl.state.current = 0;
				oCtrl.data.slideshow.restart = 0;

				oCtrl.stopAutoSliding();
				timeout.flush(oCtrl.data.slideshow.interval);
				interval.flush(oCtrl.data.slideshow.interval);

				expect(oCtrl.state.current).to.equal(0);
			});
		});

		describe('Items normalization', function() {
			it('Should default to hardcoded template when no template overwrites', function() {
				var oData = angular.copy(carouselData);

				oData.settings.defaultTemplateUrl = null;
				initComponent(null, buildScope(oData));

				[0, 1, 2].forEach(function(item, index) {
					expect(oCtrl.items[index].template).to.be.undefined;
				});
			});

			it('Should properly resolve default and custom template url overwrite', function() {
				var oMockData = carouselData;

				[0, 1].forEach(function(item, index) {
					expect(oCtrl.items[index].templateUrl).to.equal(oMockData.settings.defaultTemplateUrl);
				});

				expect(oCtrl.items[2].templateUrl).to.equal(oMockData.items[2].components.template.url);
			});

			it('Should properly resolve item data when default or custom template', function() {
				var oData;

				[0, 1, 2].forEach(function(item, index) {
					// Since mock data has a template url overwrite under settings, all items should have `data` property set, so that it can easily be used in template.
					// Even though, they have no data defined, so we are not going to look for anything in particular.
					oData = oCtrl.items[index].data;
					expect(oData).to.be.an('object');

					// This mock item has a custom template and explicit data payload, so we want to confirm it is resolved properly.
					if (index === 2) {
						expect(oData.title.text).to.equal(carouselData.items[2].components.data.title.text);
					}
				});
			});
		});

		describe('Controls state', function() {
			it('Should set `showControls` model property to false, when less than two items', function() {
				var oData = angular.copy(carouselData);

				expect(oCtrl.showControls).to.be.true;

				oData.items.splice(1, oData.items.length - 1);
				initComponent(null, buildScope(oData));

				expect(oCtrl.showControls).to.be.false;
			});
		});

		describe('Module value based configuration', function() {
			afterEach(inject(['bl.login.carousel.config', function(carouselConfig) {
				// Reset `bl.login.carousel.config` module value
				delete carouselConfig.types;
				delete carouselConfig.settings;
				delete carouselConfig.items;
			}]));

			it('Should fallback on `bl.login.carousel.config` module value when data attribute value is missing', inject(['bl.login.carousel.config', function(carouselConfig) {
				var oData = angular.copy(carouselData);

				oData.items.splice(oData.items.length - 1, 1);

				// Adding component configuration through `bl.login.carousel.config` module value
				angular.merge(carouselConfig, oData);

				// Initializing component without passing data (attribute) directly
				initComponent(null, null, true);

				expect(oCtrl.state.length).to.equal(2);
			}]));
		});
	});
});
