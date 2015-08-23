angular.module('wesufe.services')

.factory('LocalStorageService', function($window) {
    return {
        getToken: function() {
            return $window.localStorage.getItem('access_token');
        },
        setToken:function(token){
            return $window.localStorage.setItem('access_token',token);
        },
        getOpenId:function(){
            return $window.localStorage.getItem('openid');
        },
        getExpire: function() {
            return $window.localStorage.getItem('expire');
        },
        getUserId:function(){
            return $window.localStorage.getItem('id');
        }
    };
});
