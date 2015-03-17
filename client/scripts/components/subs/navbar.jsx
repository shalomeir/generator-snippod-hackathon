'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    userActions = require('../../actions/userActions'),
    uiActions = require('../../actions/uiActions'),
    Router = require('react-router'),
    { Link } = Router;


var NavBar = React.createClass({

  componentDidMount: function() {
    var pathString = this.props.path.toLowerCase().trim();
    if (pathString === String('/login')) {
      uiActions.showOverlay('login');
    } else if (pathString === String('/register')) {
      uiActions.showOverlay('register');
    }
  },

  render: function() {
    var user = this.props.user;
    var navLinks = user.loggedIn ? (
      /* jshint ignore:start */
      <ul className="nav-list pull-right">
        <li className="nav-item">
          Hello <Link to="user">{user.firstName ? user.firstName : user.email}</Link>
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
          <a onClick={ uiActions.showOverlay.bind(this,'login') }>Sign In</a>
        </li>
        <li className="nav-item">
          <a onClick={ uiActions.showOverlay.bind(this,'register') }>Register</a>
        </li>
      </ul>
      /* jshint ignore:end */
    );

    return (
      /* jshint ignore:start */
      <div className="navbar">
        <div className="nav">
          <ul className="nav-list pull-left">
            <li className="nav-item"><Link to="app">Home</Link></li>
          </ul>
          {navLinks}
        </div>
      </div>
      /* jshint ignore:end */
    );
  },

  handleLogout: function(e) {
    e.preventDefault();
    userActions.logout();
  }

});

module.exports = NavBar;
