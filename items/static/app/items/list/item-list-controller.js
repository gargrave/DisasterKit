(function() {
  'use strict';
  angular.module('dk').controller('ItemListCtrl', [
    '$stateParams', 'itemListSvc',

    function($stateParams, itemListSvc) {
      // pre-calcuate the number of milliseconds in a dsy
      var MS_IN_DAY = 1000 * 60 * 60 * 24;
      var vm = this;
      // check the state params if we need to force a list update
      // (i.e. has an items been updated/added/deleted/etc.?)
      var forceListUpdate = $stateParams.forceUpdate || false;
      // a rounded version of today's date in 'YYYY-MM-DD' format
      var nowRounded;
      vm.loading = true;
      vm.items = null;

      /**
       * Parses the item's expiration date against today's date and
       * returns a flat "number of days until expiration" value.
       *
       * @param {Object} item - The item to test against.
       * @returns {Number} - The number of days until the item expires.
       */
      function getDaysUntilExpiration(item) {
        if (!nowRounded) {
          var now = new Date(Date.now());
          nowRounded = Date.parse(
            now.getFullYear() + '-' +
            (now.getMonth() + 1) + '-' +
            now.getDate()
          );
        }
        return Math.floor((Date.parse(item.exp) - nowRounded) / MS_IN_DAY) + 1;
      }

      /*
       Initializes the controller.
       */
      (function() {
        // load the list of current items
        itemListSvc.getItemList(forceListUpdate).then(function(res) {
          vm.items = res;

          // update each of the items' info
          for (var i in vm.items) {
            var item = vm.items[i];
            // store an int value of its expiration based on how
            // many days FROM TODAY it expires
            item.timeLeft = getDaysUntilExpiration(item);

            // set the item's parent TR's class
            if (item.timeLeft < 14) {
              item.trClass = 'danger';
            } else if (item.timeLeft < 31) {
              item.trClass = 'warning';
            } else {
              item.trClass = 'success';
            }
          }
          vm.loading = false;
        });
      })();
    }]);
})();

