const Menu = require('../../models/menu');

function homeController(){
    return {
        async index (req, res){
            const items = await Menu.find({});
            // console.log(items);
            return res.render('home', {items});
        }
    }
}

module.exports = homeController;