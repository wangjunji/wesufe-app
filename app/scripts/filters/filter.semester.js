angular.module('wesufe.filters')
    .filter('SemesterFilter', function() {
        return function(semester) {
            var term = semester.split('-')[2];
            var result = semester.substring(0, 9)+(term === '1' ? '学年第一学期' : term === '2' ? '学年第二学期' : '学年小学期');
            return result;
        };
    });
