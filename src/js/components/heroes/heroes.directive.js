(function() {

  'use strict';

  angular
    .module('overwatchApp.components.heroes')
    .directive('hero', HeroDirective);

  HeroDirective.$inject = [];

  function HeroDirective() {
    /*jshint validthis: true */
    return {
      restrict: 'A',
      scope: {},
      controller: heroController,
      controllerAs: heroCtrl,
      link: function (scope, element, attrs, controller, transcludeFn) {

      }

    };

  }

})();
