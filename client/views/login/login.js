/**
 * Events in the scope of the template "login". Elements outside of this template won't be affected, even if the selector
 * is the same.
 */
Template.login.events({

    /**
     * Submit the login form. Attempt to login. If the login fails, change the button color to red (to indicate an error)
     * @param e
     */
    'submit #login-form': function(e) {
        e.preventDefault();

        // read values from form
        var email = $('#username').val();
        var password = $('#password').val();

        // show loading animation
        $('.fa-spinner').show();

        // login with local account
        Meteor.loginWithPassword(email, password, function(err) {
            if (err) {
                // login failed
                $('.fa-spinner').hide();
                $('#login-button').removeClass('btn-primary').addClass('btn-danger');
            }
            else {
                // login successful - the route will take care of the redirect
            }
        });
    },


    /**
     * If the user provides username / password, make sure that any previous error markers are removed.
     * @param e
     */
    'keyup input': function(e) {
        $('#login-button').removeClass('btn-danger').addClass('btn-primary');
    }
});
