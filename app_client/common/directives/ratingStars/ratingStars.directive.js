(function () {

  angular
    .module('loc8rApp')
    .directive('ratingStars', ratingStars);
    // <rating-stars></rating-stars>, yeah I know, convert to lowercase letter and add a -
  function ratingStars () {
    return {
      restrict: 'EA',
      scope: {
        thisRating : '=rating'
      },
      templateUrl: '/common/directives/ratingStars/ratingStars.template.html'
    };
  }


})();