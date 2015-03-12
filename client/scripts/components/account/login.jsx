'use strict';

var React = require('react'),
    DocumentTitle = require('react-document-title'),
    userStore = require('../../stores/user'),
    userActions = require('../../actions/user'),
    Router = require('react-router'),
    { Link } = Router;


var getState = function() {
  return {
  };
};

var Login = React.createClass({

  getInitialState: function() {
    return getState();
  },

  render: function() {
    return (
      /* jshint ignore:start */
      <DocumentTitle title='Login page'>
        <div className="login">
          <h3>Sign in</h3>
          <form method="post" action="/login" onSubmit={this.handleSubmit}>
            <p>
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" id="email" placeholder="Enter your email" autofocus="autofocus" />
            </p>

            <p>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" placeholder="Password" />
            </p>

            <button>Login</button>
            <p><Link to="forgot">Forgot your password? </Link></p>
          </form>
        </div>
      </DocumentTitle>
      /* jshint ignore:end */
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    userActions.login(form);
  }

});

module.exports = Login;
