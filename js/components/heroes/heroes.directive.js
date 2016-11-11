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
      // controllerAs: 'heroCtrl',
      templateUrl: './js/components/heroes/partials/hero.view.html',
      link: function (scope, element, attrs, heroCtrl, transcludeFn) {
        // element.on('click', () => {
        //   heroCtrl.selectedHeroes.push(scope.hero);
        //   console.log(heroCtrl.selectedHeroes);
        // });
      }

    };

  }

})();
