'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Comment = mongoose.model('Comment'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a comment
 */
exports.create = function (req, res) {
  var comment = new Comment(req.body);
  console.log(req.body);
  comment.articleId = req.params.articleId;

  comment.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comment);
    }
  });
};

/**
 * Delete a comment
 */
exports.delete = function (req, res) {
  var comment = new Comment({ _id: req.params.id });

  comment.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comment);
    }
  });
};

/**
 * List of Comments
 */
exports.list = function (req, res) {
  Comment.find({ articleId: req.params.articleId }).sort('-created').exec(function (err, comments) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comments);
    }
  });
};
