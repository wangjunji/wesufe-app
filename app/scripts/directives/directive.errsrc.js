angular.module('wesufe.directives')
    .directive('errSrc', function() {
        return {
            link: function(scope, element, attrs) {
                attrs.$observe('ngSrc', function(value) {
                    if (!value && attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);
                    }
                });
                element.bind('error', function() {
                    if (attrs.src != attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);
                    }
                });
            }
        };
    });
