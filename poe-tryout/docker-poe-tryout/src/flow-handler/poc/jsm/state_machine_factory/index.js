'use strict';
const { jobsdbMachine} = require('./jobsdbMachine');

var jobsdb_machine = new jobsdbMachine({ url: 'http://www.google.com' });

console.log(jobsdb_machine.state);
jobsdb_machine.extractJobDetail();
console.log(jobsdb_machine.state);

jobsdb_machine.extractDone();
console.log(jobsdb_machine.state);

jobsdb_machine.summarize();
console.log(jobsdb_machine.state);

jobsdb_machine.summarizeDone();
console.log(jobsdb_machine.state);

jobsdb_machine.draftEmail();
console.log(jobsdb_machine.state);

jobsdb_machine.draftDone();
console.log(jobsdb_machine.state);
console.log(jobsdb_machine.context);
