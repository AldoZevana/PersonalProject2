const Users = require('../controllers/user.controllers');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
  app.post('/api/register', Users.register);
  app.post('/api/registerAdmin', Users.registerAdmin);
  app.post('/api/login', Users.login);
  app.get('/api/logout', Users.logout);
  app.put('/api/users/:id', authenticate, Users.updateUser);
  app.get('/api/checkAuth', Users.checkAuth);
};
