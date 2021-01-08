const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
// const session = require('express-session');
const { db, User } = require('./db/db.js');
const passport = require('passport');

if (process.env.NODE_ENV === 'development') require('../secrets');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const dbStore = new SequelizeStore({ db });

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

//Static Middleware
app.use(express.static(path.join(__dirname, '../public')));

//Logging Middleware
app.use(morgan('dev'));

//Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// dbStore.sync();

// Session Middleware
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || 'Most unguarded secret ever',
//     store: dbStore,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

// Non-matching API route sends index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
