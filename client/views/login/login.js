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

        var email = $('#username').val();
        var password = $('#password').val();
        $('.fa-spinner').show();


        // login with local account
        var loginResult = Meteor.loginWithPassword(email, password, function(err) {
            if (err) {
                return false;
            }
            else {
                // the route will take care of the redirect
                return true;
            }
        });

        if (!loginResult)
        {
            $('.fa-spinner').hide();
            $('#login-button').removeClass('btn-primary').addClass('btn-danger');
        }
    },


    /**
     * If the user provides username / password, make sure that any previous error markers are removed.
     * @param e
     */
    'keyup input': function(e) {
        $('#login-button').removeClass('btn-danger').addClass('btn-primary');
    }
});
