/**
 * Database Initialization / Fixtures. If you have a lot of fixtures, create multiple files like initEntries or
 * initCategories.
 */
Meteor.startup(function() {

    /*
     * A standard user (accessLevel 1) and an admin user (accessLevel 2)
     * A unique username, a unique email address and a password are mandatory.
     */
    var demoUsers = [
        {
            username: 'test',
            password: 'test',
            email: 'test@noemail.noemail',
            profile: {
                name: 'Test Test',
                accessLevel: 1
            }
        },
        {
            username: 'admin',
            password: 'admin',
            email: 'admin@noemail.noemail',
            profile: {
                name: 'Admin Admin',
                accessLevel: 2
            }
        }
    ];

    // check if the user already exists, and if not insert it.
    demoUsers.forEach(function(user) {
        var userAlreadyExists = typeof Meteor.users.findOne({ username: user.username }) === 'object';
        if (!userAlreadyExists) {
            Accounts.createUser(user);
        }
    });

});
