(function() {
  'use strict';
  angular.module('dk').controller('MainController', [

      function() {
        var vm = this;
        vm.asdf = 'fart';

        vm.class = {
          SIXCOLS: 'six columns offset-by-three'
        };
      }
    ]
  );
})();

