'use strict';
angular.module('wesufe.services')

.factory('LoginService', function($window, $state, UserService) {
    var url = 'http://weixin.sufe.edu.cn/oauthv2/authorize?client_id=7349ai8ls&response_type=code&redirect_uri=http://weixin.wesufe.cn/authorize';
    var loginWindow;
    var token;
    var openid;
    return {
        login: function() {
            var deviceInfo = _.pick(ionic.Platform.device(), 'platform', 'version', 'uuid');
            loginWindow = $window.open(url, '_blank', 'location=no,toolbar=no');
            loginWindow.addEventListener('loadstart', function(event) {
                if (event.url.indexOf('access_token') !== -1) {
                    token = event.url.split('access_token=')[1].substring(0, 36);
                    openid = event.url.split('openid=')[1].substring(0, 10);
                    if (token && openid) {
                        var expire = moment().add(30, 'd');
                        $window.localStorage.setItem('access_token', token);
                        $window.localStorage.setItem('openid', openid);
                        $window.localStorage.setItem('expire', expire.format());
                        UserService.Info.get({
                            access_token: token,
                            openid: openid
                        }, function(data) {
                            var stuInfo=_.omit(data, 'englishGrade');
                            var userInfo=_.merge({},stuInfo,{equipment:[deviceInfo]});
                            UserService.Register.save(userInfo,function(data){
                                $window.localStorage.setItem('id',data._id);
                            });
                        });
                        loginWindow.close();
                        $state.go('home');
                    }
                }
            });
        }
    };
});
