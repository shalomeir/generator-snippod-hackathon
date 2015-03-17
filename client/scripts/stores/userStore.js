'use strict';

var Reflux = require('reflux'),
    userDefaults = require('../constants/defaults').user,
    userActions = require('../actions/userActions');

var UserStore = Reflux.createStore({

  listenables: userActions,

  init: function() {
    this.user = userDefaults;
  },

  getUser: function() {
    return this.user;
  },

  /* Listen UserActions
   ===============================*/
  setUser: function(userData) {
    this.user = userData;
    this.trigger(this.user);
  }

});

module.exports = UserStore;
