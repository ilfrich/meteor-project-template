/**
 * Publications for the 'entries' collection.
 */

/**
 * Publishes all entries of a certain category
 */
Meteor.publish('entriesByCategory', function(category) {
    // even though category is an array of categories, this query will return documents that CONTAIN the given category
    return dbEntries.find({ category: category });
});


/**
 * Publishes the newest entries (sort date desc). The limit parameter determines how many records to publish.
 */
Meteor.publish('newEntries', function(limit) {
    return dbEntries.find({}, { sort: { date: -1 }, limit: limit});
});