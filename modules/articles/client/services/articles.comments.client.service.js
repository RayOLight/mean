(function () {
  'use strict';

  angular
    .module('articles.services.comments')
    .factory('CommentsService', CommentsService);

  CommentsService.$inject = ['$resource', '$log'];

  function CommentsService($resource, $log) {
    return $resource('/api/articles/:articleId/comments', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      get: {
        isArray: true
      }
    });
  }
}());
