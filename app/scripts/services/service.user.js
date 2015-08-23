angular.module('wesufe.services')

.factory('UserService', function(LocalStorageService, $resource) {
    var token = LocalStorageService.getToken();
    var openid = LocalStorageService.getOpenId();
    return {
        Info: $resource('http://service.wesufe.cn:8080/api/userinfo', {
            'access_token': token,
            'openid': openid
        }),
        Register: $resource('http://service.wesufe.cn:8080/user')
    };
});
