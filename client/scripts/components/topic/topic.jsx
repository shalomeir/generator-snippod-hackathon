/**
*   Topic Component Description
*/

'use strict';

var React = require('react'),
    DocumentTitle = require('react-document-title');

var getState = function() {
  return {
  };
};

var Topic = React.createClass({
  displayName: 'Topic',

  getInitialState: function() {
    return getState();
  },

  render: function() {
    return (
      /* jshint ignore:start */
      <DocumentTitle title='Topic title'>
        <div className="main-container">
          <div className="yeogurt-info">
            <h1>Welcome to Snippod's boilerplate!</h1>
            <p>
              Take a look at the <a href="https://github.com/shalomeir/generator-snippod-hackathon">documentation</a> and start mixing up something awesome.
            </p>
            <p>
              <img src="/images/yeogurt-swirl.png" width="75px" className="logo" />
            </p>
            <p className="links">
              <a href="/docs/api/index.html">API</a>
            </p>
          </div>
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

module.exports = Topic;
