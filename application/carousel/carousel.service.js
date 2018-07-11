/* global angular */
/**
 * @file Service : LoginCarouselService - Login Carousel Service
 * @author Florin Nichifiriuc <florin.nichifiriuc@blackline.com>
 * @added 2017-12-14
 */

(function() {
	'use strict';

	angular
		.module('bl.login')
		.service('LoginCarouselService', [
			'$http'
			, function($http) {
			/**
			 * Gets metadata object
			 * @method 	getMetadata
			 * @param 		{string}	url		The url where to get the json data
			 * @returns 	{object} 	Returns configuration object from url.
			 * @author 		Florin Nichifiriuc <florin.nichifiriuc@blackline.com>
			 * @added 		2017-12-14
			 * @version 	1.0.0
			 * @memberof	bl.login
			 * @since 		7.17.0
			 * @example 	getConfigData();
			 */
				var	 getConfigData = function(url) {
					return $http.get(url);
				};

				return {
					getConfigData: getConfigData
				};
			}]);
})();
