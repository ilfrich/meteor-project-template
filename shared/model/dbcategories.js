/**
 * Declares a new collection.
 * @type {Mongo.Collection}
 */
dbCategories = new Mongo.Collection('categories');


/**
 * Specify a schema for this collection. Insert and update operations will be validated against this schema. If the
 * JSON object you send does not comply with this schema, the insert/update operation will fail.
 *
 * This schema specification requires the package aldeed:collection2
 */
dbCategories.attachSchema(
    new SimpleSchema({
        // mandatory field
        name: {
            type: String
        },
        // optional field
        parent: {
            type: String,
            optional: true
        }
    })
);


/**
 * Execute something after a document has been inserted (e.g. updating other records)
 *
 * These hooks require the package matb33:collection-hooks
 */
dbCategories.after.insert(function(userId, doc) {
    // do something
});


/**
 * Special access privileges. This is mainly to restrict the operations available for client code or server code.
 * Usually you would check the users access privileges or other side-conditions (e.g. validation of the data, checking
 * ownership of the document) - read more: http://docs.meteor.com/#/full/allow
 */
if (Meteor.isServer) {
    // server side privileges (all true -> don't need to specify)
    dbCategories.allow({
        insert: function(userId, doc) {
            return true;
        },
        update: function(userId, doc, fieldNames, modifier) {
            return true;
        },
        remove: function(userId, doc) {
            return true;
        }
    });
}
else if (Meteor.isClient) {
    // client side privileges
    dbCategories.allow({
        insert: function(userId, doc) {
            return true;
        },
        update: function(userId, doc, fieldNames, modifier) {
            // only allow update for standard users and admin users
            if (Meteor.user() && Meteor.user().profile.accessLevel >= 1) {
                return true;
            }
            else {
                return false;
            }
        },
        remove: function(userId, doc) {
            // prevent deleting records from the client
            return false;
        }
    });
}