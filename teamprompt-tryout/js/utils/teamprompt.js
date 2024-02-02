const axios = require('axios');

const AUTH_BEARER =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvdWlzbGFicy5oaUBnbWFpbC5jb20iLCJkaXNwbGF5TmFtZSI6ImxvdWlzIGxhdyIsInJvbGUiOiJzdGFmZiIsInVzZXJJZCI6ImIyNTg4NjY3LTI4OWUtNDMyNy1iOGJhLTVkYmE3ZWZkZWU1ZSIsImNyZWF0ZWRBdCI6IjIwMjQtMDItMDJUMTA6NDQ6NTcuMzk2WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDItMDJUMTA6NDQ6NTcuMzk2WiIsImlhdCI6MTcwNjg3MDY5N30.n_OxLrq0FBYMS1jEL-R8CTm6W3k9M0Hww7MJD1toqGA';

const headers = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0',
  Accept: 'text/event-stream',
  'Accept-Language': 'en-US,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate, br',
  Referer: 'https://teamprompt.ai/',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${AUTH_BEARER}`,
  Origin: 'https://teamprompt.ai',
  Connection: 'keep-alive',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'cross-site',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
  TE: 'trailers',
};

const prompt_create = prompt => {
  return {
    prompt,
    stream: false,
  };
};

async function ask(question) {
  return axios
    .post('https://gptapi.apoidea.ai/v1/conversation/conversations', prompt_create(question), { headers })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
}

module.exports = ask;
