(function() {

  'use strict';

  angular
    .module('overwatchApp.components.heroes')
    .controller('heroController', heroController);

  heroController.$inject = ['HeroService'];

  function heroController(HeroService) {
    /*jshint validthis: true */
    HeroService.getAll('heroes').then(heroList => {
      this.heroes = heroList.data;
    });
  }

})();
