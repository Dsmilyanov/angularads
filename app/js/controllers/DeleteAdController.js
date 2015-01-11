app.controller('DeleteAdController',
    function ($scope, $routeParams, $location, userService, notifyService) {
        $scope.id = $routeParams.id;
        userService.getAdInfo(
            $scope.id,
            function success(data) {
                notifyService.showInfo('Please Confirm or cancel delete of Current Ad');
                $scope.ad = data;
            },
            function error(err) {
                notifyService.showError("There is a error", err);
            }
        );

        $scope.deleteAd = function(adId) {
            userService.deleteAd(
                adId,
                function success(data) {
                    notifyService.showInfo('Successfully Delete ad');
                    $location.path('/user/ads');
                },
                function error(err) {
                    notifyService.showError("There is a error", err);
                }
            );
        };

        $scope.cancel = function() {
            $location.path('/user/ads');
        };
    }
);