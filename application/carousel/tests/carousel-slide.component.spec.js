/* globals angular, JSON */
/**
 * @file		carousel-slide.component.spec: A collection of specs used to validate the behavior of the `LoginCarouselSlideController` class
 * @author		Alexandru Carcea <alexandru.carcea@blackline.com>
 * @version		1.0.0
 * @since		7.15.0
 * @added		2017-06-09
 */
define([
	'chai/chai',
	'intern!bdd',
	'chaiDom/chai-dom',
	'intern/order!angular/angular',
	'intern/order!angular/angular-sanitize',
	'intern/order!angular/angular-mocks',
	'intern/order!modules/login/bl.globalization',
	'intern/order!modules/login/login.module',
	'intern/order!modules/login/login.templates',
	'intern/order!modules/login/carousel/carousel-slide.component'
], function(chai, bdd, chaiDom) {
	var describe = bdd.describe
		, it = bdd.it
		, expect = chai.expect
		, before = bdd.before
		, beforeEach = bdd.beforeEach
		, after = bdd.after
		;

	chai.use(chaiDom);

	describe('Test Suite for carousel-slide.component:', function() {
		var SCSSNS = 'test--carousel'
			, SELECTORS = {
				background: '.' + SCSSNS + '-slide-background',
				title: '.' + SCSSNS + '-slide-title',
				description: '.' + SCSSNS + '-slide-description',
				button: '.' + SCSSNS + '-slide-button'
			}
			, DEFAULT_CONTEXT = {
				cssns: SCSSNS,
				types: {
					standard: 0,
					custom: 1,
					customTemplate: 2
				}
			}
			, DEFAULT_DATA = {
				type: 0,
				backgroundUrl: 'http://example.com/background.jpg',
				backgroundColor: 'rgb(123, 123, 123)',
				components: {
					title: {
						text: 'UT Title'
					},
					description: {
						text: 'UT Description'
					},
					links: [{
						text: 'UT Link',
						url: 'http://example.com/'
					}]
				}
			}
			, buildComponent = function(validate, data, context) {
				angular.injector(['ng', 'ngSanitize', 'ngMock', 'bl.globalization', 'bl.login', 'ut']).invoke([
					'$rootScope', '$compile',
					function($rootScope, $compile) {
						var scope = $rootScope.$new()
							, sMarkup = '<login-carousel-slide'
								+ (context ? ' context="' + (JSON.stringify(context).replace(/"/g, '&quot;')) + '"' : '')
								+ (data ? (' slide="' + JSON.stringify(data).replace(/"/g, '&quot;') + '"') : '')
								+ '></login-carousel-slide>'
							, elComponent = $compile(sMarkup)(scope)[0]
							;

						scope.$digest();

						validate(elComponent);
					}]);
			}
			;

		before(function() {
			angular.module('ut', []);
		});

		beforeEach(function() {
			angular.module('bl.login').value('bl.login.carousel.config', {});
		});

		it('should use the specified background image', function() {
			buildComponent(function(el) {
				var elComponent = el.querySelectorAll(SELECTORS.background);
				expect(elComponent).to.have.lengthOf(1);
				expect(elComponent[0].style.backgroundImage).to.equal('url("' + DEFAULT_DATA.backgroundUrl + '")');
			}, DEFAULT_DATA, DEFAULT_CONTEXT);
		});

		it('should use the specified background color', function() {
			buildComponent(function(el) {
				var elComponent = el.querySelectorAll(SELECTORS.background);
				expect(elComponent).to.have.lengthOf(1);
				expect(elComponent[0].style.backgroundColor).to.equal(DEFAULT_DATA.backgroundColor);
			}, DEFAULT_DATA, DEFAULT_CONTEXT);
		});

		it('should render a standard slide title', function() {
			buildComponent(function(el) {
				var elTitle = el.querySelectorAll(SELECTORS.title)
					, oTitle = DEFAULT_DATA.components.title
					;
				expect(elTitle).to.have.lengthOf(1);
				expect(elTitle[0]).to.have.text(oTitle.text);
			}, DEFAULT_DATA, DEFAULT_CONTEXT);
		});

		it('should render a standard slide description', function() {
			buildComponent(function(el) {
				var elDescription = el.querySelectorAll(SELECTORS.description)
					, oDescription = DEFAULT_DATA.components.description
					;
				expect(elDescription).to.have.lengthOf(1);
				expect(elDescription[0]).to.have.text(oDescription.text);
			}, DEFAULT_DATA, DEFAULT_CONTEXT);
		});

		it('should render standard slide links', function() {
			buildComponent(function(el) {
				var elLinks = el.querySelectorAll(SELECTORS.button)
					, aLinks = DEFAULT_DATA.components.links
					;
				expect(elLinks).to.have.lengthOf(aLinks.length);
				aLinks.forEach(function(oLink, i) {
					expect(elLinks[i]).to.have.text(oLink.text);
					expect(elLinks[i]).to.have.attr('href', oLink.url);
					expect(elLinks[i]).to.have.attr('target', '_blank');
				});
			}, DEFAULT_DATA, DEFAULT_CONTEXT);
		});

		describe('internationalization', function() {
			var I18N = {
				'UT Title': 'UT Title Translated',
				'UT Description': 'UT Description Translated',
				'UT Link': 'UT Link Translated'
			};

			before(function() {
				angular.module('ut').value('$window', { navigator: { languages: ['ut-UT'] } });
			});

			after(function() {
				angular.module('ut').value('$window', null);
			});

			beforeEach(function() {
				angular.module('bl.login').value('bl.login.carousel.config', {
					i18n: { 'ut-UT': I18N }
				});
			});

			it('should render a standard slide title', function() {
				buildComponent(function(el) {
					var elTitle = el.querySelectorAll(SELECTORS.title)
						, oTitle = DEFAULT_DATA.components.title
						;
					expect(elTitle[0]).to.have.text(I18N[oTitle.text]);
				}, DEFAULT_DATA, DEFAULT_CONTEXT);
			});

			it('should render a standard slide description', function() {
				buildComponent(function(el) {
					var elDescription = el.querySelectorAll(SELECTORS.description)
						, oDescription = DEFAULT_DATA.components.description
						;
					expect(elDescription[0]).to.have.text(I18N[oDescription.text]);
				}, DEFAULT_DATA, DEFAULT_CONTEXT);
			});

			it('should render standard slide links', function() {
				buildComponent(function(el) {
					var elLinks = el.querySelectorAll(SELECTORS.button)
						, aLinks = DEFAULT_DATA.components.links
						;
					aLinks.forEach(function(oLink, i) {
						expect(elLinks[i]).to.have.text(I18N[oLink.text]);
					});
				}, DEFAULT_DATA, DEFAULT_CONTEXT);
			});
		});
	});
});
