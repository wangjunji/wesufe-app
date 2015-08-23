angular.module('wesufe.controllers')
    .controller('ActivityHomeCtrl', function($scope) {
        $scope.tabIndex = 1;
        $scope.selectTab = function(index) {
            $scope.tabIndex = index;
        };
    })
    .controller('ActivityCreateCtrl', function($scope, $ionicPopup, ActivityService) {
        $scope.formData = {};
        $scope.activityTags = [{
            name: '公益',
            selected: false
        }, {
            name: '创新',
            selected: false
        }, {
            name: '文艺',
            selected: false
        }, {
            name: '摄影',
            selected: false
        }, {
            name: '艺术',
            selected: false
        }, {
            name: '社团',
            selected: false
        }, {
            name: '校级',
            selected: false
        }, {
            name: '院系',
            selected: false
        }, {
            name: '招新',
            selected: false
        }, {
            name: '比赛',
            selected: false
        }, {
            name: '游戏',
            selected: false
        }];
        $scope.selectTag = function(event, tag) {
            var count = _.reduce($scope.activityTags, function(sum, n) {
                if (n.selected) {
                    sum++;
                }
                return sum;
            }, 0);
            if (count === 3 && !tag.selected) {
                event.preventDefault();
            } else {
                tag.selected = !tag.selected;
            }
        };
        $scope.showTagPopup = function() {
            var tagPopup = $ionicPopup.show({
                templateUrl: 'tag-popup.html',
                cssClass: 'tag-popup',
                title: '请选择活动标签',
                scope: $scope,
                buttons: [{
                    text: '取消',
                    type: 'button-cancel'
                }, {
                    text: '<b>确定</b>',
                    type: 'button-confirm',
                    onTap: function(e) {
                        $scope.formData.tag = _.pluck(_.filter($scope.activityTags, {
                            selected: true
                        }), 'name');
                    }
                }]
            });
        };
        $scope.submitActivity = function() {
            var date = $scope.formData.date;
            var time = $scope.formData.time;
            $scope.formData.date = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                time.getHours(), time.getMinutes(), time.getSeconds());
            console.log(_.omit($scope.formData, 'time'));
            ActivityService.save({}, _.omit($scope.formData, 'time'), function(res) {
                console.log('success');
            });
        };
    })
    .controller('ActivityDetailCtrl', function($scope, $ionicActionSheet) {
            $scope.share = function() {
                $ionicActionSheet.show({
                        buttons: [{
                            text: '<b>分享至微信朋友圈</b>'
                        }, {
                            text: '分享给微信好友'
                        }],
                        titleText: '分享',
                        cancelText: '取消',
                        cancel: function() {
                            // 取消时执行
                        }
                    });
                };
            });
