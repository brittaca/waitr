/**
 * Created by danle on 2/29/16.
 */
(function () {
  angular
    .module('waitrApp')
    .controller('custWaitListConfirmCtrl', ['$stateParams','$timeout', '$scope', 'waitlistService', 'restaurantService', '$state', 'userService',custWaitListConfirmCtrl]);

  function custWaitListConfirmCtrl ($stateParams, $timeout, $scope, waitlistService, restaurantService, $state, userService) {
    var cwlc = this;

    var currRest = $stateParams.restaurantId;

    $timeout(function() {
      cwlc.currentUser = $scope.ac.currentUser;
      console.log('custWaitListConfirm', cwlc.currentUser);

      restaurantService.getCurrentRestaurants(currRest).then(function (data) {
        var currRestObj = data;
        console.log('this is rest obj',currRestObj[0]);

        cwlc.userAddingToQ = function (firstname, lastname, partysize, phone, notes) {
          var person = {
            firstName: firstname,
            lastName: lastname,
            partySize: partysize,
            phone: phone,
            notes: notes
          };

          console.log('this is the person', person);
          console.log('this is the restaurant', currRestObj[0].waitlist_id);
          //console.log('user adding to Q',crc.currentUser);
          waitlistService.addAnonToWaitlist(person, currRestObj[0].waitlist_id).then(function(res) {
            //console.log(res);
            //$ionicHistory.nextViewOptions({
            //  disableBack: true
            //});
            var waitlistId = {
              inWaitList: currRestObj[0].waitlist_id
            };
            userService.updateUser(cwlc.currentUser._id, waitlistId);
            $state.go("customer.waitlist");
          });
        };

      });

    })
  }
})();
