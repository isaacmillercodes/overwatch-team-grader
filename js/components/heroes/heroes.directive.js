(function() {

  'use strict';

  angular
    .module('overwatchApp.components.heroes')
    .directive('owHero', HeroDirective);

  HeroDirective.$inject = [];

  function HeroDirective() {
    /*jshint validthis: true */
    return {
      restrict: 'E',
      scope: {
        hero: '='
      },
      controller: 'heroController',
      templateUrl: './js/components/heroes/partials/hero.view.html'
    };

  }

})();
