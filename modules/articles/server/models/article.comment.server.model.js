'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  profileImageURL: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: ''
  },
  articleId: {
    type: String
  }
});

mongoose.model('Comment', CommentSchema);
