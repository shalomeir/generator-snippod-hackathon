'use strict';
var userStore = require('../stores/user'),
    pageActions = require('../actions/page'),
    messagesActions = require('../actions/messages');


var Authentication = {
  statics: {
    willTransitionTo: function (transition) {

      messagesActions.setMessages({});

      if (!userStore.get().loggedIn) {
        pageActions.set(transition);
        transition.redirect('/login');
      }
    }
  }
};



module.exports = Authentication;
