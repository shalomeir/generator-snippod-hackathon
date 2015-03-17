/**
*   Topic Component Description
*/

'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    DocumentTitle = require('react-document-title'),
    Router = require('react-router'),

    //components
    TopicCard = require('./topicCard.jsx'),
    Posts = require('./Posts.jsx'),
    //actions
    postActions = require('../../actions/postActions');

var Topic = React.createClass({

  mixins: [
    Router.Navigation,
  ],

  statics: {
    willTransitionTo: function(transition, params) {
      postActions.listenToPosts(+params.pageNum || 1);
    },
    willTransitionFrom: function() {
      postActions.stopListeningToPosts();
    }
  },

  render: function() {
    return (
      /* jshint ignore:start */
      <DocumentTitle title='Topic title'>
        <div className="topic main-container content full-width">
          <TopicCard/>
          <h1>And posts list</h1>
          <Posts {...this.props} />
        </div>
      </DocumentTitle>
      /* jshint ignore:end */
    );
  }

});

module.exports = Topic;
