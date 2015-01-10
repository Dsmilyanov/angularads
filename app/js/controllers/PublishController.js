app.controller('PublishAdController', function($scope, $location, pageService, authenticationService,
    adsService, notificationService, categoriesService, townsService) {
    pageService.setPageName('Publish New Ad');
    $scope.categories = categoriesService.getCategories();
    $scope.towns = townsService.getTowns();
    $scope.adData = {};

    $scope.publish = function(adData) {
        adsService.create(adData)
            .then(function(successData) {
                notificationService.showSuccess('Advertisement submitted for approval. Once approved, it will be published.');
                $location.path('/user/home');
            }, function(error) {
                notificationService.showError(error.data);
            });
    }
});