var StateMachine = require('javascript-state-machine');

var Matter = new StateMachine.factory({
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

var a = new Matter(),    //  <-- instances are constructed here
b = new Matter(),
c = new Matter();

b.melt();
c.melt();
c.vaporize();

a.state;    // solid
b.state;    // liquid
c.state;    // gas
