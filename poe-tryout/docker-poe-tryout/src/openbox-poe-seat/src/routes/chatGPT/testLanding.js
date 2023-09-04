module.exports = (router) =>{
  router.get('/testLanding', async (req, res) => {
    var result = await testLanding();
    res.send(result);
    // res.send('helloworld')
  })
};
