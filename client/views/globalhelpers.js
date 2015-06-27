/*
 * PROJECT SPECIFIC HELPERS
 *
 * Add your own helpers here
 */



/*
 *  BOILERPLATE CORE HELPERS
 */
/**
 * Returns all users in the system (with limited fields)
 */
Template.registerHelper('allUsers', function() {
    if (Meteor.user()) {
        if (Session.get('allUsers')) {
            return Session.get('allUsers');
        }
        else {
            Meteor.call('allUsers', function(err, data) {
                Session.set('allUsers', data);
            });
        }
    }
});

/**
 * Returns the size of an array or a collection.
 */
Template.registerHelper('sizeOf', function(item) {
    if (item === undefined || item == null) {
        return 0;
    }
    else if (item.hasOwnProperty('length')) {
        return item.length;
    }
    else if (item.hasOwnProperty('count')) {
        return item.count();
    }
});

/**
 * Checks a string, array or collection if it doesn't have any elements, is empty or undefined.
 */
Template.registerHelper('isEmpty', function(item) {
    if (item === undefined || item == null) {
        return true;
    }
    else if (item.hasOwnProperty('length')) {
        // empty array
        return (item.length == 0);
    }
    else if (item.hasOwnProperty('count')) {
        // empty collection
        return (item.count() == 0);
    }
    else {
        // empty string
        return (item == '');
    }
});

/**
 * Uses a predefined format to display a date object. The invalidDefault is the fallback to display in case the date is
 * not valid (e.g. null, undefined, ...). It can be set to something like 'tba' or 'tbd'. If no default is provided n/a
 * is returned.
 */
Template.registerHelper('formatDateDefault', function(date, invalidDefault) {
    var mom = moment(date);
    if (mom.isValid()) {
        return mom.format('ddd, D MMM YYYY, HH:mm');
    }
    else if (invalidDefault !== undefined && invalidDefault.hash === undefined) {
        return invalidDefault
    }
    else {
        return 'n/a';
    }
});

/**
 * Formats the given date with the provided date. A format is specified as described here:
 * http://momentjs.com/docs/#/displaying/format/
 *
 * The invalidDefault is displayed if the date is invalid. It should be something like 'tbd' or 'tba'.
 */
Template.registerHelper('formatDate', function(date, format, invalidDefault) {
    var mom = moment(date);
    if (mom.isValid()) {
        return mom.format(format);
    }
    else if (invalidDefault !== undefined && invalidDefault.hash === undefined) {
        return invalidDefault
    }
    else {
        return 'n/a';
    }
});

/**
 * This function should be used if you have a plain textarea, but want to display linebreaks as they were provided in
 * the textarea. If you don't use the nl2br function, linebreaks (\n) provided in the textarea will not be recognized.
 *
 * To make sure it is rendered properly, use the 3-bracket notation: {{{nl2br myText}}} to ensure the <br/> tags are
 * rendered and not just printed out as text.
 */
Template.registerHelper('nl2br', function(str) {
    if (str === undefined || str == null) {
        return '';
    }
    var breakTag = '<br/>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
});

/**
 * Concatenates a list of entries (should be primitive objects) and joins them using a the provided symbol. If no symbol
 * is provided the entries will be joined using a comma (and space).
 */
Template.registerHelper('concat', function(list, symbol) {
    if (symbol === undefined || symbol == null) {
        symbol = ', ';
    }
    return list.join(symbol)
});

/**
 * Generic comparison, simply compares 2 values and returns their equality.
 */
Template.registerHelper('equals', function(a, b) {
    return (a == b);
});

/**
 * Similar to the equals helper, this helper will return ' active' if 2 values are equal. This is very useful for HTML
 * elements to add the class 'active' to an element fulfilling the criteria.
 */
Template.registerHelper('isActiveClass', function(a, b) {
    if (a == b) {
        return ' active';
    }
    else {
        return '';
    }
});

/**
 * Helper to return if the currently logged in user is an admin.
 */
Template.registerHelper('isAdmin', function() {
    if (Meteor.user() && Meteor.user().profile !== undefined) {
        return (Meteor.user().profile.accessLevel == 2)
    }
    return false;
});