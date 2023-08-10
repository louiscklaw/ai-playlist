const express = require('express');

// const { mySleep } = require('../utils/mySleep');
const { jobsdbMachine } = require('../state_machine/jobsdbMachine');

const router = express.Router();

router.post('/', async (req, res) => {
  const { num, instance, jobsdb_job_url } = req.body;
  res.send({ state: 'scheduled', url: jobsdb_job_url });

  var jobsdb_machine = new jobsdbMachine({ 
    instance,
    job_id:'', 
    jobsdb_job_url 
  });
  console.log(jobsdb_machine.state, jobsdb_machine.context.instance);

  try {
    var extraction_result = await jobsdb_machine.extractJobDetail();
    console.log(extraction_result)
    await jobsdb_machine.extractDone();
  } catch (error) {
    console.log(error)
  }
    
});

module.exports = router;
