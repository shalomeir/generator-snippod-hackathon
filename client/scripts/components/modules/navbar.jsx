'use strict';

var React = require('react'),
    userStore = require('../../stores/user'),
    userActions = require('../../actions/user'),
    Router = require('react-router'),
    { Link } = Router;

var getState = function() {
  return {
    user: userStore.get()
  };
};

var NavBar = React.createClass({
  displayName: 'NavBar',

  mixins: [userStore.mixin],

  getInitialState: function() {
    return getState();
  },

  render: function() {
    var user = this.props.user;
    var navLinks = user.loggedIn ? (
      /* jshint ignore:start */
      <ul className="nav-list pull-right">
        <li className="nav-item">
          Hello {user.firstName ? user.firstName : user.email}
        </li>
        <li className="nav-item">
          <Link to="settings">My Account</Link>
        </li>
        <li className="nav-item">
          <Link to="/logout" onClick={this.handleLogout}>Logout</Link>
        </li>
      </ul>
      /* jshint ignore:end */
    ) : (
      /* jshint ignore:start */
      <ul className="nav-list pull-right">
        <li className="nav-item">
          <Link to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="signup">Create Account</Link>
        </li>
      </ul>
      /* jshint ignore:end */
    );

    return (
      /* jshint ignore:start */
      <div>
        <div className="navbar">
          <div className="nav">
            <ul className="nav-list pull-left">
              <li className="nav-item"><Link to="root">Home</Link></li>
            </ul>
            {navLinks}
          </div>
        </div>
      </div>
      /* jshint ignore:end */
    );
  },

  handleLogout: function(e) {
    e.preventDefault();
    userActions.logout();
  },

  // Event handler for 'change' events coming from store mixins.
  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = NavBar;
