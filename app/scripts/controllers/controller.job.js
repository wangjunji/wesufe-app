angular.module('wesufe.controllers')
    .controller('JobHomeCtrl', function($scope, JobService, $ionicModal) {
        $ionicModal.fromTemplateUrl('industry-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.industryModal = modal;
        });
        $ionicModal.fromTemplateUrl('location-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.locationModal = modal;
        });
        $ionicModal.fromTemplateUrl('salary-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.salaryModal = modal;
        });
        $scope.openIndustryModal = function() {
            $scope.industryModal.show();
        };
        $scope.openLocationModal = function() {
            $scope.locationModal.show();
        };
        $scope.openSalaryModal = function() {
            $scope.salaryModal.show();
        };
        $scope.filterText = {
            industry: '行业类别',
            location: '地区',
            salary: '日薪(元)'
        };
        $scope.filterSelected = {};
        $scope.filterData = {};
        //实习数据
        JobService.Job.query(function(data) {
            $scope.jobs = data;
        });

        //行业数据
        JobService.Industry.query(function(data) {
            $scope.industries = _.chunk(data, 4);
        });
        $scope.selectIndustry = function(industry) {
            $scope.filterText.industry = industry.name;
            $scope.filterData.industryId = industry.name === '全部' ? undefined : industry._id;
            $scope.filterSelected.industry = true;
            filterJob();
            $scope.industryModal.hide();
        };
        //地区数据
        JobService.Location.query(function(data) {
            $scope.locations = data;
        });
        $scope.selectLocation = function(location) {
            $scope.filterText.location = location.name;
            $scope.filterData.locationId = location.name === '全部' ? undefined : location._id;
            $scope.filterSelected.location = true;
            filterJob();
            $scope.locationModal.hide();
        };
        //薪水数据
        $scope.salaries = [{
            name: '全部'
        }, {
            name: '100元以下',
            salary_lt: 100
        }, {
            name: '100-200元',
            salary_lt: 200,
            salary_gt: 100
        }, {
            name: '200元以上',
            salary_gt: 200
        }];
        $scope.selectSalary = function(salary) {
            $scope.filterText.salary = salary.name;
            $scope.filterData.salary_gt = salary.salary_gt;
            $scope.filterData.salary_lt = salary.salary_lt;
            $scope.filterSelected.salary = true;
            filterJob();
            $scope.salaryModal.hide();
        };
        var filterJob = function() {
            JobService.Job.query($scope.filterData,function(data){
                $scope.jobs=data;
            });
        };
    })
    .controller('JobDetailCtrl', function($scope, $stateParams,JobService) {
        JobService.Job.get({id:$stateParams.id},function(data){
            $scope.job=data;
            $scope.job.due=moment(data.deadline).diff(moment(),'days');
        });
    })
    .controller('JobCreateCtrl', function($scope, JobService, LocalStorageService, $state) {
        $scope.formData = {};
        $scope.expandText = function() {
            var element = document.getElementById('job_desc_textarea');
            element.style.height = element.scrollHeight + 'px';
        };
        JobService.Industry.query(function(data) {
            $scope.industries = _.reject(data, {
                name: '全部'
            });
        });
        JobService.Location.query(function(data) {
            $scope.locations = data;
        });
        $scope.submitJob = function() {
            var userId = LocalStorageService.getUserId();
            var postData = _.extend({}, $scope.formData, {
                createById: userId
            });
            JobService.Job.save(postData, function() {
                $state.go('home.job');
            });
        };
    });
