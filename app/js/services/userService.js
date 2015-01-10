app.factory('userService', function($resource, $http, baseUrl, authenticationService) {
    $http.defaults.headers.common['Authorization'] = authenticationService.getHeaders().Authorization;
    var userUrl = baseUrl + '/user',
        userResource = $resource(
            userUrl, null, {
                update: {
                    method: 'PUT'
                },
                getProfile: {
                    url: userUrl + '/profile',
                    method: 'GET'
                },
                edit: {
                    url: userUrl + '/profile',
                    method: 'PUT'
                },
                changePassword: {
                    url: userUrl + '/changepassword',
                    method: 'PUT'
                }
            });

    function getUserData() {
        return userResource.getProfile().$promise;
    }

    function editUserData(userData) {
        return userResource.edit(userData).$promise;
    }

    function changePassword(passData) {
        return userResource.changePassword(passData).$promise;
    }

    return {
        getUser: getUserData,
        editUser: editUserData,
        changePassword: changePassword
    }
});