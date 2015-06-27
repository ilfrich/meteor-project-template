/**
 * Performs a form validation on a given DOM element. Any input, select or textarea tag can have an attribute
 * data-validate="true" which puts the form element on the list of elements to check. The function will determine the
 * current value / selected option of the form element and if the value is not provided or an empty string, the
 * validation will fail. Besides returning a validation result, it will also add the .error class to any element that
 * may have caused the v
 *
 * @param selector - the CSS selector for the form / container holding the form elements
 * @returns {boolean} - the validation result
 */
function validateForm(selector) {
    var validationResult = true;
    $(selector).find('input,select,textarea').removeClass('error');
    $(selector).find('input,select,textarea').each(function(index, item) {
        if ($(item).attr('data-validate') == 'true') {
            var value = $(item).val();
            if (item.tagName == 'SELECT') {
                value = $(item).find('option:selected').val();
            }

            if (value.trim() == '' || value === undefined || value == null) {
                $(item).addClass('error');
                validationResult = false;
            }
        }
    });

    return validationResult;
}

/**
 * Uses typeahead to create a user search field, where as you start typing matching users will be provided in a suggest
 * search manner.
 *
 * @param selector - the CSS selector for the input field
 */
function initUserSearch(selector) {
    // add new user search
    $(selector).on('keyup', function(e) {
        var timestamp = new Date().getTime();
        $(selector).attr('block', timestamp).removeClass('error');

        setTimeout(function() {
            if ($(selector).attr('block') == timestamp) {
                var search = $(selector).val();
                Meteor.call('searchUser', search, function(err, data) {
                    $(selector).removeAttr('block');
                    $(selector).typeahead('destroy');
                    $(selector).typeahead({
                        source: data,
                        items: 4,
                        minLength: 1
                    });
                });
            }
        });
    });
}