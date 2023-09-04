const { getJobInfo } = require("../../../../../state_machine/jobsdb/onReportJobComplete/getJobInfo");


(async () =>{
    await getJobInfo(undefined)
})()