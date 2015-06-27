/**
 * Main Router File. This file contains all your routes. If you have too many routes or very complex routes, you should
 * split up your routes and group them by functionality into separate files (e.g. mainRoutes.js, adminRoutes.js or
 * apiRoutes.js)
 */

/**
 * Specify the layout template for all pages. You can always override the layout template inside a route (e.g. for the
 * login screen, you might not want to use the standard layout.
 */
Router.configure({
    // refers to a <template name="layout">
    layoutTemplate: 'layout'
});

/**
 * Before any route is executed, execute this function. this.next() needs to be executed to continue the execution of
 * the actual route.
 */
Router.onBeforeAction(function() {
    if (! Meteor.userId()) {
        this.render('login');
    }
    else {
        this.next();
    }
});

/**
 * Generic login check. Can be used inside the routes to determine different rendering templates or data (subscriptions)
 * @returns {boolean} - true or false depending on the login state of the user.
 */
function checkLogin() {
    if (Meteor.userId()) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Generic admin check. Can be used inside the routes to determine admin users. This will check the users profile for
 * the correct value of the accessLevel.
 * @returns {boolean} - true if the user is an admin, false if the user is not an admin
 */
function checkAdmin() {
    if (checkLogin()) {
        var user = Meteor.users.findOne(Meteor.userId);
        if (user !== undefined && user.profile !== undefined) {
            if (user.profile.accessLevel == 2) {
                return true;
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

/**
 * The default route. Displays the dashboard / home template and subscribes to a few collections/documents.
 */
Router.route('/', function() {
    if (checkLogin()) {
        // refers to pubcategories.js > allCategories publication
        this.wait(Meteor.subscribe('allCategories'));
        // refers to pubentries.js > newEntries
        this.wait(Meteor.subscribe('newEntries', 10));
        this.render('dashboard');
    }
    else {
        // user not logged in -> go to login route
        Router.go('/login');
    }
});

/**
 * Login route, showing a login form.
 */
Router.route('/login', function() {
    if (checkLogin()) {
        Router.go('/');
    }
    else {
        this.render('login');
    }
});


/*
Router.route('/category/:category', function() {
    if (checkLogin()) {
        this.wait(Meteor.subscribe('category', this.params.category));
        this.wait(Meteor.subscribe('entriesByCategory', this.params.category));
        if (this.ready()) {
            // render the template 'category'
            this.render('category', {
                data: {
                    // this will only return the categories we've subscribed to
                    categories: dbCategories.find(),
                    // this will only return the entries we've subscribed to
                    entries: dbEntries.find()
                }
            });
        }
    }
});
*/


/*
 System Admin Routes
 */
Router.route('/system', function() {
    if (checkAdmin()) {
        this.render('admindashboard');
    }
});