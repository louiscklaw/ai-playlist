'use strict';
const Finity = require('finity');

const { E_EXTRACT_JOB_DETAIL, } = require('./states');
const { jobsdb_extractor_flow } = require('./jobsdb_extractor_flow');

const firstExtractor = Finity.start(jobsdb_extractor_flow);
// const secondExtractor = Finity.start(jobsdb_extractor_flow);

firstExtractor.handle(E_EXTRACT_JOB_DETAIL, {foo:'bar', delay: 1, retry:3});
// secondExtractor.handle(E_EXTRACT_JOB_DETAIL, {foo:'pa'});

// jobsdb_extractor_flow.handle('task_submitted', {foo:'helloworld'});
