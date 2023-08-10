var StateMachine = require('javascript-state-machine');

var fsm = new StateMachine({
  init: 'solid',
  transitions: [
    { name: 'melt',     from: 'solid',  to: 'liquid' },
    { name: 'freeze',   from: 'liquid', to: 'solid'  },
    { name: 'vaporize', from: 'liquid', to: 'gas'    },
    { name: 'condense', from: 'gas',    to: 'liquid' }
  ],
  methods: {
    onMelt:     function() { console.log('I melted')    },
    onFreeze:   function() { console.log('I froze')     },
    onVaporize: function() { console.log('I vaporized') },
    onCondense: function() { console.log('I condensed') }
  }
});

console.log(fsm.state);
fsm.melt()
console.log(fsm.state);
fsm.vaporize()
console.log(fsm.state);

// NOTE: this is the fault example to show the state mahcine cannot transit
fsm.freeze()
console.log(fsm.state);
