'use strict';

var React = require('react'),
    router = require('./router'),
    messagesActions = require('./actions/messages');

var attachFastClick = require('fastclick');


/* jshint ignore:start */
router.run((Handler, state) => {
  React.render(<Handler {...state} />, document.getElementById('app-wrapper'));
  // Clear out any existing messages
  messagesActions.setMessages({});
});
/* jshint ignore:end */

// fastclick eliminates 300ms click delay on mobile
attachFastClick(document.body);
