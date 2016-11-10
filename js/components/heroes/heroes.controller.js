(function() {

  'use strict';

  angular
    .module('overwatchApp.components.heroes')
    .controller('heroController', heroController);

  heroController.$inject = ['HeroService'];

  function heroController(HeroService) {
    /*jshint validthis: true */
    // HeroService.getAll('heroes').then(heroList => {
    //   const offenseHeroes = [];
    //   const defenseHeroes = [];
    //   const tankHeroes = [];
    //   const supportHeroes = [];
    //   heroList.data.forEach(hero => {
    //     switch (hero.role) {
    //       case 'Offense':
    //         offenseHeroes.push(hero);
    //         break;
    //       case 'Defense':
    //         defenseHeroes.push(hero);
    //         break;
    //       case 'Tank':
    //         tankHeroes.push(hero);
    //         break;
    //       case 'Support':
    //         supportHeroes.push(hero);
    //         break;
    //     }
    //   });
    //   this.offenseHeroes = offenseHeroes;
    //   this.defenseHeroes = defenseHeroes;
    //   this.tankHeroes = tankHeroes;
    //   this.supportHeroes = supportHeroes;
    // });

    const topRowHeroes = [];
    const middleRowHeroes = [];
    const bottomRowHeroes = [];

    HeroService.getAll('heroes').then(heroList => {
      heroList.data.forEach(hero => {
        if (topRowHeroes.length < 8) {
          topRowHeroes.push(hero);
        } else if (middleRowHeroes.length < 8) {
          middleRowHeroes.push(hero);
        } else {
          bottomRowHeroes.push(hero);
        }
      });
      this.topHeroes = topRowHeroes;
      this.middleHeroes = middleRowHeroes;
      this.bottomHeroes = bottomRowHeroes;
    });
  }

})();
