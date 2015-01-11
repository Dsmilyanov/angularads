app.factory('authenticationService', function($resource, baseUrl){
    var registerUrl = baseUrl + '/user/register',
        loginUrl = baseUrl + '/user/login';

    var userRegistrationService =
        $resource(registerUrl, null,
            {update: {method: 'PUT'}
        }),
        userLoginService = 
        $resource(loginUrl, null,
            {update: {method: 'PUT'}
        });

    function registerUser(userData) {
        return userRegistrationService.save(userData).$promise;
    }

    function loginUser(userData) {
        return userLoginService.save(userData).$promise;
    }

    function logOutUser() {
        delete sessionStorage['currentUser'];
    }

    function isLogged() {
        return sessionStorage['currentUser'] != undefined;
    }

    function getUser() {
        var userData = sessionStorage['currentUser'];
        if (userData) {
            return JSON.parse(sessionStorage['currentUser']);
        }
    }

    function isNormalUser() {
        return this.isLogged() && !this.getUser().isAdmin;
    }

    function getHeaders() {
        var headers = {},
            currentUser = this.getUser();
        if (currentUser) {
            headers['Authorization'] = 'Bearer ' + currentUser.access_token;
        }

        return headers;
    }

    return {
        register: registerUser,
        login: loginUser,
        logout: logOutUser,
        isLogged: isLogged,
        getUser: getUser,
        isUser: isNormalUser,
        getHeaders: getHeaders
    }
});