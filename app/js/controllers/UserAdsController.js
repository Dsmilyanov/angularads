'use strict';

app.controller('UserAdsController',
    function($scope, $routeParams, $location, userService, notifyService, pageSize) {
        $scope.adsParams = {
            'startPage': 1,
            'pageSize': pageSize,
            'Status': $routeParams.id
        };
        if ($routeParams.id == 'all') {
            $scope.adsParams.Status = null;
        }

        $scope.reloadUserAds = function() {
            userService.getUserAds(
                $scope.adsParams,
                function success(data) {
                    $scope.ads = data;
                },
                function error(err) {
                    notifyService.showError("Cannot load user ads", err);
                }
            );
        };

        $scope.reloadUserAds();

        $scope.deactivateAd = function(adId) {
            userService.deactivateAd(
                adId,
                function success(data) {
                    notifyService.showInfo('Successfully deactivated ad');
                    $scope.reloadUserAds();
                    //$route.reload();
                },
                function error(err) {
                    notifyService.showError("There is a error", err);
                }
            );
        };

        $scope.publishAgainAd = function(adId) {
            userService.publishAgainAd(
                adId,
                function success(data) {
                    notifyService.showInfo('Successfully Publish ad');
                    $scope.reloadUserAds();
                    //$route.reload();
                },
                function error(err) {
                    notifyService.showError("There is a error", err);
                }
            );
        };
    }
);