angular.module("umbraco").controller("UmbracoDayOfWeekController", function ($scope, $routeParams, $http, localizationService) {

	$scope.loadInProgress = true;
	$scope.displayValue = $scope.model.value;
	$scope.inEditState = !!$routeParams.create || (typeof $scope.model.value === 'string' && $scope.model.value.length !== 1);
	$scope.valueToNumber = function () {
		$scope.model.value = typeof $scope.model.value === 'string' && $scope.model.value.length === 1 ? Number($scope.model.value) : $scope.model.value;
	}
	$scope.valueToNumber();
	

	var localizeList = [
		"UmbracoDayOfWeek_Edit",
		"UmbracoDayOfWeek_d0",
		"UmbracoDayOfWeek_d1",
		"UmbracoDayOfWeek_d2",
		"UmbracoDayOfWeek_d3",
		"UmbracoDayOfWeek_d4",
		"UmbracoDayOfWeek_d5",
		"UmbracoDayOfWeek_d6"
		];
	$scope.translations = {};

	$scope.onEdit = function () {
		$scope.valueToNumber();
		$scope.inEditState = true;
	}

	localizationService.localizeMany(localizeList).then(function (data) {
		for (var i = 0; i < localizeList.length; ++i) {
			$scope.translations[localizeList[i]] = data[i];
		}
	});
	$scope.model.list = [];

	$scope.updateDisplayValue = function () {
		if (($scope.model.value >= 0 && $scope.model.value < 7) || (typeof $scope.model.value === 'string' && $scope.model.value.length === 1)) {
			var valueFromList = _.find($scope.model.list, function (item) { return item.Id == $scope.model.value });
			if (valueFromList) { $scope.displayValue = $scope.translations["UmbracoDayOfWeek_d" + valueFromList.Id] || valueFromList.DefaultName };
		}
	}


	$http.get("/umbraco/backoffice/UmbracoDayOfWeek/DayOfWeekApi/GetKeyValueList?defaultDayOfWeek=" + ($scope.model.config.defaultStartDayOfWeek || 6)).then(function (response) {
		$scope.model.list = response.data;
		for (var i = 0; i < $scope.model.list.length; ++i) {
			$scope.model.list[i].Name = $scope.translations["UmbracoDayOfWeek_d" + $scope.model.list[i].Id] || $scope.model.list[i].DefaultName;
		}
		$scope.updateDisplayValue();
		$scope.loadInProgress = false;
	}, function (err) {
		console.error(err);
		$scope.loadInProgress = false;
	});

	$scope.$on("formSubmitting", function (ev, args) {
		$scope.valueToNumber();
		$scope.updateDisplayValue();
		if (args.action === "save" || args.action === "publish") {
			$scope.inEditState = false;
		}
	});
});
