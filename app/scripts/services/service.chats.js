'use strict';
angular.module('wesufe.services')

.factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: '王君吉',
        sex: 'boy',
        major: '11级 信息管理与信息系统',
        className:'11信息2班',
        stuNo:'2011114003',
        face: 'images/avatar001.png',
        group:'我的好友'
    }, {
        id: 1,
        name: '柯鸿鹏',
        sex: 'boy',
        major: '11级 信息管理与信息系统',
        className:'11信息2班',
        stuNo:'2011114077',
        face: 'images/avatar002.jpg',
        group:'我的好友'
    }, {
        id: 2,
        name: '李妍',
        sex: 'girl',
        major: '14级 银行与国际金融',
        className:'14国金2班',
        stuNo:'2014113094',
        face: 'images/avatar003.jpg',
        group:'Wesufe'
    }, {
        id: 3,
        name: '傅艺甜',
        sex: 'girl',
        major: '12级 市场营销',
        className:'12市场营销1班',
        stuNo:'2012117034',
        face: 'images/avatar004.png',
        group:'Wesufe'
    }, {
        id: 4,
        name: '王西之',
        sex: 'boy',
        major: '12级 信息管理与信息系统',
        className:'12信息2班',
        stuNo:'2012114025',
        face: 'images/avatar005.png',
        group:'Wesufe'
    }];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});
