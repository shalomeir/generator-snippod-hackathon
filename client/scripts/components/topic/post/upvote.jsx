'use strict';

var React = require('react'),
    throttle = require('lodash/function/throttle'),
    uiActions =require('../../../actions/uiActions');

var Upvote = React.createClass({

  getInitialState: function() {
    return {
      upvoted: false
    };
  },

  componentDidMount: function() {
    var upvoted = this.props.user.profile.upvoted;
    this.setState({
      upvoted: upvoted[this.props.itemId]
    });
  },

  //componentWillReceiveProps: function(nextProps) {
  //  var upvoted = nextProps.user.profile.upvoted;
  //  this.setState({
  //    upvoted: upvoted[nextProps.itemId]
  //  });
  //},

  upvote: throttle(function(userId, itemId) {
    if (!this.props.user.loggedIn) {
      uiActions.showOverlay('login');
      return;
    }

    var upvoted = this.state.upvoted;
    var upvoteActions = this.props.upvoteActions;

    if (upvoted) {
      upvoteActions.downvote(userId, itemId);
    } else {
      upvoteActions.upvote(userId, itemId);
    }

    this.setState({
      upvoted: !upvoted
    });
  }, 300, { trailing: false }),

  render: function() {
    var cx = React.addons.classSet;

    var userId = this.props.user.uid;
    var itemId = this.props.itemId;
    var upvotes = this.props.upvotes;

    var upvoted = this.state.upvoted;
    var upvoteCx = cx({
      'upvote': true,
      'upvoted': upvoted
    });

    return (
      /* jshint ignore:start */
      <a className={ upvoteCx } onClick={ this.upvote.bind(this, userId, itemId) }>
        { upvotes } <i className="fa fa-arrow-up"></i>
      </a>
      /* jshint ignore:end */

    );
  }

});

module.exports = Upvote;
