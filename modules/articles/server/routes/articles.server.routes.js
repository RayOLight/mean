'use strict';

/**
 * Module dependencies
 */
var articlesPolicy = require('../policies/articles.server.policy'),
  articles = require('../controllers/articles.server.controller'),
  comments = require('../controllers/articles.comments.server.controller.js');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/articles').all(articlesPolicy.isAllowed)
    .get(articles.list)
    .post(articles.create);

  // Single article routes
  app.route('/api/articles/:articleId').all(articlesPolicy.isAllowed)
    .get(articles.read)
    .put(articles.update)
    .delete(articles.delete);

  // Comments for single article routes
  app.route('/api/articles/:articleId/comment/:id').all(articlesPolicy.isAllowed)
    .get(comments.list)
    .put(comments.create)
    .delete(comments.delete);

  // Finish by binding the article middleware
  app.param('articleId', articles.articleByID);
};
