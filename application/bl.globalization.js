/* global angular */
/**
 * @file		bl.globalization: A collection of front-end utilities for internationalization / localization support within BlackLine
 * @author		Alexandru Carcea <alexandru.carcea@blackline.com>
 * @version		1.0.0
 * @since		7.15.0
 * @added		2017-06-13
 * @namespace	bl.globalization
 */
(function(angular) {
	angular.module('bl.globalization', ['ng'])
		/**
		 * `bl.i18n` provides internationalization / translation support for Angular modules within BlackLine.
		 * 	It is a configurable, easy to use translation service that allows retrieval of proper translations for
		 * 	various resources, based on the user's preferred language(s), as defined via browser settings.
		 * @namespace	bl.i18n
		 * @author		Alexandru Carcea <alexandru.carcea@blackline.com>
		 * @version		1.0.0
		 * @added		2017-06-14
		 * @since		7.15.0
		 * @memberOf	bl.globalization
		 */
		.factory('bl.i18n', ['$window', function($window) {
			var
				/**
				 * Cached reference to the default culture used by the application
				 * @constant	{string}	DEFAULT_CULTURE
				 * @author		Alexandru Carcea <alexandru.carcea@blackline.com>
				 * @version		1.0.0
				 * @added		2017-06-08
				 * @since		1.2.0
				 * @inner
				 * @memberOf	bl.i18n
				 */
				DEFAULT_CULTURE = 'en-us'

				/**
				 * Cached reference to `$window.navigator`
				 * @constant	{Navigator}	NAVIGATOR
				 * @author		Alexandru Carcea <alexandru.carcea@blackline.com>
				 * @version		1.0.0
				 * @added		2017-06-09
				 * @since		7.15.0
				 * @inner
				 * @memberOf	bl.i18n
				 */
				, NAVIGATOR = $window.navigator

				/**
				 * Retrieves to the user's preferred languages / cultures, as specified via `options.cultures` or
				 * 	configured via browser settings
				 * @method		getPreferredCultures
				 * @author		Alexandru Carcea <alexandru.carcea@blackline.com>
				 * @version		1.0.0
				 * @added		2017-06-15
				 * @since		7.15.0
				 * @inner
				 * @memberOf	bl.i18n
				 * @param		{object}	options	A set of configuration options used to customize the translation service
				 * @param		{string[]}	[options.cultures]	A set of specific cultures to consider for translations
				 * @returns		{string[]}	A list of the user's cultures, ordered by user preference
				 */
				, getPreferredCultures = function(options) {
					// get the user's preferred cultures, as configured via browser settings
					var aCultures = ((options && options.cultures) || [].concat(
							NAVIGATOR.languages || [ NAVIGATOR.language || NAVIGATOR.userLanguage ]
						)).concat(DEFAULT_CULTURE)
						, oCultures = {}
						;
					// augment culture preferences to include base language, culture & culture variants
					return aCultures.reduce(function(aPreferredCultures, sCulture) {
						var aCultureParts = sCulture.toLowerCase().match(/(\w+)(?:-(\w+))*/)
							, sLanguageVariant = aCultureParts && aCultureParts[0]
							, nVariantIndex
							;

						// make sure we only include one instance of each language variant
						// if we've already encountered a language variant, no need to process it any further,
						// as we've already processed it once before
						while (sLanguageVariant && !oCultures.hasOwnProperty(sLanguageVariant)) {
							// include language variant in language preferences in order: culture variant(s),
							// base culture, base language
							aPreferredCultures.push(sLanguageVariant);

							// mark language variant as already processed
							oCultures[sLanguageVariant] = true;

							// widen search area: culture variant(s) -> base culture -> base language
							// (e.g., 'en-US-boont' -> 'en-US' -> 'en')
							sLanguageVariant = ~(nVariantIndex = sLanguageVariant.lastIndexOf('-'))
								? sLanguageVariant.slice(0, nVariantIndex) : '';
						}
						return aPreferredCultures;
					}, []);
				}
				;

			/**
			 * Sets up this service's internationalization support to reflect the specified translations. The provided
			 * configuration is expected to reflect various languages, cultures or variants. When a translation is missing
			 * for a particular culture, the translation service will default to its base language.
			 * @method		configure
			 * @author		Alexandru Carcea <alexandru.carcea@blackline.com>
			 * @version		1.0.0
			 * @added		2017-06-13
			 * @since		7.15.0
			 * @memberOf	bl.globalization
			 * @param		{object}	i18n	A collection of translations, grouped by language, culture or culture variant
			 * 									Resources are identified by their name, and as such, each culture is expected
			 * 									to contain a set or properties whose name matches that of the desired resource.
			 * 									<p>If a particular culture does not include a certain resource, the translation
			 * 									process will resort to using the closest related culture, eventually resorting
			 * 									to using the default locale. If the specified resource is unavailable on the
			 * 									default locale as well, the resource identifier is returned, as a last resort.</p>
			 * @param		{object}	options	A set of configuration options to tweak the behavior of the translation service.
			 * @param		{boolean}	[options.lowerCase=false]			Specifies whether to convert resource IDs to
			 * 																lowercase for resource retrieval.
			 * @param		{boolean}	[options.ignoreWhitespace=false]	Specifies whether to ignore any whitespace
			 * 																within resource IDs for resource retrieval.
			 * @param		{function}	[options.findResource]	A custom resource retrieval function. The expected signature is:
			 * 													`(translations:object, id:string) => string`
			 * @returns		{function}	A function that, when invoked, will retrieve a translation for the specified resource.
			 * @example		<caption>Basic Usage</caption>
			 * angular.module('some.module', ['bl.globalization']).run(['bl.i18n', function(translatorFactory) {
			 * 	var translate = translatorFactory({
			 * 		en: {
			 * 			salutation: "Hello, world!"
			 * 		},
			 * 		fr: {
			 * 			salutation: "Bonjour, monde!"
			 * 		}
			 * 	});
			 * 	console.log(translate('salutation'));
			 * }]);
			 * @example		<caption>Ignoring casing issues for resource IDs</caption>
			 * angular.module('some.module', ['bl.globalization']).run(['bl.i18n', function(translatorFactory) {
			 * 	var translate = translatorFactory({
			 * 		en: {
			 * 			salutation: "Hello, world!"
			 * 		},
			 * 		fr: {
			 * 			salutation: "Bonjour, monde!"
			 * 		}
			 * 	}, { lowerCase: true });
			 * 	// the following forms are equivalent
			 * 	console.log(translate('salutation'), translate('Salutation'), translate('SaLuTaTiOn'));
			 * }]);
			 * @example		<caption>Ignoring whitespace for resource IDs</caption>
			 * angular.module('some.module', ['bl.globalization']).run(['bl.i18n', function(translatorFactory) {
			 * 	var translate = translatorFactory({
			 * 		en: {
			 * 			salutation: "Hello, world!"
			 * 		},
			 * 		fr: {
			 * 			salutation: "Bonjour, monde!"
			 * 		}
			 * 	}, { ignoreWhitespace: true });
			 * 	// the following forms are equivalent
			 * 	console.log(translate('salutation'), translate('   salutation   '), translate('s a l u t a t i o n'));
			 * }]);
			 * @example		<caption>Customizing resource retrieval</caption>
			 * angular.module('some.module', ['bl.globalization']).run(['bl.i18n', function(translatorFactory) {
			 * 	var translate = translatorFactory({
			 * 		en: {
			 * 			SaLuTaTiOn: "Hello, world!"
			 * 		},
			 * 		fr: {
			 * 			sAlUtAtIoN: "Bonjour, monde!"
			 * 		}
			 * 	}, {
			 * 		findResource: function(translations, id) {
			 * 			// match resources in a fully case-insensitive manner, ignoring non-alphanumeric characters
			 * 			var transform = function(id) {
			 * 					return id.replace(/\W/g, '').toLowerCase();
			 * 				}
			 * 				, resourceIDs = Object.keys(translations).reduce(function(resources, id) {
			 * 					resources[transform(id)] = id;
			 * 					return resources;
			 * 				}, {})
			 * 				;
			 * 			return translations[resourceIDs[transform(id)]];
			 * 		}
			 * 	});
			 * 	// the following forms are equivalent
			 * 	console.log(translate('salutation'), translate('~s!a#l$u%t^a&t*i(o)n+'), translate('S A L U T A T I O N'));
			 * }]);
			 */
			return function configure(i18n, options) {
				var
					/**
					 * Cached reference to the internationalization configuration for the carousel.
					 * @constant	{object}	I18N
					 * @author		Alexandru Carcea <alexandru.carcea@blackline.com>
					 * @version		1.0.0
					 * @added		2017-06-08
					 * @since		7.15.0
					 * @private
					 * @inner
					 * @memberOf	bl.i18n
					 */
					I18N = (function(i18n) {
						// map all configured cultures to lowercase for consistency
							return i18n ? Object.keys(i18n).reduce(function(result, culture) {
								result[culture.toLowerCase()] = i18n[culture];
								return result;
							}, {}) : {};
						})(i18n)
					/**
					 * Retrieves a resource from a set of culture-specific translations, based on its identifier.
					 * @method		findResource
					 * @author		Alexandru.Carcea <alexandru.carcea@blackline.com>
					 * @version		1.0.0
					 * @added		2017-06-14
					 * @since		7.15.0
					 * @private
					 * @inner
					 * @memberOf	bl.globalization
					 * @param		{object}	translations	A set of culture-specific translations for various resources
					 * @param		{string}	id				The identifier for the requested resource
					 * @returns		{string}	A translation for the specified resource
					 */
					, findResource = options
						? options.findResource || function(translations, id) {
							var sResourceId = id;
							options.lowerCase && (sResourceId = sResourceId.toLowerCase());
							options.ignoreWhitespace && (sResourceId = sResourceId.replace(/\s/g, ''));

							return translations[sResourceId];
						}
						: function(translations, id) {
							return translations[id];
						}
					, aPreferredCultures = getPreferredCultures(options)
					;

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
				 * @memberOf	bl.i18n
				 * @param		{string}	id	The identifier for the desired resource
				 * @returns		{string}	A translation for the specified resource in the current culture
				 * @example		<caption>Basic Usage</caption>
				 * <div class="internationalizable">{{getResource('potato')}}</div>
				 */
				return function getResource(id) {
					var oResources, sValue, sCulture
						, i = 0
						, l = aPreferredCultures.length
						;
					for (; i < l; i += 1) {
						sCulture = aPreferredCultures[i];
						if ((oResources = I18N[sCulture]) && (sValue = findResource(oResources, id))) {
							return sValue;
						}
					}
					return id;
				};
			};
		}])
	;
}(angular));
