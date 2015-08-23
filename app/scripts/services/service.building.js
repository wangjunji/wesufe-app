angular.module('wesufe.services')

.factory('BuildingService', function($resource, LocalStorageService) {
    var token = LocalStorageService.getToken();
    var openid = LocalStorageService.getOpenId();
    return $resource('http://service.wesufe.cn:8080/api/freeroom', {
        'access_token': token,
        'openid': openid
    });
});
