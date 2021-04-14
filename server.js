require('dotenv').config();

const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDBStore = require('connect-mongo')(session)
const passport = require('passport');
const Emitter = require('events')

const PORT = process.env.PORT || 3000;


// Database connections
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/foodsetgo';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Database Connected");
}).catch(err=>{
    console.log('Connection failed.....')
});


// session store
const mongoStore = new MongoDBStore({
    mongooseConnection: connection,
    collection: 'sessions'
});

// event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter);

//session config
app.use(session({
    secret: process.env.COOKIE_SECRET || 'thisisthesecret',
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: {
        maxAge: 1000*60*60*24 //24 hours
    }
}))

app.use(flash());

// passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize());
app.use(passport.session());


// Assets
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());


// global middleware
app.use((req, res, next)=>{
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})

// set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');


require('./routes/web')(app)

app.use((req, res)=>{
    res.status(404).render('errors/404')
})

const server = app.listen(PORT, ()=>{
    console.log(`Listening at ${PORT}`);
});


//socket

const io = require('socket.io')(server);

io.on('connection', (socket)=>{
    // join
    socket.on('join', (roomName)=>{
        socket.join(roomName)
    })
})

eventEmitter.on('orderUpdated', (data)=>{
    io.to(`order_${data.id}`).emit('orderUpdated', data);
})

eventEmitter.on('orderPlaced', (result)=>{
    io.to('adminRoom').emit('orderPlaced', result)
})