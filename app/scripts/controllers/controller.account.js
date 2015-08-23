angular.module('wesufe.controllers')
    .controller('AccountCtrl', function($scope, $state, $ionicHistory) {
        $scope.goToView = function(viewname) {
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot:true
            });
            $state.go('home.timetable');
        };
    });
