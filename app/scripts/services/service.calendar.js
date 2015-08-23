angular.module('wesufe.services')

.factory('CalendarService', function($resource) {
    return $resource('http://service.wesufe.cn:8080/calendar');
});
