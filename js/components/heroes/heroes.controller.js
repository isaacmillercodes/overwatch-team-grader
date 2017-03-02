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
    const offense = [];
    const defense = [];
    const tanks = [];
    const support = [];
    this.loaded = false;
    this.selectedHeroes = [];

    HeroService.getAll('heroes').then(heroList => {
      heroList.data.forEach(hero => {

        if (hero.role === 'Offense') {
          offense.push(hero);
        } else if (hero.role === 'Defense') {
          defense.push(hero);
        } else if (hero.role === 'Tank') {
          tanks.push(hero);
        } else {
          support.push(hero);
        }
      });

      offense.forEach(hero => {
        topRowHeroes.push(hero);
      });

      defense.forEach(hero => {
        if (topRowHeroes.length < 8) {
          topRowHeroes.push(hero);
        } else {
          middleRowHeroes.push(hero);
        }
      });

      tanks.forEach(hero => {
        if (middleRowHeroes.length < 8) {
          middleRowHeroes.push(hero);
        } else {
          bottomRowHeroes.push(hero);
        }
      });

      support.forEach(hero => {
        bottomRowHeroes.push(hero);
      });

      console.log(topRowHeroes);
      console.log(middleRowHeroes);
      console.log(bottomRowHeroes);
      this.topHeroes = topRowHeroes;
      this.middleHeroes = middleRowHeroes;
      this.bottomHeroes = bottomRowHeroes;
      this.loaded = true;

    });

    //helper functions

    this.selectHero = (hero) => {

      this.gradeMessage = '';

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

    this.removeHero = (hero) => {

      this.gradeMessage = '';
      this.gradedTeam = false;

      let matchingHero = this.selectedHeroes.filter(teamHero => {
        return hero.id === teamHero.id;
      })[0];

      let index = this.selectedHeroes.indexOf(matchingHero);
      return this.selectedHeroes.splice(index, 1);

    };

    this.removeMessage = () => {
      this.gradedTeam = !this.gradedTeam;
    };

    this.gradeTeam = (teamArray) => {
      const teamGrades = [0, 0, 0, 0];
      teamArray.forEach(hero => {
        if (hero.role === 'Offense') {
          if (hero.secondary === 'Self Healing') {
            teamGrades[3] = teamGrades[3] + 0.5;
            teamGrades[0]++;
          } else {
            teamGrades[0]++;
          }
        } else if (hero.role === 'Defense') {
          teamGrades[1]++;
        } else if (hero.role === 'Tank') {
          if (hero.secondary === 'Self Healing') {
            teamGrades[3] = teamGrades[3] + 0.5;
            teamGrades[2]++;
          } else {
            teamGrades[2]++;
          }
        } else {
          if (hero.secondary !== 'Passive Damage') {
            if (hero.secondary === 'Solo Healer') {
              teamGrades[3] = teamGrades[3] + 2;
            } else {
              teamGrades[3]++;
            }
          } else {
            teamGrades[1]++;
          }
        }
      });

      if (teamGrades[3] === 0) {
        this.gradeMessage = 'Heroes never die! Or at least they don\'t when they have a healer. Try adding a healing support like Mercy or Lúcio!' ;
        this.messageColor = '#b04a33';
      } else if (teamGrades[2] === 0) {
        this.gradeMessage = 'Get behind the shield of a tank like Reinhardt or D.Va to improve your team.' ;
        this.messageColor = '#b04a33';
      } else if (teamGrades[2] > 3) {
        this.gradeMessage = 'Tanks are important, but having this many might throw off your team balance.' ;
        this.messageColor = '#b04a33';
      } else if (teamGrades[3] > 5) {
        this.gradeMessage = 'You have a lot of support heroes. Change things up with an offense or defense hero.' ;
        this.messageColor = '#faa02e';
      } else if (teamGrades[3] === 1) {
        this.gradeMessage = 'You may want another support, or a self-healing hero like Roadhog or Soldier: 76.';
        this.messageColor = '#faa02e';
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

    };

  }

})();
