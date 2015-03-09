'use strict';

var React = require('react'),
    NavBar = require('./modules/navbar.jsx'),
    Messages = require('./modules/messages.jsx'),
    DocumentTitle = require('react-document-title'),
    { RouteHandler } = require('react-router'),
    { PropTypes } = React,
    pageStore = require('../stores/page'),
    userStore = require('../stores/user');

var getState = function() {
  return {
    title: pageStore.get().title,
    user: userStore.get()
  };
};

var App = React.createClass({
  displayName: 'App',

  mixins: [pageStore.mixin, userStore.mixin],

  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },

  componentDidMount: function() {
    pageStore.emitChange();
    userStore.emitChange();
  },

  getInitialState: function() {
    return getState();
  },

  render() {
    return (
      /* jshint ignore:start */
      <DocumentTitle title='Snippod Generator Boilerplate'>
        <h1> hello App.js 입니다.</h1>
        <NavBar user={this.state.user} />
        <Messages messages={this.state.messages} />
        <RouteHandler {...this.props} />
      </DocumentTitle>
      /* jshint ignore:end */
    );
  }
});

module.exports = App;
