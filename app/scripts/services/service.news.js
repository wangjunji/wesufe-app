angular.module('wesufe.services')

.factory('NewsService', function($resource) {
    return $resource('http://service.wesufe.cn:8080/api/news/:id');
});
