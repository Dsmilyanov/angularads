app.controller('UserProfileController', function($scope, pageService, userService, townsService, notificationService) {
    pageService.setPageName('Edit User Profile');

    $scope.getProfileData = function() {
        userService.getUser()
            .then(function(successData) {
                $scope.userData = successData;
            }, function(error) {

            });
    }

    $scope.updateProfile = function(userData) {
        userService.editUser(userData)
            .then(function(successData) {
                notificationService.showSuccess('User profile successfully updated.')
            }, function(error) {
                notificationService.showError(error.data);
            });
    }

    $scope.changePassword = function(userPassData) {
        if (userPassData) {
            if (userPassData.newPassword == userPassData.confirmPassword) {
                userService.changePassword(userPassData)
                    .then(function(successData) {
                        notificationService.showSuccess('Password changed successfully.')
                    }, function(error) {
                        notificationService.showError(error.data);
                    });
            } else {
                notificationService.showError('New password doesn\' match confirmed password.');
            }
        } else {
            notificationService.showError('Invalid password.');
        }

    }

    $scope.getProfileData();
    $scope.towns = townsService.getTowns();
});