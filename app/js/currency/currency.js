var currencyModule = angular.module('currencyModule', [])
.factory('currencyService', ['$http', function($http) {

	return {

		currencyList: [
		    { "name": "Australian Dollar", "code": "AUD" },
		    { "name": "Brazilian Real", "code": "BRL" },
		    { "name": "British Pound", "code": "GBP" },
		    { "name": "Canadian Dollar", "code": "CAD" },
		    { "name": "Chinese Yuan", "code": "CNY" },
		    { "name": "Euro", "code": "EUR" },
			{ "name": "Indonesian Rupiah", "code": "IDR" },
			{ "name": "Israeli New Shekel", "code": "ILS" },
			{ "name": "Mexican Peso", "code": "MXN" },
			{ "name": "New Zealand Dollar", "code": "NZD" },
			{ "name": "Norwegian Krone", "code": "NOK" },
			{ "name": "Polish Zloty", "code": "PLN" },
			{ "name": "Romanian New Leu", "code": "RON" },
			{ "name": "Russian Ruble",  "code": "RUB" },
			{ "name": "Singapore Dollar", "code": "SGD" },
			{ "name": "South African Rand", "code": "ZAR" },
			{ "name": "Swedish Krona", "code": "SEK" },
			{ "name": "Swiss Franc", "code": "CHF" },
			{ "name": "United States Dollar", "code": "USD" }
		],

	    getData: function(callback) {
	    	$http.get('https://api.bitcoinaverage.com/exchanges/all')
	    	.success(function(data, status, headers, config) {
	    		callback(data);
	    	})
	    	.error(function(data, status, headers, config) {
	    		console.log(data);
	    	});
	    }

	}

}]);