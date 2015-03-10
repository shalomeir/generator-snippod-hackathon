'use strict';

var React = require('react'),
    router = require('./router');

/* jshint ignore:start */
router.run((Handler, state) => {
  React.render(<Handler {...state} />, document.getElementById('app-wrapper'));
});
/* jshint ignore:end */
