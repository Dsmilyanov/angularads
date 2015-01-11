app.controller('EditProfileController',
    function($scope, $routeParams, $location, userService, categoriesService, townsService, notifyService) {

        $scope.towns = townsService.getTowns();
        $scope.password = {};

        userService.getUserInfo(
            function success(data) {
                $scope.userData = data;
            },
            function error(err) {
                notifyService.showError("There is a error", err);
            }
        );

        $scope.editProfile = function(params) {

            userService.editProfile(
                params,
                function success(data) {
                    notifyService.showInfo('Successfully Edited profile');
                    $location.path('/user/editProfile');
                },
                function error(err) {
                    notifyService.showError("There is a error", err);
                }
            );
        };

        $scope.changePassword = function(params) {

            userService.changePassword(
                params,
                function success(data) {
                    notifyService.showInfo('Successfully Changed Password');
                    $location.path('/');
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