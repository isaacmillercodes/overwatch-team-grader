(function() {

  'use strict';

  angular
    .module('overwatchApp.components.heroes')
    .service('HeroService', HeroService);

  HeroService.$inject = ['$http'];

  function HeroService($http) {
    /*jshint validthis: true */
    const heroUrl = 'https://overwatch-hero-api.herokuapp.com/api/v1/heroes';
    // const heroUrl = 'http://localhost:8080/api/v1/heroes';

    this.getAll = () => {
      return $http.get(heroUrl);
    };

    // this.getSingle = (resource, id) => {
    //   return $http.get(`${baseUrl}${resource}/${id}`);
    // };

  }

})();
