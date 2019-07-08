const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/api/v1/auth/token', (req, res, next) => {
  if (req.body.email === 'a@a.com') {
    req.method = 'GET';
    req.url = req.baseUrl.concat('/token/1');
    next();
  } else {
    res.send(401, {
      "type": "error",
      "message": "Authentication failed.",
      "error": {
          "status": 401,
          "errorType": "unauthenticated"
      }
  });
  }
});

server.get('/api/v1/me', (req, res, next) => {
  req.method = 'GET';
  req.url = req.baseUrl.concat('/token/1');
  next();
});

server.get('/api/v1/tenants/1/securities', (req, res, next) => {
  req.method = 'GET';
  req.url = req.baseUrl.concat('/securities');
  next();
});

server.get('/api/v1/tenants/1/transactions', (req, res, next) => {
  req.method = 'GET';
  req.url = req.baseUrl.concat('/portfolio');
  next();
});
// server.use('/auth', router);
server.use(router);

server.listen(8898, () => {
  console.log('JSON Server is running on 8898');
});
