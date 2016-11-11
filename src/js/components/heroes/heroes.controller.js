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

      // this.gradeMessage = 'Add ' + (5 - this.selectedHeroes.length) + ' more heroes to your team!';

      let matchingHero = this.selectedHeroes.filter(teamHero => {
        return hero.id === teamHero.id;
      })[0];

      if (!matchingHero) {
        if (this.selectedHeroes.length < 6) {
          return this.selectedHeroes.push(hero);
        }
      } else {
        let index = this.selectedHeroes.indexOf(matchingHero);
        return this.selectedHeroes.splice(index, 1);
      }

    };

    this.gradeTeam = (teamArray) => {
      const teamGrades = [0, 0, 0, 0];
      teamArray.forEach(hero => {
        if (hero.role === 'Offense') {
          teamGrades[0]++;
        } else if (hero.role === 'Defense') {
          teamGrades[1]++;
        } else if (hero.role === 'Tank') {
          teamGrades[2]++;
        } else {
          if (hero.secondary !== 'Passive Damage') {
            // if (hero.secondary === 'Solo Healer') {
              // teamGrades[3] = teamGrades[3] + 2;
            // } else {
              teamGrades[3]++;
            // }
          } else {
            teamGrades[1]++;
          }
        }
      });

      // switch (teamGrades) {
      //   case [0, 2, 2, 2]:
      //     this.gradeMessage = 'Look at this team! You\'re gonna do great.';
      //     this.messageColor = '#74ce39';
      //     break;
      //   case [2, 0, 2, 2]:
      //     this.gradeMessage = 'Look at this team! You\'re gonna do great.';
      //     this.messageColor = '#74ce39';
      //     break;
      //   case [1, 1, 2, 2]:
      //     this.gradeMessage = 'Look at this team! You\'re gonna do great.';
      //     this.messageColor = '#74ce39';
      //     break;
      // }

      console.log(teamGrades);

      if (teamGrades[3] === 0) {
        this.gradeMessage = 'Heroes never die! Or at least they don\'t when they have a healer. Try adding a healing support like Mercy or Lúcio!' ;
        this.messageColor = '#b04a33';
      } else if (teamGrades[2] === 0) {
        this.gradeMessage = 'Get behind the shield of a tank like Reinhardt or D.Va to improve your team.' ;
        this.messageColor = '#b04a33';
      } else if (teamGrades[2] > 3 || teamGrades[3] > 3) {
        this.gradeMessage = 'Overwatch is all about diversity. Try swapping in some offense or defense heroes!' ;
        this.messageColor = '#b04a33';
      } else if (teamGrades[0] > 3) {
        this.gradeMessage = 'Firepower is great, but this might be a bit much. Add more defense, tank, or support heroes.';
        this.messageColor = '#faa02e';
      } else if (teamGrades[1] > 3) {
        this.gradeMessage = 'The best offense is a good defense, but you could probably use a little more offense.';
        this.messageColor = '#faa02e';
      } else {
        this.gradeMessage = 'Look at this team! You\'re gonna do great.' ;
        this.messageColor = '#74ce39';
      }

      this.gradedTeam = !this.gradedTeam;

      // this.gradeMessage = 'Wow, such team!';
      // this.messageColor = '#74ce39';
      // this.messageColor = '#faa02e';
      // this.messageColor = '#b04a33';
    };

  }

})();
