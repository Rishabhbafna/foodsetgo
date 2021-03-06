const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')

function initRoutes(app){
    app.get('/', homeController().index);

    app.get('/cart', cartController().index);

    app.get('/login', guest, authController().login);

    app.get('/register', authController().register);

    app.post('/register', guest, authController().postRegister)

    app.post('/update-cart', cartController().update);

    app.post('/login', authController().postLogin);

    app.post('/logout', authController().logout);

    //customer routes

    app.get('/customer/orders', auth , orderController().index);

    app.post('/orders', auth, orderController().store);

    app.get('/customer/orders/:id', orderController().show);
    
    // Admin routes

    app.get('/admin/orders',admin, adminOrderController().index);

    app.post('/admin/order/status', admin, statusController().update);
}

module.exports = initRoutes;