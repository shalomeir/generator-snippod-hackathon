'use strict';

var React = require('react'),
    router = require('./router'),
    messagesActions = require('./actions/messages');

/* jshint ignore:start */
router.run((Handler, state) => {
  React.render(<Handler {...state} />, document.getElementById('app-wrapper'));
  // Clear out any existing messages
  messagesActions.setMessages({});
});
/* jshint ignore:end */
