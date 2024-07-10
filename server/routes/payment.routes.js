// server/routes/payment.routes.js
const { processPayment } = require('../controllers/payment.controllers');
const { authenticate } = require('../middleware/authenticate');

module.exports = app => {
  app.post('/api/pay', authenticate, processPayment);
};
