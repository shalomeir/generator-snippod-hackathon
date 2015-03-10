'use strict';

var React = require('react'),
    NavBar = require('./modules/navbar.jsx'),
    Messages = require('./modules/messages.jsx'),
    DocumentTitle = require('react-document-title'),
    { RouteHandler } = require('react-router'),
    { PropTypes } = React,
    userStore = require('../stores/user');

var getState = function() {
  return {
    user: userStore.get()
  };
};

var App = React.createClass({
  displayName: 'App',

  mixins: [userStore.mixin],

  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },

  componentDidMount: function() {
    userStore.emitChange();
  },

  getInitialState: function() {
    return getState();
  },

  render() {
    return (
      /* jshint ignore:start */
      <DocumentTitle title='App Main'>
        <div className='App'>
          <NavBar {...this.props} user={this.state.user} />
          <Messages />
          <RouteHandler {...this.props} user={this.state.user} />
        </div>
      </DocumentTitle>
      /* jshint ignore:end */
    );
  },

  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
    this.setState(getState());
  }

});

module.exports = App;
