const Order = require('../../../models/order')
const moment = require('moment');

function orderController(){
    return {
        store(req, res){
            const { phone, address } = req.body;
            //validate request

            if(!phone|| !address){
                req.flash('error', 'All Fields Are Required')
                return res.redirect('/cart')
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address
            })

            order.save().then(result=>{
                Order.populate(result, {path: 'customerId'}, (err, placedOrder)=>{
                    req.flash('success', 'Order placed succesfully')
                    delete req.session.cart
                    // emit of socket
                    const eventEmitter = req.app.get('eventEmitter')
                    eventEmitter.emit('orderPlaced', placedOrder)
    
                    return res.redirect('/customer/orders')
                })
                
            }).catch(err=>{
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart')
            })

        },
        async index(req, res){
            const orders = await Order.find({
                customerId: req.user._id
            },
            null,
            {
                sort:{
                    'createdAt': -1
                }
            })
            res.header('Cache-Control', 'no-cache , private , no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
            res.render('customers/orders', {orders: orders, moment:moment})
        },
        async show(req, res){
            const id = req.params.id;
            const order = await Order.findById(id);
            //Authorize user
            if(req.user._id.toString() === order.customerId.toString()){
                return res.render('customers/singleOrder', {order:order})
            }
            return res.redirect('/')
        }
    }
}

module.exports = orderController;