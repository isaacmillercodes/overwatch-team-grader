(function() {

  'use strict';

  angular
    .module('overwatchApp.components.heroes')
    .service('HeroService', HeroService);

  HeroService.$inject = ['$http'];

  function HeroService($http) {
    /*jshint validthis: true */
    const baseUrl = 'https://overwatch-hero-api.herokuapp.com/api/v1/';

    this.getAll = (resource) => {
      return $http.get(`${baseUrl}${resource}`);
    };

    this.getSingle = (resource, id) => {
      return $http.get(`${baseUrl}${resource}/${id}`);
    };

  }

})();
