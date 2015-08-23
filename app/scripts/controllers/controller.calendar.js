angular.module('wesufe.controllers')
    .controller('CalendarCtrl', function($scope, $compile, $location, $ionicScrollDelegate, CalendarService) {
        $scope.uiConfig = {
            calendar: {
                lang: 'zh-cn',
                height: 450,
                theme: false,
                dayNamesShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
                buttonIcons: {
                    prev: 'left',
                    next: 'right'
                },
                header: {
                    left: 'prev',
                    center: 'title',
                    right: 'next'
                },
                eventRender: function(event, element) {
                    var start = moment(event.start).date();
                    var end = moment(event.end).subtract(1, 'days').date();
                    element.find('.fc-title').text(start);
                    element.find('.fc-time').hide();
                    element.attr('ng-click', 'scrollTo("' + event.id + '")');
                    $compile(element)($scope);
                    if(!element.hasClass('oneday')){
                    	var margin=Math.floor(($(window).width()/7-32)/2);
                    	element.css({
                    		'margin-left':margin+'px',
                    		'margin-right':margin+'px'
                    	});
                    }
                    if (element.has('fc-start') && element.hasClass('fc-not-end')) {
                        element.find('.fc-title').text(start);
                    }
                    if (element.hasClass('fc-not-start') && element.hasClass('fc-end')) {
                        element.find('.fc-title').text(end);
                    }
                    if (element.hasClass('fc-start') && element.hasClass('fc-end') && !element.hasClass('oneday')) {
                        var circle1 = element.find('.fc-title');
                        var circle2 = element.find('.fc-title').clone();
                        circle1.text(start).css('float', 'left');
                        circle2.text(end).css('float', 'right');
                        circle1.after(circle2);
                    }
                },
                dayRender:function(date){
                	if(date.isSame(moment(),'day')){
                		$('.fc-day-number.fc-today').wrapInner('<div class="fc-today-circle"></div>');
                	}
                }
            }
        };
        $scope.scrollTo = function(id) {
            $location.hash(id);
            $ionicScrollDelegate.anchorScroll(true);
            $scope.activeEvent=id;
        };
        $scope.isActive=function(id){
        	return $scope.activeEvent===id;
        };
        $scope.events = [];
        $scope.eventSources = [$scope.events];
        CalendarService.get({
            semester: '2015-2016-1'
        }, function(data) {
            $scope.allEvents = data.events;
            $scope.events.splice(0, $scope.events.length);
            var events = _.filter(data.events, {
                isShown: true
            });
            _.each(events, function(event) {
                var newEvent = {
                    id: event._id,
                    title: event.title,
                    start: moment(event.start),
                    className: [event.className],
                    description: event.description,
                    stick: true
                };
                if (event.end && event.end !== event.start) {
                    newEvent.end = moment(event.end).add(1, 'days');
                } else {
                    newEvent.className.push('oneday');
                }
                $scope.events.push(newEvent);
            });
        });
    });
