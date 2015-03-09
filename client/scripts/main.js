'use strict';

var React = require('react'),
    router = require('./router'),
    userActions = require('./actions/user');

// Check the auth status upon initialization,
// should happen before rendering any templates
userActions.isAuthenticated({

  // Start routing once we have captured a user's auth status
  complete: function() {
    /* jshint ignore:start */
    router.run((Handler, state) => {
      React.render(<Handler {...state} />, document.getElementById('app-wrapper'));
    });
    /* jshint ignore:end */



  }

});

console.log('Welcome to Main.js');
