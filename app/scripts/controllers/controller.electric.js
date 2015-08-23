angular.module('wesufe.controllers')
    .controller('ElectricSelectDormCtrl', function($scope, $timeout, $state, ElectricService) {
        $scope.$on('$ionicView.beforeEnter', function() {
            $scope.dorms = [];
            $scope.level = 1;
            $scope.cache = [];
            $scope.roomPath = [];
            $scope.room='';
            ElectricService.Dorm.query(function(data) {
                $scope.dorms = data;
                $scope.cache.push($scope.dorms);
            });
        });
        $scope.searchDorm = function(dorm) {
            $scope.roomPath.push(dorm.text);
            if (!dorm.leaf) {
                $timeout(function() {
                    ElectricService.Dorm.query({
                        id: dorm.id
                    }, function(data) {
                        $scope.dorms = data;
                        $scope.cache.push($scope.dorms);
                        $scope.level++;
                    });
                }, 500);
            } else {
            	$scope.room=$scope.roomPath[$scope.roomPath.length-3]+' '+$scope.roomPath[$scope.roomPath.length-1];
                $state.go('home.electric-result',{room:$scope.room});
            }
        };
        $scope.goBack = function() {
            $scope.cache.splice(-1, 1);
            $scope.roomPath.pop();
            $scope.dorms = $scope.cache[$scope.cache.length - 1];
            $scope.level--;
        };
    })
    .controller('ElectricResultCtrl', function($scope, $stateParams,$interval) {
    	$scope.room=$stateParams.room;
        $scope.value = 0;
        $scope.gaugeNumber = 95.6;
        $scope.upperLimit = 200;
        $scope.lowerLimit = 0;
        $scope.unit = 'kW';
        $scope.precision = 2;
        $scope.delay = 3000;
        $scope.ranges = [{
            min: 0,
            max: 20,
            color: '#C50200'
        }, {
            min: 20,
            max: 50,
            color: '#FF7700'
        }, {
            min: 50,
            max: 100,
            color: '#FDC702'
        }, {
            min: 100,
            max: 200,
            color: '#8DCA2F'
        }];

        var timer;
        $scope.update = function() {
            timer = $interval(function() {
                $scope.value = $scope.value + 0.2;
                if ($scope.value.toFixed(1) == $scope.gaugeNumber) {
                    $scope.stopUpdate();
                }
            }, 1);
        };
        $scope.stopUpdate = function() {
            $interval.cancel(timer);
        };
        $scope.update();
        $scope.$on('$destroy', function() {
            $scope.stopUpdate();
        });
    });
