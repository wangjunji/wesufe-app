angular.module('wesufe.services')

.factory('ActivityService', function($resource) {
    return $resource('http://service.wesufe.cn:8080/activity');
});
