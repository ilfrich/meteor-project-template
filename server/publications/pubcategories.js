/**
 * Publications for the collection 'categories'. The client subscribes to these publications usually within the routes.
 */

/**
 * Publish all categories available in the system
 */
Meteor.publish('allCategories', function() {
    /*
     * Meteor can pause the execution of the publication by 2 seconds, which helps simulating the clients download time
     * for subscription data (which is hard to test in a dev environment - localhost).
     */
    //Meteor._sleepForMs(2000);
    return dbCategories.find();
});

/**
 * Publish only subcategories of a given parent category
 */
Meteor.publish('subCategories', function(parentCategory) {
    return dbCategories.find({ parent: parentCategory });
});

/**
 * Publish a category and all it's subcategories (one level down)
 */
Meteor.publish('category', function(name) {
    return dbCategories.find({ $or: [
        {
            parent: name
        },
        {
            name: name
        }
    ]});
});