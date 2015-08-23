angular.module('wesufe.controllers')
    .controller('GpaCurrentCtrl', function($scope, $state, gpaPromise) {
        var gpaArr = gpaPromise.gpa;
        $scope.semester = gpaArr[0].semester;
        var credit = _.reduce(gpaArr, function(sum, n) {
            return sum += parseInt(n.credit);
        }, 0);
        var gpa = _.reduce(gpaArr, function(sum, n) {
            return sum += parseFloat(n.gpa) * parseInt(n.credit);
        }, 0) / credit;
        var score = _.reduce(gpaArr, function(sum, n) {
            return sum += parseFloat(n.score);
        }, 0) / gpaArr.length;
        $scope.knobData = {
            gpa: gpa.toFixed(2),
            score: score.toFixed(2),
            credit: credit
        };
        $scope.records = gpaArr;
        var opt = {
            width: 60,
            height: 60,
            thickness: 0.15,
            readOnly: true,
            fgColor: '#11c1f3',
            font: 'Helvetica Neue UltraLight 72'
        };
        $scope.knobOptions = {
            gpa: _.extend(_.clone(opt), {
                max: 4,
                min: 1,
                step: 0.01
            }),
            score: _.extend(_.clone(opt), {
                max: 100,
                min: 0,
                step: 0.01
            }),
            credit: _.extend(_.clone(opt), {
                max: 30,
                min: 0,
                step: 1
            })
        };
        $scope.showGpaSummary = function() {
            $state.go('home.gpa-summary');
        };
    })
    .controller('GpaSummaryCtrl', function($scope, $state,gpaDetailPromise, gpaSummaryPromise) {
        $scope.gpaSummarys = gpaSummaryPromise.detail;
        var data = _.map(gpaSummaryPromise.detail, function(obj) {
            return obj.gpa;
        });
        var minGpa = parseFloat(d3.format('.01f')(_.min(data)));
        var stepWidth = minGpa < 2 ? 0.4 : 0.2;
        var steps = Math.floor((4 - minGpa) / stepWidth) + 1;
        $scope.chartOptions = {
            showTooltips: false,
            responsive: true,
            scaleOverride: true,
            scaleSteps: steps,
            scaleStepWidth: stepWidth,
            scaleStartValue: 4 - stepWidth * steps,
        };
        var chartLabels = _.map(gpaSummaryPromise.detail, function(obj) {
            if (obj.term === '1') {
                return obj.year.split('-')[0];
            } else {
                return '';
            }
        });
        $scope.chartLabels = chartLabels;
        $scope.chartData = [data];
        $scope.showGpaDetail = function() {
            $state.go('home.gpa-detail');
        };
    })
    .controller('GpaDetailCtrl', function($scope, gpaDetailPromise) {
        $scope.gpaDetail = _.groupBy(gpaDetailPromise.gpa, 'semester');
    });
