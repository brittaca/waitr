(function () {
  angular
    .module('waitrApp')
    .controller('custWaitlistCtrl', ['userService', 'restaurantService', '$timeout', '$scope', 'waitlistService', '$ionicPopup', '$state', '$ionicHistory',custWaitlistCtrl]);

  function custWaitlistCtrl (userService, restaurantService, $timeout, $scope, waitlistService, $ionicPopup, $state, $ionicHistory) {
    var cwc = this;

    $timeout(function() {
      var currentUser = $scope.ac.currentUser;
      userService.currentUser(currentUser._id).then(function (user){
        cwc.user = user[0];
        console.log('this is wait user',cwc.user);
        restaurantService.getCurrentRestaurant(user[0].inWaitList.restaurant_id).then(function (data) {
          cwc.restaurant = data[0];
          console.log('wait list rest', cwc.restaurant);
        })
      });

      var removeFromWaitlist = function() {
        //for (var key in cwc.user) {
          //console.log(cwc.user.inWaitList.list);
        var list = cwc.user.inWaitList.list;
          for (var i = 0; i < list.length; i++) {
            if (list[i].user_id == cwc.user._id) {
              //console.log(list[i]._id);
              waitlistService.removeFromWaitlist(list[i]._id, cwc.user.inWaitList._id).then(function(res) {
                console.log(res);
                $ionicHistory.nextViewOptions({
                  disableBack: true
                });
                $state.go("customer.home");
              })
            }
          };


      };

      cwc.showRemovePopup = function() {
        var confirmPopup = $ionicPopup.confirm({
          title: "Remove from waitlist",
          template: "WARNING: this will remove you from the list"
        });

        confirmPopup.then(function(res) {
          if (res) {
            console.log("user wants to remove person from list");
            removeFromWaitlist();
          } else {
            console.log("user does not want to remove person from list");
          }
        })
      }
    });

    //var currUser = '56ce45fba2440fe4375e106c';
    //
    //userService.currentUser(currUser).then(function (data) {
    //  cwc.user = data;
    //  var restaurantId = cwc.user[0].inWaitList.restaurant_id;
    //  console.log('rest id',restaurantId);
    //  restaurantService.getCurrentRestaurant(restaurantId).then(function (restaurant) {
    //    cwc.restaurant = restaurant[0];
    //    console.log('this is it', cwc.restaurant);
    //  });
    //});
  }

})();
