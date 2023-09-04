module.exports = (router) =>{
  router.get('/helloworld', (req, res) => {
    res.send('helloworld from chatGPT/helloworld!');
  });
};
