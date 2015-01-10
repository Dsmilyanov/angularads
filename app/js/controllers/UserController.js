app.controller('UserController', function($scope, $location, pageSize, pageService,
    adsService, notificationService) {
    pageService.setPageName('My Ads');

    $scope.adsRequestParams = {
        startPage: 1,
        pageSize: pageSize
    }

    $scope.getAds = function(requestParams) {
        adsService.getUserAds(requestParams)
            .then(function(data) {
                $scope.userAdsData = data;
            });
    }

    $scope.showPage = function() {
        $scope.getAds($scope.adsRequestParams);
    }

    $scope.filterByStatus = function(status) {
        $scope.adsRequestParams.status = status;
        $scope.getAds($scope.adsRequestParams);
    }

    $scope.deactivateAd = function(adId) {
        adsService.deactivate(adId)
            .then(function(successData) {
                notificationService.showSuccess('Ad deactivated successfully.');
            }, function(error) {
                notificationService.showError(error.data);
            })
    }

    $scope.republishAd = function(adId) {
        adsService.republish(adId)
            .then(function(successData) {
                notificationService.showSuccess('Ad re-submitted for approval. Once approved, it will be published.');
            }, function(error) {
                notificationService.showError(error.data);
            })
    }

    $scope.getAds($scope.adsRequestParams);
});