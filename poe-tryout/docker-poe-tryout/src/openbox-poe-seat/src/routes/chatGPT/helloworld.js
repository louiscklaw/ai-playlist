module.exports = (router) =>{
  router.get('/helloworld', (req, res) => {
    res.send('openbox-poe-seat, Hello World!');
  });
};
