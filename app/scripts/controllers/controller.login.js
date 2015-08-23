angular.module('wesufe.controllers')
    .controller('LoginCtrl', function($scope, LoginService,LocalStorageService,$state) {
        var expire = LocalStorageService.getExpire();
        if (moment().isBefore(expire)) {
            $state.go('home');
        }
        $scope.login = function() {
            LoginService.login();
        };
    });
