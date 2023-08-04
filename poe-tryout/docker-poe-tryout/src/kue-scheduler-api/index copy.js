'use strict'

var path = require('path')
var kue = require('kue-scheduler')

var Queue = kue.createQueue()

//processing jobs
Queue.process('now', 1, function (job, done) {
  console.log('\nProcessing job with id %s at %s', job.id, new Date())

  var myTimeout = setTimeout(() => {
    clearTimeout(myTimeout)
    done(null, {
      deliveredAt: new Date(),
    })
  }, 1000)
})

//listen on scheduler errors
Queue.on('schedule error', function (error) {
  //handle all scheduling errors here
  console.log(error)
})

//listen on success scheduling
Queue.on('schedule success', function (job) {
  //a highly recommended place to attach
  //job instance level events listeners

  job
    .on('complete', function (result) {
      console.log('Job completed with data ', result)
    })
    .on('failed attempt', function (errorMessage, doneAttempts) {
      console.log('Job failed')
    })
    .on('failed', function (errorMessage) {
      console.log('Job failed')
    })
    .on('progress', function (progress, data) {
      console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data)
    })
})

//prepare a job to perform
//dont save it
var job = Queue.createJob('now', {
  to: 'any',
})
  .attempts(3)
  .backoff({
    delay: 60000,
    type: 'fixed',
  })
  .priority('normal')

// schedule a job then
for (var i = 0; i < 10; i++) {
  Queue.now(job)
}

console.log('done')
