/**
 * Posts Routes
 */

'use strict';

var postsController = require('../controllers/posts'),
    auth = require('../auth');

var routes = function(app) {

  // Create
  app.post('/posts', postsController.createAccount);

  // Read
  app.get('/posts', auth.isAuthenticated, postsController.readAccount);

  // Update profile
  app.put('/posts', auth.isAuthenticated, postsController.updateProfile);
  app.patch('/posts', auth.isAuthenticated, postsController.updateProfile);


  // Delete
  app.delete('/posts', auth.isAuthenticated, postsController.deleteAccount);

};

module.exports = routes;
