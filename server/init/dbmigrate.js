/**
 * Database Migration. This is executed on every server start. Each migration script should check for the conditions of
 * it's execution and only modify records that need migration. Once all records are migrated and the code doesn't
 * produce "old" records anymore, the migration script can be commented out - keep them commented out (and don't delete
 * them) to have a record of what has been ran in the past.
 */
Meteor.startup(function() {


    /**
     * These are examples only. To make these examples work, you would have to add the 'newField' field to the
     * schema declaration for the example collection (shared/model/dbentries.js)
     */
    /*
    // only modify records that don't have the field yet
    dbEntries.update({ newField: { $exists: false }}, { $set: {
        // update the field to a default value
        newField: 'default value'
    }}, { multi: true });
    */

    /*
    // alternative method of iterating through affected elements and execute more logic to determine the new value
    dbEntries.find({ newField: { $exists: false }}).forEach(function(affectedEntry) {
        // some logic to determine the new value (using the data form the affected entry)
        dbEntries.update(affectedEntry._id, { $set: {
            newField: affectedEntry.category.join(', ')
        }});
    });
    */
});