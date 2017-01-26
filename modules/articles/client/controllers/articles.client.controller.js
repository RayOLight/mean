(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['$http', 'articleResolve', 'commentsResolve', 'Authentication'];

  function ArticlesController($http, article, comments, Authentication) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    console.log(vm.authentication);
    vm.posts = comments;
    vm.postText = '';
    vm.sendComment = sendComment;

    function sendComment() {

      return $http.put('/api/articles/' + article._id + '/comments', {
        content: vm.postText,
        profileImageUrl: Authentication.user.profileImageUrl,
        username: Authentication.user.username,
        articleId: article._id
      }).then(function successCallback(response) {
        vm.postText = '';
        vm.posts[vm.posts.length] = response.data;
      }, function errorCallback(response) {
        vm.posts = '';
      });
    }

  }
}());
