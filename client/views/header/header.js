Template.header.helpers({
    
});
Template.header.events({
    /**
     * Click on the logout icon
     * @param e
     */
    'click #logout-icon': function(e) {
        Meteor.logout();
    },

    /**
     * Click on the home icon
     * @param e
     */
    'click #home-icon': function(e) {
        Router.go('/');
    },


    /*
     * Simulating the ease effect in the header
     */
    'mouseenter a': function(e) {
        $(e.target).closest('a').css('color', '#f00');
    },
    'mouseout a': function(e) {
        $(e.target).closest('a').css('color', '#337ab7');
    }
});