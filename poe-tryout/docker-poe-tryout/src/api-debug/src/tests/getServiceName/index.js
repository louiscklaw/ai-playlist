const http = require('http');

const options = {
  socketPath: '/run/docker.sock',
  path: `/containers/${process.env.HOSTNAME}/json`,
};

// Make a request to Docker API using Unix Socket
const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(data.Name);
    // Process the JSON response as needed
    const data_json = JSON.parse(data)
    console.log(data_json.Name)
  });
});

req.on('error', (err) => {
  console.error(err);
});

req.end();
