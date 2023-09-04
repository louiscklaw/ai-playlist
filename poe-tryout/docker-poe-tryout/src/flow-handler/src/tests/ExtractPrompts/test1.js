const ExtractPrompts = require("../../state_machine/jobsdb/onExtractDone/ExtractPrompts");

var prompt = new ExtractPrompts('company name','job title','job address','2023-01-01', 'job highlight', 'mark down text ?')

console.log(prompt.getSamplePreprompts())
console.log(prompt.getSampleQuestions())
