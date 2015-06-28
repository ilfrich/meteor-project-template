/**
 * Declares a new collection.
 * @type {Mongo.Collection}
 */
dbEntries = new Mongo.Collection('entries');

/**
 * Specify a schema for this collection. Insert and update operations will be validated against this schema. If the
 * JSON object you send does not comply with this schema, the insert/update operation will fail.
 *
 * This schema specification requires the package aldeed:collection2
 */
dbEntries.attachSchema(
    new SimpleSchema({
        name: {
            type: String
        },
        category: {
            // list of categories
            type: [String]
        },
        date: {
            type: Date
        },
        complex: {
            optional: true,
            type: new SimpleSchema({
                label: {
                    type: String
                },
                numericValue: {
                    type: Number,
                    optional: true
                },
                stringValue: {
                    type: String,
                    optional: true
                },
                booleanValue: {
                    type: Boolean,
                    optional: true
                }
            })
        }
    })
);


/**
 * Special access privileges. This is mainly to restrict the operations available for client code or server code.
 * Usually you would check the users access privileges or other side-conditions (e.g. validation of the data, checking
 * ownership of the document) - read more: http://docs.meteor.com/#/full/allow
 */
if (Meteor.isServer) {
    // server side privileges (all true -> don't need to specify)
    dbEntries.allow({
        // short notation: not passing any parameters, because we don't use them=
        insert: function() {
            return true;
        },
        update: function() {
            return true;
        },
        remove: function() {
            return true;
        }
    });
}