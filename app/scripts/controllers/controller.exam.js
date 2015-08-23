angular.module('wesufe.controllers')
    .controller('ExamCtrl', function($scope, examPromise) {
        $scope.exams = _.sortBy(_.map(examPromise.arrangement, function(obj) {
            return _.extend(obj, {
                day: obj.examdate.split('-')[2],
                date: obj.examdate.substring(5, 10),
                finished:moment(obj.examdate+' '+obj.examtime.split('-')[1]).diff(moment())<0?true:false
            });
        }), 'examdate');
        $scope.finishedExamNum=_.reduce($scope.exams,function(sum,n){
        	var diff=moment(n.examdate+' '+n.examtime.split('-')[1]).diff(moment());
        	if(diff<0){
        		sum++;
        	}
        	return sum;
        },0);
        $scope.pendingExamNum=_.reduce($scope.exams,function(sum,n){
        	var diff=moment(n.examdate+' '+n.examtime.split('-')[1]).diff(moment());
        	if(diff>0){
        		sum++;
        	}
        	return sum;
        },0);
        $scope.latestExamDiff=_.min(_.reduce($scope.exams,function(sum,n){
        	var diff=moment(n.examdate+' '+n.examtime.split('-')[1]).diff(moment(),'day');
        	if(diff>0){
        		sum.push(diff);
        	}
        	return sum;
        },[]));
        $scope.warningShown=$scope.pendingExamNum?true:false;
    });
