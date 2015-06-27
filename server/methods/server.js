/**
 * Server-side methods related to the system.
 */
Meteor.methods({
    /**
     * Get the environment type from the server.
     * @returns {{env: *}} The system environment type (development or production)
     */
    getEnvironment: function() {
        return process.env.NODE_ENV;
    }
})