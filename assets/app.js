// var $ = jQuery;

var app = angular.module('app', ['ngRoute','ngSanitize'])
 .controller('MainController', function($scope, $http) {
 	var x2js = new X2JS();
 	// var xmlText = "<MyRoot><test>Success</test><test2><item>val1</item><item>val2</item></test2></MyRoot>";
	// var jsonObj = x2js.xml_str2json( xmlText );

	$http({
	  method: 'GET',
	  url: 'http://mix.chimpfeedr.com/0f01a-Grantland-Forever'
	 }).then(function successCallback(response) {
		var jsonData = x2js.xml_str2json( response.data );
		$scope.process(jsonData.feed);
	  }, function errorCallback(response) {
	  	console.log('error',response);
	});

	 $scope.process = function(data) {
	 	$scope.entries = [];
	 	for(var i in data.entry) {
	 		var entry = data.entry[i];
	 		console.log('entry',entry);
	 		$scope.entries.push({
	 			link: entry.link._href,
	 			text: entry.content.toString(),
	 			author: 'Bill Simmons',
	 			title: entry.title.toString(),
	 			updated: entry.updated
	 		});
	 	}
	 	console.log('$scope.entries',$scope.entries);
	 };

 });