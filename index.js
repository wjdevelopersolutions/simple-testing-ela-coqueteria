const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); 
const connectDB = require('./utils/db');

const User = require('./models/user.model');

// Initialize express app
const app = express()

// Mongodb connection
connectDB()
    .then(() => {
        User.find()
            .then(user => {

                if (!user) {

                const user = new User({
                    Usr_Name: 'wilson',
                    Usr_Email: 'wjuma19@gmail.com',
                    Usr_Cart: {
                    Cart_Items: []
                    }
                });
            
                user.save();
                }
            });
    })

// Connect MongoDB Session
const store = new MongoDBStore({
    uri: 'mongodb+srv://wjdevelopersolution:Lc1sTQWf6LYTiFce@cluster0.jnklj.mongodb.net/coqueterias',
    session: 'sessions'
})

// Session
app.use(session({  
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false,
    store: store 
}));


app.use((req, res, next) => {

    User.findOne({ _id: "5fae8d026d78c61ea0d2d7b3" })
    .then(user => { 
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
    
});

app.use((req, res, next) => {

    // Dominio que tengan acceso (ej. 'http://example.com')
       res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
       res.setHeader('Access-Control-Allow-Headers', '*');
    
    next();
});

corsOpts = {
    origin: 'http://localhost:4000'
}

app.set(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const shopRouters = require('./routes/shop.route');
const adminRouters = require('./routes/admin.route');
const authRouters = require('./routes/auth.route');

app.use(cors(corsOpts), shopRouters);
app.use('/admin', cors(corsOpts), adminRouters);
app.use(authRouters);


app.listen(
    4000,
    console.log('Server runnign on port 4000')
)