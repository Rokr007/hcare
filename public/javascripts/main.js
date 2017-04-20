var app = angular.module('Hcare', ['ngResource', 'ngRoute', 'ngToast']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	    .when('/', {
	    	templateUrl: 'partials/home.html'
	    })	    
	    .when('/directory/home', {
	    	templateUrl: 'partials/directoryhome.html'
	    })
	    .when('/directory/home/ambulance', {
	    	templateUrl: 'partials/ambulancehome.html',
	    	controller: 'AmbCtrl'
	    })
	    .when('/directory/home/hospital', {
	    	templateUrl: 'partials/hospitalhome.html',
	    	controller: 'HospCtrl'
	    })	    
	    .when('/about', {
	    	templateUrl: 'partials/about.html'
	    })
	    .when('/contact', {
	    	templateUrl: 'partials/contact.html'
	    })
	    .when('/healthyliving/home', {
	    	templateUrl: 'static-partials/healthyhome.html'
	    })
	    .when('/bloodbank/home', {
	    	templateUrl: 'partials/bloodbankhome.html',
	    	controller: 'BBHomeCtrl'
	    })
	    .when('/bloodbank/about', {
	    	templateUrl: 'partials/bloodbankabout.html'
	    })
	    .when('/bloodbank/bloodtips', {
	    	templateUrl: 'partials/bloodtips.html'
	    })
	    .when('/bloodbank/contact', {
	    	templateUrl: 'partials/bloodbankcontact.html'
	    })
	    .when('/bloodbank/searchdonors', {
	    	templateUrl: 'partials/searchdonors.html',
	    	controller: 'SDonorCtrl'
	    })
	    .when('/bloodbank/searchdonors/email/:id', {
	    	templateUrl: 'partials/sendemail.html',
	    	controller: 'EmailCtrl'
	    })
	    .when('/bloodbank/searchdonors/:id', {
	    	templateUrl: 'partials/donordetails.html',
	    	controller: 'DDetailsCtrl'
	    })
	    .when('/bloodbank/registerdonor', {
	    	templateUrl: 'partials/registerdonor.html',
	    	controller: 'RegDonorCtrl'
	    })
	    .when('/bloodbank/requestblood', {
	    	templateUrl: 'partials/requestblood.html',
	    	controller: 'ReqBloodCtrl'
	    })	    
	    .otherwise({
	    	redirectTo: '/'
	    });
}]);

app.controller('AmbCtrl', ['$scope', '$resource', 
	function($scope, $resource) {
		var Ambulances = $resource('/api/ambulances');
		$scope.searchName = '';
		$scope.searchAddress = '';
		$scope.searchN = '';
		$scope.searchA = '';
		$scope.resetAll= function() {
			$scope.searchName = '';
			$scope.searchAddress = '';
			$scope.searchN = '';
			$scope.searchA = '';
		}
		$scope.search = function() {
			$scope.searchN = $scope.searchName;
			$scope.searchA = $scope.searchAddress;
		}
		Ambulances.query(function(ambulances) {
			$scope.ambulances = ambulances;
		});
	}]);

app.controller('HospCtrl', ['$scope', '$resource', 
	function($scope, $resource) {
		var Ambulances = $resource('/api/hospitals');
		$scope.searchName = '';
		$scope.searchDistrict = '';
		$scope.searchN = '';
		$scope.searchD = '';
		$scope.resetAll= function() {
			$scope.searchName = '';
			$scope.searchDistrict = '';
			$scope.searchN = '';
			$scope.searchD = '';
		}
		$scope.search = function() {
			$scope.searchN = $scope.searchName;
			$scope.searchD = $scope.searchDistrict;
		}
		Ambulances.query(function(hospitals) {
			$scope.hospitals = hospitals;
		});
	}]);

app.controller('RegDonorCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){

    	
    	var Places = $resource('/api/cities');
    	Places.query(function(places){
			$scope.places = places;
		});	
    		
        $scope.save = function(){
            var Donor = $resource('/api/blooddonors/register');
            Donor.save($scope.donor, function(){
                $location.path('/');
            });
        };
        
    }]);

app.controller('ReqBloodCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
    	
    	var Places = $resource('/api/cities');
    	Places.query(function(places){
			$scope.places = places;
		});	
    	
    	
        $scope.save = function(){
            var Bloodreq = $resource('/api/bloodrequests/register');
            Bloodreq.save($scope.bloodrequest, function(){
                $location.path('/');
            });
        };
    }]);

app.controller('SDonorCtrl', ['$scope', '$resource', 
	function($scope, $resource) {
		var Cities = $resource('/api/cities');

		var Donors = $resource('/api/blooddonors');
		$scope.searchBlood = '';
		$scope.searchCity = '';
		$scope.searchB = '_';
		$scope.searchC = '_';
		$scope.resetAll= function() {
			$scope.searchBlood = '';
			$scope.searchCity = '';
			$scope.searchB = '_';
			$scope.searchC = '_';
		}
		$scope.search = function() {
			$scope.searchB = $scope.searchBlood;
			$scope.searchC = $scope.searchCity;
		}
		Cities.query(function(cities){
			$scope.cities = cities;
		});
		Donors.query(function(donors) {
			$scope.donors = donors;
		});
	}]);

app.controller('EmailCtrl', ['$scope', '$resource', '$http', '$location',  '$routeParams', 'ngToast', 
    function($scope, $resource, $http, $location, $routeParams, ngToast){
        
    	var Donors = $resource('/api/blooddonors/:id', { id: '@_id' }); //important line for profiling
        Donors.get({ id: $routeParams.id }, function(donor){
            $scope.donor = donor;
        });

        //$scope.toname = donor.Email;	

        $scope.send = function() {
            
        $http.get("/api/mails", {params: {fromname: $scope.fromname,
            fromemail: $scope.fromemail,
            msg: $scope.msg,
            subject: $scope.msg,
            toname: $scope.donor.Full_Name,
            toemail: $scope.donor.Email }}).then(success, error);
        
        function success(data){
                console.log(data);
                ngToast.create("<center>Email has been sent!</center>");  
                $location.path('/bloodbank/home');              
            };
        function error(err){
            console.log(err);
            ngToast.warning("Email has been failed!");
        };

    };
                   
    }]);

app.controller('DDetailsCtrl', ['$scope', '$resource', '$location', '$routeParams', 
    function($scope, $resource, $location, $routeParams){
        var Donors = $resource('/api/blooddonors/:id', { id: '@_id' }); //important line for profiling

        Donors.get({ id: $routeParams.id }, function(donor){
            $scope.donor = donor;
        });
    }]);

app.controller('BBHomeCtrl', ['$scope', '$resource', 
	function($scope, $resource) {
		var countDonors = null;
		var countRequests = null;

		var Donors = $resource('/api/blooddonors');
		var Requests = $resource('/api/bloodrequests');
		Donors.query(function(donors) {
			$scope.donors = donors;
			$scope.countDonors = donors.length;
		});
		Requests.query(function(requests) {
			$scope.requests = requests;
			$scope.countRequests = requests.length;
		});
	}]);
