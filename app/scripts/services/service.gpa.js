angular.module('wesufe.services')

.factory('GpaService', function(LocalStorageService, $resource) {
    var token = LocalStorageService.getToken();
    var openid = LocalStorageService.getOpenId();
    return $resource('http://service.wesufe.cn:8080/api/gpa/:type',{'access_token':token,'openid':openid});
});
