const Order = require('../../../models/order')

function statusController(){
    return {
        update(req, res){
            const { orderId, status } = req.body;
            Order.updateOne({_id: orderId}, {status: status}, (err, data)=>{

                if(err){
                    req.flash('error', 'Something went wrong')
                    return res.redirect('/admin/orders') 
                }
                //event emitter
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated', {
                    id: orderId,
                    status: status
                })

                return res.redirect('/admin/orders')
            });

        }
    }
}

module.exports = statusController;