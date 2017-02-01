(function () {
  'use strict';

  angular
    .module('articles.services.comments')
    .factory('CommentsService', CommentsService);

  CommentsService.$inject = ['$resource', '$log'];

  function CommentsService($resource, $log) {
    var Comments = $resource('/api/articles/:articleId/comment/:commentId', {
      articleId: '@articleId',
      commentId: 'all'
    }, {
      send: {
        method: 'PUT'
      },
      get: {
        isArray: true
      }
    });

    angular.extend(Comments.prototype, {
      deleteComment: function (comment) {
        return handlingDelete(this, comment);
      },
      getComments: function (articleId) {
        return handlingGet(this, articleId);
      },
      sendComment: function (articleId, data) {
        return handlingSend(this, articleId, data);
      }
    });

    return Comments;

    function handlingDelete(comment, props) {
      return comment.constructor
        .delete({ articleId: props.articleId, commentId: props._id }, onSuccess, onError).$promise;
    }

    function handlingGet(comments, articleId) {
      return comments.constructor.get({ articleId: articleId }, onSuccess, onError).$promise;
    }

    function handlingSend(comments, articleId, data) {
      return comments.constructor
        .send({ articleId: articleId, commentId: 'add' }, data, onSuccess, onError).$promise;
    }

    function onSuccess(article) {
      // Any required internal processing from inside the service, goes here.
    }

    // Handle error response
    function onError(errorResponse) {
      var error = errorResponse.data;
      // Handle error internally
      handleError(error);
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
