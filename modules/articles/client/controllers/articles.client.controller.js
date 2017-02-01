(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['Notification', 'articleResolve', 'commentsResolve', 'Authentication'];

  function ArticlesController(Notification, article, comments, Authentication) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    comments.getComments(article._id)
      .then(function(res) {
        vm.posts = res;
      });
    vm.postText = '';
    vm.sendComment = sendComment;
    vm.deleteComment = removeComment;

    function sendComment() {

      comments.sendComment(article._id, {
        content: vm.postText,
        profileImageUrl: Authentication.user.profileImageUrl,
        username: Authentication.user.username
      }).then(successCallback)
        .catch(errorCallback);

      function successCallback(response) {
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Comment save successfully!' });
        vm.postText = '';
        vm.posts.unshift(response);
      }

      function errorCallback(response) {
        Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Comment send error!' });
      }
    }

    function removeComment(comment, index) {
      comments.deleteComment(comment)
        .then(successCallback)
        .catch(errorCallback);

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
