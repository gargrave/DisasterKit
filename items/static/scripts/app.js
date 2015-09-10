(function() {
  'use strict';
  angular.module('dk', ['ui.router'])
    .config([
      '$interpolateProvider', '$httpProvider',
      '$stateProvider', '$urlRouterProvider',

      function($interpolateProvider, $httpProvider,
               $stateProvider, $urlRouterProvider) {

        /* set up custom interpolation handlebars,
         * so that NG can work together with Django templates */
        $interpolateProvider.startSymbol('{A');
        $interpolateProvider.endSymbol('A}');

        /*
         * routing set up
         **********************************************/
        $stateProvider
          .state('dk', {
            url: '',
            abstract: true
          })
          // home URL
          .state('dk.home', {
            url: '/',
            views: {
              'home@': {
                controller: 'HomeController as homeCtrl',
                templateUrl: '/static/partials/home.html'
              }
            }
          })
          // a state showing full item list
          .state('dk.item_list', {
            url: '/items/:forceUpdate',
            views: {
              'item_list@': {
                controller: 'ItemListController as itemListCtrl',
                templateUrl: '/static/partials/item-list.html'
              }

            }
          })
          // a state to show details of an individual item
          .state('dk.item_detail', {
            url: '/items/detail/:id',
            views: {
              'item_detail@': {
                controller: 'ItemDetailController as itemDetailCtrl',
                templateUrl: '/static/partials/item-detail.html'
              }
            }
          })
          // a state to create a new item
          .state('dk.item_create', {
            url: '/items/add/',
            views: {
              'item_create@': {
                controller: 'ItemCreateController as itemCreateCtrl',
                templateUrl: '/static/partials/item-create.html'
              }
            }
          })
          // a state to show details of an individual item
          .state('dk.item_update', {
            url: '/items/update/:id',
            views: {
              'item_update@': {
                controller: 'ItemUpdateController as itemUpdateCtrl',
                templateUrl: '/static/partials/item-update.html'
              }
            }
          }
        );
        $urlRouterProvider.otherwise('/');

        /*
         * boiler-plate for getting NG to work properly with
         * Django's security requirements
         ***********************************************************/

        // get a CSRF token to make Django happy!
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] =
          'application/x-www-form-urlencoded;charset=utf-8';

        // The workhorse; converts an object to x-www-form-urlencoded serialization.
        var param = function(obj) {
          var query = '';
          var name;
          var value;
          var fullSubName;
          var subName;
          var subValue;
          var innerObj;
          var i;

          for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
              for (i = 0; i < value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
              }
            } else if (value instanceof Object) {
              for (subName in value) {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
              }
            } else if (value !== undefined && value !== null) {
              query += encodeURIComponent(name) + '=' +
                encodeURIComponent(value) + '&';
            }
          }

          return query.length ?
            query.substr(0, query.length - 1) :
            query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
          return angular.isObject(data) && String(data) !== '[object File]' ?
            param(data) :
            data;
        }];
      }
    ]);
})();

