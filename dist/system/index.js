System.register([], function (_export) {
  _export('configure', configure);

  function configure(config) {
    config.globalResources('./modal');
    config.globalResources('./modal-header');
    config.globalResources('./modal-body');
    config.globalResources('./modal-footer');
    config.globalResources('./au-button');
  }

  return {
    setters: [],
    execute: function () {
      'use strict';
    }
  };
});