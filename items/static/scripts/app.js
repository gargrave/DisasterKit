(function () {
  'use strict';

  angular.module('dk', [])
      .config(['$interpolateProvider', '$httpProvider',
        function ($interpolateProvider, $httpProvider) {

          /* set up custom interpolation handlebars,
           * so that NG can work together with Jinja templates */
          $interpolateProvider.startSymbol('{A');
          $interpolateProvider.endSymbol('A}');

          // get a CSRF token to make Django happy!
          $httpProvider.defaults.xsrfCookieName = 'csrftoken';
          $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

          // Use x-www-form-urlencoded Content-Type
          $httpProvider.defaults.headers.post['Content-Type'] =
              'application/x-www-form-urlencoded;charset=utf-8';

          /**
           * The workhorse; converts an object to x-www-form-urlencoded serialization.
           * @param {Object} obj
           * @return {String}
           */
          var param = function (obj) {
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
          $httpProvider.defaults.transformRequest = [function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ?
                param(data) :
                data;
          }];
        }]);
})();
