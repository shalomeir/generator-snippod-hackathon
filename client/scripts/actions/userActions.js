'use strict';

var Reflux = require('reflux'),
    request = require('superagent'),
    serialize = require('form-serialize'),
    cookie = require('cookie'),
    router = require('../router'),
    userDefaults = require('../constants/defaults').user;

var messagesActions = require('./messagesActions');

var userActions = Reflux.createActions({
  //from component
  'login':{},
  'logout':{},
  'register':{},
  'forgot':{},
  'reset':{},
  'updateSettings':{},
  'updatePassword':{},
  'destroy':{},

  //from action to store
  'setUser':{}
});


/* Auth Method
 ===============================*/
var _getToken = function() {
  var cookies = cookie.parse(document.cookie);

  return cookies.token;
};

var _setToken = function(token, duration) {
  var today = new Date();
  // Set expire date for cookie for some time into the future (days)
  var endDate = new Date(today.getTime() + (duration * 1000 * 60 * 60 * 24));
  document.cookie = cookie.serialize('token', token, {expires: endDate});
};

var _postForm = function(form, callback){
  var postData = serialize(form);
  var postUrl = form.getAttribute('action') || window.location.pathname;
  var token = _getToken();
  var options = callback.options || {};

  request
    .post(postUrl)
    .type('form')
    .set({
      'authorization': 'Bearer ' + token,
      'X-Requested-With': 'XMLHttpRequest'
    })
    .send(postData)
    .end(function(res) {
      if (res.ok) {
        var userData;
        // If auth token needs to be stored
        if (options.setToken) {
          // Store token in cookie that expires in a week
          _setToken(res.body.token, 7);
        }
        // If user needs to be updated
        if (options.updateUser) {
          userData = res.body.user;
          userData.loggedIn = true;
          if (options.successUrl) {
            userActions.setUser(userData,options.successUrl);
          }
          userActions.setUser(userData);
        }
        // If user needs to be destroyed
        if (options.destroyUser) {
          // Log user out
          userActions.logout();
        }
        if (callback && callback.success) {
          callback.success(res);
        }

        messagesActions.setMessages(res.body);
        messagesActions.setError({});
      }
      else {
        if (callback && callback.error) {
          callback.error(res);
        }
        if (options.errorUrl) {
          router.transitionTo(options.errorUrl);
        }
        messagesActions.setError(res.body);
      }

      if (callback && callback.complete) {
        callback.complete(res);
      }
    });

};

var isAuthenticated = function(callback) {
  var self = this;
  var token = _getToken();
  request
    .get('/user')
    .type('json')
    .set({
      'authorization': 'Bearer ' + token
    })
    .end(function(res) {
      if (res.ok) {
        if (res.body && res.body.user) {
          var userData = res.body.user;
          userData.loggedIn = true;

          self.setUser(userData);
        }
        else {
          self.logout();
        }
        if (callback && callback.success) {
          callback.success(res);
        }
      }
      else {
        self.logout();
        if (callback && callback.error) {
          callback.error(res);
        }
      }

      if (callback && callback.complete) {
        callback.complete(res);
      }
    });
};


/* User Actions
 ===============================*/
userActions.login.listen(function(form, callback) {
  var cb = callback || function() {};
  cb.options = {
    setToken: true,
    updateUser: true
  };
  _postForm(form, cb);

});

userActions.logout.listen(function() {
  // Remove token
  _setToken('', -1);

  // Reset user to defaults
  userActions.setUser(userDefaults);

  // Redirect to homepage
  router.transitionTo('/');
});

userActions.register.listen(function(form, callback) {
  var cb = callback || function() {};
  cb.options = {
    successUrl: '/settings',
    setToken: true,
    updateUser: true
  };
  _postForm(form, cb);
});

userActions.forgot.listen(function(form, callback) {
  var cb = callback || function() {};
  cb.options = {
    successUrl: '/',
    errorUrl: '/login/forgot'
  };
  _postForm(form, cb);
});

userActions.reset.listen(function(form, callback) {
  var cb = callback || function() {};
  cb.options = {
    successUrl: '/',
    errorUrl: window.location.pathname
  };
  _postForm(form, cb);
});

// from setting component
userActions.updateSettings.listen(function(form, callback) {
  var cb = callback || function() {};
  cb.options = {
    successUrl: '/settings',
    errorUrl: '/settings',
    updateUser: true
  };
  _postForm(form, cb);
});

userActions.updatePassword.listen(function(form, callback) {
  var cb = callback || function() {};
  cb.options = {
    successUrl: '/settings',
    errorUrl: '/settings'
  };
  _postForm(form, cb);
});

userActions.destroy.listen(function(form, callback) {
  var cb = callback || function() {};
  cb.options = {
    destroyUser: true
  };
  _postForm(form, cb);
});


module.exports = userActions;
