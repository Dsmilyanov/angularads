app.factory('townsService', function($resource, baseUrl) {
    var townsResource = $resource(
        baseUrl + '/towns',
        null, {
            update: {
                method: 'PUT'
            }
        });

    function getAllTowns() {
        return townsResource.query();
    }

    return {
        getTowns: getAllTowns
    }
});