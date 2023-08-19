// var validUrl = require('valid-url');

// src/changedetect/diff-handler/src/tests/getAddedLink/index.js

function getAddedLink(messages) {

  const temp = messages
    .filter(m => m != '')
    .filter(s => s.search(/(into|added)/g) > -1)
    .map(m => {
      var url_regex = [
        /\((added|into)\) +"\/?(.+)\?.+/,
        /\((added|into)\) +"\/?((\/|\w|-)+)"?/,
      ]

      var output 
      for (var i =0; i< url_regex.length; i++ ){
        var r =m.match(url_regex[i])
        if (r) {
          output = r[2];
          break
        }
      }

      return output 
    });

  return temp;
}

module.exports = { getAddedLink };
