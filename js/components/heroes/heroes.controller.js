(function() {

  'use strict';

  angular
    .module('overwatchApp.components.heroes')
    .controller('heroController', heroController);

  heroController.$inject = ['HeroService'];

  function heroController(HeroService) {
    /*jshint validthis: true */
    HeroService.getAll('heroes').then(heroList => {
      const offenseHeroes = [];
      const defenseHeroes = [];
      const tankHeroes = [];
      const supportHeroes = [];
      heroList.data.forEach(hero => {
        switch (hero.role) {
          case 'Offense':
            offenseHeroes.push(hero);
            break;
          case 'Defense':
            defenseHeroes.push(hero);
            break;
          case 'Tank':
            tankHeroes.push(hero);
            break;
          case 'Support':
            supportHeroes.push(hero);
            break;
        }
      });
      this.offenseHeroes = offenseHeroes;
      this.defenseHeroes = defenseHeroes;
      this.tankHeroes = tankHeroes;
      this.supportHeroes = supportHeroes;
    });
  }

})();
