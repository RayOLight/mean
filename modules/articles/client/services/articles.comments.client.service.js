(function () {
  'use strict';

  angular
    .module('articles.services.comments')
    .factory('CommentsService', CommentsService);

  CommentsService.$inject = ['$resource', '$log'];

  function CommentsService($resource, $log) {
    var Comments = $resource('/api/articles/:articleId/comments', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      get: {
        isArray: true
      }
    });

    angular.extend(Comments.prototype, {
      deleteComment: function (comment) {
        return $resource('/api/articles/' + comment.articleId + '/comment/' + comment._id);
      }
    });

    return Comments;

  }
}());
