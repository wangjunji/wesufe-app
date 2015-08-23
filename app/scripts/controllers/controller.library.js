angular.module('wesufe.controllers')
    .controller('LibrarySearchCtrl', function($scope, BookService, $state) {
        $scope.books = {};
        $scope.searchData = {
            keyword: ''
        };
        $scope.clearSearch = function() {
            $scope.searchData.keyword = '';
            $scope.books = {};
        };
        var delay = (function() {
            var timer = 0;
            return function(callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();
        $scope.onKeyup = function(keyword) {
            delay(function() {
                if (keyword) {
                    BookService.Douban.get({
                        q: keyword
                    }, function(data) {
                        $scope.books = data.books;
                    });
                } else {
                    $scope.books = {};
                    $scope.$apply();
                }
            }, 1000);
        };
        $scope.searchBook = function(keyword) {
            if (keyword) {
                $scope.books = {};
                $scope.searchData.keyword = '';
                $state.go('home.library-search-result', {
                    keyword: keyword
                });
            }
        };
    })
    .controller('LibrarySearchResultCtrl', function($scope, $stateParams, BookService) {
        $scope.books = {};
        $scope.totalPage = 1;
        $scope.page = 1;
        var keyword = $stateParams.keyword;
        BookService.Sufe.get({
            keyword: keyword,
            page: $scope.page
        }, function(data) {
            $scope.books = data.bookList;
            $scope.totalPage = data.pagination.offset;
        });
        $scope.loadMore = function() {
            $scope.page++;
            BookService.Sufe.get({
                keyword: keyword,
                page: $scope.page
            }, function(data) {
                $scope.books=$scope.books.concat(data.bookList);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };
        $scope.moreDataCanBeLoaded = function() {
            return $scope.totalPage > $scope.page;
        };
    })
    .controller('LibraryDetailCtrl', function($scope, bookPromise) {
        $scope.book = bookPromise;
    });
