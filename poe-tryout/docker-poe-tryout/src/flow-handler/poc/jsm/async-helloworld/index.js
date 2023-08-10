var StateMachine = require('javascript-state-machine');

var fsm = new StateMachine({

  init: 'menu',

  transitions: [
    { name: 'play', from: 'menu', to: 'game' },
    { name: 'quit', from: 'game', to: 'menu' }
  ],

  methods: {
    onEnterMenu: function() {
      return
    },

    onEnterGame: function() {
      return new Promise(function (res,rej) {
        console.log('hello enter game')
        res();
      })
    },
    onLeaveMenu: function() {
      return new Promise(function (res, rej) {
        console.log('hello leave menu')
        res();
      })
    },
    onLeaveGame: function() {
      return new Promise(function (res, rej) {
        console.log('blala')
        res();
      })
    }
  }

});

(async () =>{
  
  console.log(fsm.state);
  await fsm.play()
  console.log(fsm.state);

})()