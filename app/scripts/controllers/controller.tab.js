'use strict';
angular.module('wesufe.controllers')
    .controller('TabCtrl', function($state) {
        this.onTabSelected = function(_scope) {
            if (_scope.title === '主页') {
                setTimeout(function() {
                    $state.go('home');
                }, 0);
            }
        };
    });
