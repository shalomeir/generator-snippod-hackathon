'use strict';
var userStore = require('../stores/user'),
    pageActions = require('../actions/page');

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {

      if (!userStore.get().loggedIn) {
        pageActions.set(transition);
        transition.redirect('/login');
      }
    }
  }
};



module.exports = Authentication;
