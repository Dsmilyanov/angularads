app.controller('EditAdController',
    function ($scope, $routeParams, $location, userService, categoriesService, townsService, notifyService) {
        $scope.id = $routeParams.id;
        $scope.categories = categoriesService.getCategories();
        $scope.towns = townsService.getTowns();
        $scope.adData = {};

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

        $scope.editAd = function(params) {
            if($scope.adData.changeimage == true) {
                params.changeimage = true;
                params.imageDataUrl = $scope.adData.imageDataUrl;
            }

            userService.editAd(
                params,
                function success(data) {
                    notifyService.showInfo('Successfully Edited ad');
                    $location.path('/user/ads');
                },
                function error(err) {
                    notifyService.showError("There is a error", err);
                }
            );
        };

        $scope.deleteImage = function() {
            $scope.adData.changeimage = true;
            $scope.adData.imageDataUrl = '';
            notifyService.showInfo('The image will be deleted');
        };

        $scope.fileSelected = function(fileInputField) {
            $scope.adData.imageDataUrl = '';
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                $scope.adData.changeimage = true;
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.adData.imageDataUrl = reader.result;
                    $(".image-box").html("<img src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.cancel = function() {
            $location.path('/user/ads');
        };
    }
);