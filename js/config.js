(function() {

  'use strict';

  angular
    .module('overwatchApp.config', [])
    .config(appConfig)
    .run(function($templateCache) {
      $templateCache.removeAll();
    });

  function appConfig() {}

})();
