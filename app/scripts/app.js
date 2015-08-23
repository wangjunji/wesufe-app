// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('wesufe', ['ionic', 'ngResource', 'config', 'wesufe.controllers', 'wesufe.services', 'wesufe.directives', 'wesufe.filters', 'chart.js', 'ui.calendar', 'ngRadialGauge'])

.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })
    .config(function($ionicConfigProvider) {
        $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-left').previousTitleText(false);
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.tabs.style('standard');
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.views.maxCache(0);
    })
    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            // setup an abstract state for the tabs directive
            .state('tabs', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html',
                controller: 'TabCtrl as tab'
            })

        // Each tab has its own nav history stack:
        //主菜单
        .state('home', {
                url: '/home',
                parent: 'tabs',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/tab-home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
            //课表
            .state('home.timetable', {
                url: '/timetable',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/timetable.html',
                        controller: 'TimetableCtrl'
                    }
                }
            })
            //GPA－当前学期
            .state('home.gpa-current', {
                url: '/gpa/current',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/gpa-current.html',
                        controller: 'GpaCurrentCtrl',
                        resolve: {
                            gpaPromise: function(GpaService) {
                                return GpaService.get({
                                    type: 'current'
                                }).$promise;
                            }
                        }
                    }
                }
            })
            //GPA － 汇总
            .state('home.gpa-summary', {
                url: '/gpa/summary',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/gpa-summary.html',
                        controller: 'GpaSummaryCtrl',
                        resolve: {
                            gpaDetailPromise: function(GpaService) {
                                return GpaService.get({
                                    type: 'all'
                                }).$promise;
                            },
                            gpaSummaryPromise: function(GpaService) {
                                return GpaService.get({
                                    type: 'summary'
                                }).$promise;
                            }
                        }
                    }
                }
            })
            //GPA － 明细
            .state('home.gpa-detail', {
                url: '/gpa/detail',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/gpa-detail.html',
                        controller: 'GpaDetailCtrl',
                        resolve: {
                            gpaDetailPromise: function(GpaService) {
                                return GpaService.get({
                                    type: 'all'
                                }).$promise;
                            }
                        }
                    }
                }
            })
            //考试安排
            .state('home.exam', {
                url: '/exam',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/exam.html',
                        controller: 'ExamCtrl',
                        resolve: {
                            examPromise: function(ExamService) {
                                return ExamService.get().$promise;
                            }
                        }
                    }
                }
            })
            //图书馆 - 搜索
            .state('home.library-search', {
                url: '/library/search',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/library-search.html',
                        controller: 'LibrarySearchCtrl'
                    }
                }
            })
            //图书馆 － 搜索结果
            .state('home.library-search-result', {
                url: '/library/search/result',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/library-search-result.html',
                        controller: 'LibrarySearchResultCtrl',
                    }
                },
                params: {
                    'keyword': null
                }
            })
            //图书馆 － 详情页
            .state('home.library-detail', {
                url: '/library/:id',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/library-detail.html',
                        controller: 'LibraryDetailCtrl',
                        resolve: {
                            bookPromise: function($stateParams, BookService) {
                                return BookService.Sufe.get({
                                    id: $stateParams.id
                                }).$promise;
                            }
                        }
                    }
                }
            })
            //活动 － 首页
            .state('home.activity', {
                url: '/activity',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/activity-home.html',
                        controller: 'ActivityHomeCtrl',
                    }
                }
            })
            //活动 － 创建
            .state('home.activity-create', {
                url: '/activity/create',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/activity-create.html',
                        controller: 'ActivityCreateCtrl'
                    }
                }
            })
            //活动 － 详情
            .state('home.activity-detail', {
                url: '/activity/:id',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/activity-detail.html',
                        controller: 'ActivityDetailCtrl'
                    }
                }
            })
            .state('home.lecture-home', {
                url: '/lecture',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/lecture-home.html',
                        controller: 'LectureHomeCtrl'
                    }
                }
            })
            //空闲教室 － 选择条件
            .state('home.building-select', {
                url: '/building/select',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/building-select.html',
                        controller: 'BuildingSelectCtrl'
                    }
                }
            })
            //空闲教室 － 搜索结果
            .state('home.building-result', {
                url: '/building/result',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/building-result.html',
                        controller: 'BuildingResultCtrl'
                    }
                },
                params: {
                    'date': null,
                    'start_time': null,
                    'end_time': null,
                    'result': null
                }
            })
            //新闻 － 列表页
            .state('home.news-list', {
                url: '/news',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/news-list.html',
                        controller: 'NewsListCtrl'
                    }
                }
            })
            //新闻 － 详情页
            .state('home.news-detail', {
                url: '/news/:id',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/news-detail.html',
                        controller: 'NewsDetailCtrl'
                    }
                }
            })
            //实习 － 主页
            .state('home.job', {
                url: '/job',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/job-home.html',
                        controller: 'JobHomeCtrl'
                    }
                }
            })
            //实习 － 创建
            .state('home.job-create', {
                url: '/job/create',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/job-create.html',
                        controller: 'JobCreateCtrl'
                    }
                }
            })
            //实习 － 详情
            .state('home.job-detail', {
                url: '/job/:id',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/job-detail.html',
                        controller: 'JobDetailCtrl'
                    }
                }
            })
            //实习 － 详情
            .state('home.canlendar', {
                url: '/calendar',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/calendar.html',
                        controller: 'CalendarCtrl'
                    }
                }
            })
            //电费 － 选择寝室
            .state('home.electric-select-dorm', {
                url: '/electric/selectDorm',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/electric-select-dorm.html',
                        controller: 'ElectricSelectDormCtrl'
                    }
                }
            })
            //电费 － 结果
            .state('home.electric-result', {
                url: '/electric/result',
                views: {
                    'tab-home@tabs': {
                        templateUrl: 'templates/electric-result.html',
                        controller: 'ElectricResultCtrl'
                    }
                },
                params: {
                    'room': null
                }
            })
            //通讯录-主页
            .state('chats', {
                url: '/chats',
                parent: 'tabs',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('chats.addfriend', {
                url: '/addfriend',
                views: {
                    'tab-chats@tabs': {
                        templateUrl: 'templates/chats-addfriend.html',
                        controller: 'ChatAddFriendCtrl'
                    }
                }
            })
            .state('chats.detail', {
                url: '/:chatId',
                views: {
                    'tab-chats@tabs': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

        .state('account', {
            url: '/account',
            parent: 'tabs',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tab-account.html',
                    controller: 'AccountCtrl'
                }
            }
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });
angular.module('wesufe.controllers', ['ui.knob']);
angular.module('wesufe.services', []);
angular.module('wesufe.directives', []);
angular.module('wesufe.filters', []);
