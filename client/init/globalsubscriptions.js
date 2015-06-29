/**
 * Put your global subscriptions here. Global subscriptions refer to data that you need on every page. It is recommended
 * to create global subscriptions if you need a data set on most pages. Also with very small collections, using a global
 * subscription might be more comfortable.
 */
Meteor.startup(function() {

    // always subscribe to allCategories - if you remove the comment, you won't need to subscribe to this in the route.
    //Meteor.subscribe('allCategories');
});