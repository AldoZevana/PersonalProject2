// server/routes/order.routes.js
const { createOrder, getOrderStatus, getAllOrders, getAllOrdersForAdmin } = require('../controllers/order.controllers');
const { authenticate } = require('../middleware/authenticate');
const { admin } = require('../middleware/admin');

module.exports = app => {
  app.post('/api/orders', authenticate, createOrder);
  app.get('/api/orders/:id/status', authenticate, getOrderStatus);
  app.get('/api/orders', authenticate, getAllOrders);
  app.get('/api/admin/orders', authenticate, admin, getAllOrdersForAdmin);
};
