const express = require('express');
const path = require('path');
const session = require('express-session');
const csurf = require('csurf');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);
const connectDB = require('./utils/db');

const User = require('./models/user.model');

const app = express();
const csrfProtection = csurf();

connectDB();

const store = new MongoDBStore({
	uri:
		'mongodb+srv://wjdevelopersolution:Lc1sTQWf6LYTiFce@cluster0.jnklj.mongodb.net/coqueterias',
	session: 'sessions',
});

app.use(
	session({
		secret: 'my secret',
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);
app.use(csrfProtection);

app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}
	User.findById(req.session.user._id)
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => {
			console.log(err);
		});
});

app.use((req, res, next) => {

	res.locals.isAuthenticated = req.session.isLoggedIn;
	res.locals.csrfToken = req.csrfToken();
	next();
})
app.use(flash());

app.set(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
	session({ secret: 'my secret', resave: false, saveUninitialized: false })
);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const shopRouters = require('./routes/shop.route');
const adminRouters = require('./routes/admin.route');
const authRouters = require('./routes/auth.route');

app.use(shopRouters);
app.use('/admin', adminRouters);
app.use(authRouters);

app.listen(4000, console.log('Server runnign on port 4000'));
