/**
 * Created by shalomeir on 15. 3. 16..
 */
'use strict';

var Reflux = require('reflux');

var uiActions = Reflux.createActions({
  //from component to component directly.
  'showOverlay':{},
  'hideOverlay':{}
});

module.exports = uiActions;

