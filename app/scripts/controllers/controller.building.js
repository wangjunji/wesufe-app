angular.module('wesufe.controllers')
    .controller('BuildingSelectCtrl', function($scope,$state,BuildingService) {
        $scope.formData={};
        $scope.searchRoom=function(){
            var postData=_.clone($scope.formData);
            if(!postData.date){
                postData.date=moment();
            }
            if(!postData.start_time){
                postData.start_time=moment();
            }
            if(!postData.end_time){
                postData.end_time='22:00';   
            }
            else{
                postData.end_time=moment(postData.end_time).format('HH:mm');
            }
            postData.date=moment(postData.date).format('YYYY-MM-DD');
            postData.start_time=moment(postData.start_time).format('HH:mm');
            BuildingService.query(postData,function(data){
                $state.go('home.building-result',{result:data,date:postData.date,start_time:postData.start_time,end_time:postData.end_time});
            });
        };
    })
    .controller('BuildingResultCtrl', function($scope,$stateParams) {
        $scope.rooms=$stateParams.result;
        $scope.date=$stateParams.date.split('-')[1]+'月'+$stateParams.date.split('-')[2]+'日';
        $scope.startTime=$stateParams.start_time;
        $scope.endTime=$stateParams.end_time;
    });