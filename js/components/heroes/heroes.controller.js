(function() {

  'use strict';

  angular
    .module('overwatchApp.components.heroes')
    .controller('heroController', heroController);

  heroController.$inject = ['HeroService', '$scope'];

  function heroController(HeroService, $scope) {
    /*jshint validthis: true */
    const topRowHeroes = [];
    const middleRowHeroes = [];
    const bottomRowHeroes = [];
    this.selectedHeroes = [];
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

    this.selectHero = (hero) => {
      let matchingHero = this.selectedHeroes.filter(teamHero => {
        return hero.id === teamHero.id;
      })[0];

      if (!matchingHero) {
        return this.selectedHeroes.push(hero);
      } else {
        let index = this.selectedHeroes.indexOf(matchingHero);
        return this.selectedHeroes.splice(index, 1);
      }
    };

  }

})();
