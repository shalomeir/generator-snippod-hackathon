/**
 *   Snip Component Description
 */

'use strict';

var React = require('react');

var getState = function() {
  return {
  };
};

var Snip = React.createClass({
  displayName: 'Snip',

  getInitialState: function() {
    return getState();
  },

  render: function() {
    return (
      /* jshint ignore:start */
      <DefaultLayout>
        <div className="main-container">
          <div className="yeogurt-info">
            <h1>Welcome to Yeogurt!</h1>
            <p>
              Take a look at the <a href="https://github.com/larsonjj/generator-yeogurt#yeogurt-generator">documentation</a> and start mixing up something awesome.
            </p>
            <p>
              <img src="/images/yeogurt-swirl.png" width="75px" className="logo" />
            </p>
            <p className="links">
              <a href="/docs/api/index.html">API</a>
            </p>
          </div>
        </div>
        <code className="version">v0.14.2</code>
      </DefaultLayout>
      /* jshint ignore:end */
    );
  },

  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = Snip;
