'use strict';

var React = require('react'),
    DocumentTitle = require('react-document-title'),
    userActions = require('../../actions/userActions');

var Signup = React.createClass({

  render: function() {
    return (
      /* jshint ignore:start */
      <DocumentTitle title='SignUp page'>
        <div className="signup">
          <h3>Sign up</h3>
          <form id="signup-form" method="post" action="/user" onSubmit={this.handleSubmit}>
            <p>
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" id="email" placeholder="Email" />
            </p>

            <p>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" placeholder="Password" />
            </p>

            <p>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
            </p>

            <button>Signup</button>
          </form>
        </div>
      </DocumentTitle>
      /* jshint ignore:end */
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    userActions.signup(form);
  }
});

module.exports = Signup;
