# FoodSetGo

![homePage](https://raw.githubusercontent.com/Rishabhbafna/foodsetgo/main/FoodSetGo/home.PNG)  
  

[FoodSetGo](https://powerful-mesa-48253.herokuapp.com/) is an E-Commerce web-app for Food Delivery with Real-time updation of order status via Admin Support. 
There are user register and login pages. The login user can add items into the cart and order them by giving there Contact Information. 
After ordering, an order list page will appear with all the orders of the user. User can select any order from there and check out the live status of thr order.
There is a unique user named as admin i.e. the Food Store Manager who receives all the order in Real-Time and can change the status in real-time for customers.

![menuPage](https://raw.githubusercontent.com/Rishabhbafna/foodsetgo/main/FoodSetGo/menu.PNG)
![cartPage](https://raw.githubusercontent.com/Rishabhbafna/foodsetgo/main/FoodSetGo/cart.PNG)


This project was created using **Node.js, Express, MongoDB, Mongooose, and Tailwind CSS.** **Passport.js** was used to handle authentication.**Socket.io** is used to create and manage web sockets for real-time updation part. **Mongo Atlas** is used as cloud database for storing all the info of menus, users, orders etc. 


![orderPage](https://raw.githubusercontent.com/Rishabhbafna/foodsetgo/main/FoodSetGo/order.PNG)

This project is hosted online using **heroku**. Check it out => [FoodSetGo](https://powerful-mesa-48253.herokuapp.com/)

## Features
* Customer can added multiple items into the cart
* Order is placed and updated in realtime on admin window
* Admin can change the order status in realtime for the customer
* All the previous order list is available for the user

## Run it locally
1. Install [mongodb](https://www.mongodb.com/)

```
git clone https://github.com/Rishabhbafna/foodsetgo.git
cd foodsetgo
npm install
```

Create a .env file (or just export manually in the terminal) in the root of the project and add the following:  

```
DATABASEURL='<url>'
API_KEY=''<key>
API_SECRET='<secret>'
```

Run ```mongod``` in another terminal and ```node app.js``` in the terminal with the project.  

Then go to [localhost:3000](http://localhost:3000/).

