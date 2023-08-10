const Finity = require('finity');

const { jobsdb_extractor_flow } = require('./lib');

const firstExtractor = Finity.start(jobsdb_extractor_flow);
const secondExtractor = Finity.start(jobsdb_extractor_flow);

firstExtractor.handle('task_submitted', {foo:'bar'});
secondExtractor.handle('task_submitted', {foo:'pa'});

// jobsdb_extractor_flow.handle('task_submitted', {foo:'helloworld'});
