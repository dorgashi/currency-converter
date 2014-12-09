var home = angular.module('homeModule', [])
.controller('homeController', ['$scope', '$state', '$interval', 'currencyService', function($scope, $state, $interval, currencyService) {
	
	$scope.list = currencyService.currencyList;
	$scope.current = {};
	$scope.loading = false;
	$scope.lastUpdate = {};

	$interval(function() {
		if ( $scope.lastUpdate.time ) {
			$scope.lastUpdate.when = dateFormat(new Date($scope.lastUpdate.ms));
		}
	}, 5000);

    var conversionData;
    var lastTimestamp;

	$scope.convertCurrency = function( arg ) {

		$scope.current.all = [];

		$scope.current.code = arg;

		if ( conversionData && lastTimestamp && new Date().getTime() - lastTimestamp < 30000 ) {

			var selected = conversionData[arg];

			var total = 0;

			for ( key in selected ) {

                $scope.current.all.push(
                	{
                	    value: selected[key].rates.last,
                	    source: key
                	}
                );

                total += selected[key].rates.last;

			}

			$scope.current.average = (total/Object.keys(selected).length).toFixed(2);

		}
		else {

			lastTimestamp = new Date().getTime();

			$scope.loading = true;

			var total = 0;
            
            var timer = 0;

			var updateTimer = $interval(function() {
				timer++;
			}, 1)

			currencyService.getData(function(data) {

				$interval.cancel(updateTimer);

				var date = new Date();

				$scope.lastUpdate.time = timer/60;
				$scope.lastUpdate.ms = date.getTime();
				$scope.lastUpdate.when = dateFormat(date);

			    var selected = data[arg];

				for ( key in selected ) {

	                $scope.current.all.push(
	                	{
	                	    value: selected[key].rates.last,
	                	    source: key
	                	}
	                );

	                total += selected[key].rates.last;

				}

				$scope.current.average = (total/Object.keys(selected).length).toFixed(2);

			    $scope.loading = false;

			    conversionData = data;

			});

		}

	}

	$scope.refresh = function() {
		conversionData = null;
		$scope.convertCurrency($scope.current.code);
	}

	function dateFormat(date) {
        
        var time = date.getTime();
        var d = new Date().getTime() - time;
         
        if ( d < 60000 ) {
        	return 'Less than a minute ago';
        }
        else if ( d >= 60000 && d < 120000 ) {
        	return 'About a minute ago';
        }
        else if ( d >= 120000 && d < 180000 ) {
        	return 'About 2 minutes ago';
        }
        else if ( d >= 180000 && d < 240000 ) {
        	return 'About 3 minutes ago';
        }
        else if ( d >= 240000 && d < 280000 ) {
        	return 'About 4 minutes ago';
        }

	}

}]);