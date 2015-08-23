angular.module('wesufe.services')

.factory('JobService', function($resource) {
    return {
    	Industry:$resource('http://service.wesufe.cn:8080/jobindustry'),
    	Location:$resource('http://service.wesufe.cn:8080/joblocation'),
    	Job:$resource('http://service.wesufe.cn:8080/job/:id')
    };
});
