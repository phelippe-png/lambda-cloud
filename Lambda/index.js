const https = require('https');

exports.handler = (event, context, callback) => {
  const options = {
    hostname: 'fortnite-api.com',
    path: '/v2/shop/br',
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const response = {
        statusCode: 200,
        body: data
      };

      callback(null, response);
    });
  });

  req.on('error', (error) => {
    console.error(error);

    const response = {
      statusCode: 500,
      body: JSON.stringify({
        error_message: 'Houve um erro ao consumir a API!'
      })
    };

    callback(null, response);
  });

  req.end();
};