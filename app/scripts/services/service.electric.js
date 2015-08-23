angular.module('wesufe.services')

.factory('ElectricService', function($resource) {
	var rootId='1218910409';
    return {
        Dorm: $resource('http://service.wesufe.cn:8080/dormitory/:id',{id:rootId})
    };
});
