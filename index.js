const express = require('express');
const path = require('path');


const app = express()


app.set(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')))

const indexRouters = require('./routes/index');
const adminRouters = require('./routes/admin');

app.use(indexRouters);
app.use('/admin', adminRouters);


app.listen(
    4000,
    console.log('Server runnign on port 4000')
)