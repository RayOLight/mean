(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['Notification', '$http', 'articleResolve', 'commentsResolve', 'CommentsService', 'Authentication'];

  function ArticlesController(Notification, $http, article, comments, CommentsActions, Authentication) {
    var vm = this;
    var commentsActions = new CommentsActions;

    vm.article = article;
    vm.authentication = Authentication;
    vm.posts = comments;
    vm.postText = '';
    vm.sendComment = sendComment;
    vm.deleteComment = removeComment;

    function sendComment() {

      return $http.put('/api/articles/' + article._id + '/comments', {
        content: vm.postText,
        profileImageUrl: Authentication.user.profileImageUrl,
        username: Authentication.user.username,
        articleId: article._id
      }).then(function successCallback(response) {
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Comment save successfully!' });
        vm.postText = '';
        vm.posts.unshift(response.data);
      }, function errorCallback(response) {
        vm.posts = '';
      });
    }

    function removeComment(comment, index) {
      commentsActions.deleteComment(comment).delete(successCallback, errorCallback);

      function successCallback(res) {
        vm.posts.splice(index, 1);
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Comment deleted successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Comment delete error!' });
      }
    }

  }
}());
