# Meteor Project Template / Boilerplate

## Table of Content

* [Feature Summary](#feature-summary)
* [User Accounts](#user-accounts)
* [Features](#features)
    * [Initialization](#initialization)
    * [Packages](#packages)
    * [Router](#router)
    * [Collections](#collections)
    * [Publications and Subscriptions](#publications-and-subscriptions)
    * [Server Methods](#server-methods)
    * [Client Code](#client-code)
         * [Compatibility](#compatibility)
         * [Views](#views)
         * [LESS/CSS and Variables](#less--css-variables)
         * [Global Helpers](#global-helpers)

## Feature Summary

* Basic folder structure for initialization, collections, publications, server-methods, views and routes.
* Plenty of documented examples for different aspects of your application
* Layout and loading template support
* Login and local accounts
* LESS support
* Basic authentication

## User Accounts

Login | Password | Access
----- | -------- | ------
test | test | Standard User
admin | admin | Admin User

## Features

### Initialization

The server-side initialization mainly includes the database initialization (a.k.a fixtures). So there is a folder
**/server/init/** which contains a dbinit.js file (taking care of the initial data) and a dbmigrate.js file (taking care
 of data migrations). The later should only come into play after you put the application into production. If there are
 other things (other than the database) to initialize, simply create a new file in this folder for that other
 initialization.

The client-side initialization should be done in the folder **/client/init/**. The boilerplate provides an example to
make sure the client knows the system environment type (development or production), by retrieving the type from the
server (`process.env`) and storing it in the session.

### Packages

The boilerplate comes with a list of packages already added. Some might not be necessary and can be removed (e.g. if you
don't need charts you can remove the C3 package).

__Recommended Packages__

* **less:** Extension to CSS, which allows variables and better readability and structure of your CSS. The package makes
sure any change to a LESS file will automatically recompile the CSS. In the browser you see the update almost
immediately without a refresh.
* **jquery:** Still good for some UI interactions (show, hide, slide) and querying the DOM tree.
* **accounts-password:** Contains `users` collection and basic login/logout functionality.
* **aldeed-collection2:** Allows to declare schemas for any collection. This is very useful to make your application
more robust. If an insert/update operation would violate the schema, the item is not added/updated and a meaningful
error message is printed on the console.
* **matb33:collection-hooks:** Allows to declare before and after hooks for database operations (CRUD).
* **tmeasday:publish-count:** Very small package, which is important for implementing pagination or if you have big
collections and want to know the total amount of elements without downloading all of them to the client.
* **meteorhacks:aggregate:** Server-side package to extend the database driver with aggregation operations, which
normally wouldn't be available in Meteor.
* **iron:router:** THE default router for Meteor applications. Very flexible, extensible and powerful. Only problem is
that they allow different notations of routes, which makes it a bit confusing when you're looking for a solution online.
* **momentjs:moment:** Powerful date handling library. Allows parsing, formatting and manipulation of date objects.
* **mizzao:bootstrap-3:** Bootstrap is and has been the most popular UI framework for years, allowing you to create
responsive layouts (grid layout) and commonly used UI components (navigation, pagination, panels, form elements, tables,
 ...)
* **browser-policy:** Core package to specify headers sent to the browser to control your application security (eval,
iframes, CORS, ...)
* **reactive-var:** Package for advanced Meteor programmers, declaring any local variable as reactive, which triggers
re-execution of code snippets on change.
* **mrt:filesaver:** Allows you to implement download capabilities to download data as a file.
* **johdirr:meteor-git-rev:** Provides you template helpers to display the current GIT commit of the file. Very useful
 for debugging production servers to know from the application which commit is deployed.
* **http:** Standard package to allow HTTP calls from the server-side.

__Optional Packages__

* **tsega:bootstrap3-datetimepicker:** Very good date/time picker for appealing forms.
* **matteodem:gridster:** Allows you to create a dashboard with movable and resizeable grid widgets.
* **peernohell:c3:** Very powerful chart library (based on D3) with a very intuitive API. Create the graph creation
within helpers to achieve reactive graphs.
* **juliancwirko:s-alert:** Simple notification library, which allows easy display of notifications in either corner of
the screen or as a horizontal bar covering the full width of the screen.
* **mrt:bootstrap3-typeahead:** Allows you to simply create an auto-suggest field, where as you start typing it will
suggest you potential hits.
* **fortawesome:fontawesome:** One of the few high quality icon sets with a good (and huge) selection of free-to-use
icons.

### Router

Routes are specified in **/shared/routes.js** If you have a really big application, you can split up the routes and put
 separate files containing routes for different areas of the application into a sub-folder **/shared/routes/**. Sadly
 Iron Router doesn't specify ONE syntax to specify a route, but allows multiple different notations. This is bad if you
 are looking for a solution online and you need to translate a posted solution into the notation of your choice.

 The example routes contain:

 * Global configuration of a layout template
 * Login check onBeforeAction
 * Example subscriptions with the usage of a loading template while the subscription is downloaded
 * Example administration route


### Collections

Collections need to be accessible in the client and the server, which is why they're declared in the folder
**/shared/model/**. Adding the prefix db\<collectionname\> to the file, will make it easier to find. It is recommended to
create a separate file for each collection. Besides just declaring the collection, you can attach a schema to it, define
before and after hooks for all operations and control access privileges.

The boilerplate contains 2 simple examples of collections (dbentries.js and dbcategories.js).

### Publications and Subscriptions

Publications are declared on the server-side. They are located in **/server/publications/**. Each file contains the
publications for one collection.
The router is subscribing to a few of the example publications and displaying a loading template while doing so. The
loading template is located in /client/views/loading/loading.html. To see it for longer in the local environment, you
can add a delay to one of the publications. E.g. for the main route (`'/'`) the router subscribes to `allCategories`,
which is declared in /server/publications/pubcategories.js. The publication contains a commented out
`Meteor._sleepForMs(2000)`, which delays the subscription by 2 seconds. So accessing the home route will show the
loading template for 2 seconds.

### Server Methods

Server methods are called from the client-side and can trigger server-side operations, database operations and return
aggregated or computed data.

In a medium-size application you will end up with quite a few methods, so splitting them up into multiple files is
recommended. They are located in the folder **/server/methods/** and named after the business object / application part
the methods handle.

### Client Code

All client-side code is added to the **/client/** folder - code there will not be accessible by the server.

#### Compatibility

To prevent load-order issues in the client (e.g. a function using a library is executed before the library is loaded)
there is a special **/client/compatibility/** folder. Code here should not depend on other code (or on other code within
the compatibility folder). Examples are libraries, which don't exist as Atmosphere packages or generic client code which
is reused in multiple views. As an example the file forms.js in the compatibility folder contains a function for generic
form validation and a user suggest search.

#### Views

Each view is stored in a separate sub-folder like **/client/views/\<viewname\>/**. If multiple views have a strong
correlation, you can group them together in a sub folder: e.g. /client/views/mygroup/\<viewname\>. One thing to avoid is
having a list of 20+ views on the same level. As the number of views increases, you should group them together into
sub-folders.

A view contains:

 * an HTML file containing the template.
 * a JS file containing the template helpers, events and other hooks (rendered, created, destroyed)
 * a CSS/LESS file containing the template styles

Ideally the name of the HTML, JS and LESS file is the same as the name of the view. So if you declare a view `myview`,
you will have:

* **/client/views/myview/myview.html** to declare the `<template name="myview">`
* **/client/views/myview/myview.js** to declare the helpers and events
* **/client/views/myview/myview.less** to design the view

#### LESS / CSS Variables

The package less allows us to specify less files, which are compiled into CSS. Less allows you to declare and use
variables inside your stylesheets (e.g. for the main brand color or the dimensions of reusable elements).

Special files:

* **/client/views/variables.less** to declare global variables. This file should be imported in every LESS file.
* **/client/views/common.less** to declare view-independent styles that specify the general look & feel of the
application, helper CSS classes and commonly used UI elements.

To avoid view-dependent styles to affect any other views, it is recommended to start your view with an ID (if the view
is never displayed twice on the same screen) or a specific CSS class (if the view is reused on the same page). A useful
convention is to start a template with a `<div id="view-myview">` (if the name of the view is `"myview"`) and inside the
LESS file:

    @import "../variables";

    #view-myview {
      // put your view-specific styles here
    }

#### Global Helpers

This boilerplate comes with a bunch of global helpers declared in **/client/views/globalhelpers.js**.

* **allUsers()**: Calls the server and returns a compact list of all users (e.g. for user drop downs) in a reactive
fashion.
* **sizeOf(item):** Returns the size of an array or the amount of items in a collection (auto-detect).
* **isEmpty(item):** Uses the same logic as *sizeOf* and then returns if it is 0 or not.
* **formatDateDefault(date, fallback):** Date format function with predefined format
* **formatDate(date, format, fallback):** Date format function
* **nl2br(string):** Replaces all (native) line breaks (e.g. \n) into a `<br/>` tag. Useful for `<textarea>`s without
WYSIWYG capabilities. Use with 3 curly brackets: `{{{nl2br text}}}`
* **concat(list, symbol):** Returns a single string concatenating the elements of an array with a specified symbol.
* **equals(a, b):** Allows you to simply compare 2 objects in the template.
* **isActiveClass(a, b):** Allows you to add an 'active' class to a DOM element's class list under the condition that
`a == b`.
* **isAdmin():** Boolean helper to decide whether the user is an admin or not (to show different content)