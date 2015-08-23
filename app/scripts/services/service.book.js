angular.module('wesufe.services')

.factory('BookService', function(LocalStorageService, $resource,ENV) {
    var token = LocalStorageService.getToken();
    return {
        Douban: $resource(ENV.doubanApiUrl+'/v2/book/search', {
            apikey: '0e62e49f1e20f5de2b28addd5a62e19a'
        }),
        Sufe: $resource('http://service.wesufe.cn:8080/api/library/:id', {
            'access_token': token
        })
    };
});
