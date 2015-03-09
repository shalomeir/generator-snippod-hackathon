'use strict';

var React = require('react'),
    { Route, DefaultRoute } = require('react-router'),
    App = require('./components/App.jsx'),
    Login = require('./components/account/login.jsx'),
    Forgot = require('./components/account/forgot.jsx'),
    SignUp = require('./components/account/signup.jsx'),
    Settings = require('./components/account/settings.jsx'),
    User = require('./components/account/user.jsx'),
    Snip = require('./components/snip/snip.jsx'),
    Topic = require('./components/topic/topic.jsx');

var routes = (
  /* jshint ignore:start */
  <Route name='app' path='/' handler={App}>
    <DefaultRoute name='root' handler={Topic} />
    <Route name='login' path='/login' handler={Login} />
    <Route name='forgot' path='/login/forgot' handler={Forgot} />
    <Route name='signup' path='/signup' handler={SignUp} />
    <Route name='settings' path='/settings' handler={Settings} />
    <Route name='user' path='/user' handler={User} />
    <Route name='snip' path='/snip/:sid' handler={Snip} />
    <Route name='topic' path='/:topic' handler={Topic} />
  </Route>
  /* jshint ignore:end */
);

module.exports = routes;
