// var $ = jQuery;

var app = angular.module('app', ['ngRoute','ngSanitize'])
 .controller('MainController', function($scope, $http) {

	// get xml
 	var x2js = new X2JS();
	
	$http({
	  method: 'GET',
	  url: 'https://crossorigin.me/http://mix.chimpfeedr.com/0f01a-Grantland-Forever'
	 }).then(function successCallback(response) {
		var jsonData = x2js.xml_str2json( response.data );
		$scope.process(jsonData.feed);
	  }, function errorCallback(response) {
	  	console.log('error',response);
	});

	 // process data

	 $scope.process = function(data) {
	 	$scope.entries = [];
	 	for(var i in data.entry) {
	 		var entry = data.entry[i];
	 		$scope.entries.push({
	 			link: entry.link._href,
	 			text: entry.content.toString(),
	 			author: 'Bill Simmons',
	 			title: entry.title.toString(),
	 			updated: entry.updated
	 		});
	 	}
	 };

 });