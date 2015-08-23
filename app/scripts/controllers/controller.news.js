angular.module('wesufe.controllers')
    .controller('NewsListCtrl', function($scope, NewsService) {
        $scope.newsList = {};
        $scope.page = 1;
        $scope.moreDataCanBeLoaded = true;
        NewsService.get({
            page: $scope.page
        }, function(data) {
            $scope.newsList = data.newsList;
        });
        $scope.loadMore = function() {
            $scope.page++;
            NewsService.get({
                page: $scope.page
            }, function(data) {
                if (data.newsList.length === 0) {
                    $scope.moreDataCanBeLoaded = false;
                } else {
                    $scope.newsList = $scope.newsList.concat(data.newsList);
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
    })
    .controller('NewsDetailCtrl', function($scope, $stateParams, NewsService) {
        NewsService.get({
            id: $stateParams.id
        }, function(data) {
            $scope.news = data;
        });
    });
