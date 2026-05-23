const Jasmine = require('jasmine');
const path = require('path');
const fs = require('fs');

const jasmine = new Jasmine({ projectBaseDir: __dirname });

const config = require(path.join(__dirname, 'jasmine.json'));
config.spec_dir = '.';
jasmine.loadConfig(config);


jasmine.execute();
