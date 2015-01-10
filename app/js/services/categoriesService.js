app.factory('categoriesService', function($resource, baseUrl) {
    var categoryResource = $resource(
        baseUrl + '/categories',
        null, {
            update: {
                method: 'PUT'
            }
        });

    function getAllCategories() {
        return categoryResource.query();
    }

    return {
        getCategories: getAllCategories
    }
});