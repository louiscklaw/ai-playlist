const { myLogger } = require('./myLogger');

async function getFromEvaluateTextContent(jobPage, title_selector) {
  var output = { result: '', error: "" };

  try {
    const o_jobTitle = await jobPage.evaluate(selector => {
      var output = { result: '', error: {} };
      try {
        const title = document.querySelector(selector).textContent;
        output = { ...output, result: title };
      } catch (error) {
        output = { ...output, error: JSON.stringify(error) };
      }
      return output;
    }, title_selector);

    output = { ...output, result: o_jobTitle.result };
    
    if (o_jobTitle.result == '') throw new Error('getFromEvaluateTextContent found empty');

  } catch (error) {
    myLogger.error('getFromEvaluateTextContent found empty');

    myLogger.error('"%o', {
      title_selector,
      url: jobPage.url(),
    });
    
    output = { ...output, error: JSON.stringify(error) };
  }
  return output;
}

module.exports = { getFromEvaluateTextContent };
