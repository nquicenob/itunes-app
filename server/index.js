const cors_proxy = require('cors-anywhere');

const host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment constiable
const port = process.env.PORT || 8080;

const server = cors_proxy.createServer({
  removeHeaders: ['user-agent' ], // 'host',  'origin', 'referer'
  setHeaders: {
    'user-agent': 'Dummy Agent',
    'x-forwarded-for': '',
  },
});

server.on('request', (req) => {
  console.log(req.method);
  console.log(req.headers);
});

server.listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});
