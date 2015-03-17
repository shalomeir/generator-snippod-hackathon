/**
 * Created by shalomeir on 15. 3. 17..
 */
'use strict';

var Reflux = require('reflux'),
    request = require('superagent'),
    { getToken, setToken } = require('../utils/tokenControl');

var postActions = Reflux.createActions({
  // post actions
  'upvotePost':{},
  'downvotePost':{},
  'submitPost':{},
  'deletePost':{},
  'setSortBy':{},
  // comment actions
  'upvoteComment': {},
  'downvoteComment': {},
  'updateCommentCount': {},
  'addComment': {},
  'deleteComment': {},

  // API actions
  'listenToProfile': {},
  'listenToPost': {},
  'listenToPosts': {asyncResult: true},
  'stopListeningToProfile': {},
  'stopListeningToPosts': {},
  'stopListeningToPost': {}
});


/* Auth Method
 ===============================*/

var _RequestGet = function (action, callback) {
  var token = getToken();

  request
    .get(action)
    .type('json')
    .set({
      'authorization': 'Bearer ' + token
    })
    .end(function(res) {
      if (res.ok) {
        if (res.body && res.body.postsSnapshot) {
          var postsSnapshot = res.body.postsSnapshot;
          postActions.listenToPosts.completed(postsSnapshot);
        }
        else {
          postActions.listenToPosts.completed({});
        }

        if (callback && callback.success) {
          callback.success(res);
        }
      }
      else {
        if (callback && callback.error) {
          callback.error(res);
        }
        // 임시로 만들어 보내보기.
        postActions.listenToPosts.completed([
          {
            'creator':'seonggyu',
            'creatorUID':'uid00001',
            'time':1426483141980,
            'title':'helwel akjldkjalsj',
            'upvotes':1,
            'url':'http://www.naver.com',
            'key':'00023'
          },
          {
            'creator':'shalskdj',
            'creatorUID':'uid00002',
            'time':1426483141983,
            'title':'til daskjl',
            'upvotes':11,
            'url':'http://www.shalomeir.com',
            'key':'00021'
          }
        ]);

      }
      if (callback && callback.complete) {
        callback.complete(res);
      }
    });
};



/* Post Actions
 ===============================*/

postActions.submitPost.listen(function(post) {
  //var newPostRef = postsRef.push(post, function(error) {
  //  //if (error !== null) {
  //  //  actions.postError(error.code);
  //  //} else {
  //  //  actions.goToPost(newPostRef.key());
  //  //}
  //});
});

postActions.deletePost.listen(function(postId) {
  //postsRef.child(postId).remove();
});

postActions.upvotePost.listen(function(userId, postId) {
  //postsRef.child(postId).child('upvotes').transaction(function(curr) {
  //  return (curr || 0) + 1;
  //}, function(error, success) {
  //  if (success) {
  //    // register upvote in user's profile
  //    usersRef.child(userId).child('upvoted').child(postId).set(true);
  //  }
  //});
});

postActions.downvotePost.listen(function(userId, postId) {
  //postsRef.child(postId).child('upvotes').transaction(function(curr) {
  //  return curr - 1;
  //}, function(error, success) {
  //  if (success) {
  //    // register upvote in user's profile
  //    usersRef.child(userId).child('upvoted').child(postId).remove();
  //  }
  //});
});


/* Comment Actions
 ===============================*/

postActions.updateCommentCount.preEmit = function(postId, n) {
  // updates comment count on post
  //postsRef.child(postId).child('commentCount').transaction(function(curr) {
  //  return curr + n;
  //});
};

postActions.upvoteComment.preEmit = function(userId, commentId) {
  //commentsRef.child(commentId).child('upvotes').transaction(function(curr) {
  //  return (curr || 0) + 1;
  //}, function(error, success) {
  //  if (success) {
  //    // register upvote in user's profile
  //    usersRef.child(userId).child('upvoted').child(commentId).set(true);
  //  }
  //});
};

postActions.downvoteComment.preEmit = function(userId, commentId) {
  //commentsRef.child(commentId).child('upvotes').transaction(function(curr) {
  //  return curr - 1;
  //}, function(error, success) {
  //  if (success) {
  //    // register upvote in user's profile
  //    usersRef.child(userId).child('upvoted').child(commentId).remove();
  //  }
  //});
};

postActions.addComment.preEmit = function(comment) {
  //commentsRef.push(comment, function(error) {
  //  if (error === null) {
  //    actions.updateCommentCount(comment.postId, 1);
  //  }
  //});
};

postActions.deleteComment.preEmit = function(commentId, postId) {
  //commentsRef.child(commentId).remove(function(error) {
  //  if (error === null) {
  //    actions.updateCommentCount(postId, -1);
  //  }
  //});
};


/* API Actions
 ===============================*/
postActions.listenToPosts.listen(function(pageNum) {
  _RequestGet('/posts/'+pageNum);
});


module.exports = postActions;
