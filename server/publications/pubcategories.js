/**
 * Publications for the collection 'categories'. The client subscribes to these publications usually within the routes.
 */

/**
 * Publish all categories available in the system
 */
Meteor.publish('allCategories', function() {
    return dbCategories.find();
});

/**
 * Publish only subcategories of a given parent category
 */
Meteor.publish('subCategories', function(parentCategory) {
    return dbCategories.find({ parent: parentCategory });
});

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