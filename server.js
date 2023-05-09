const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Set up authentication strategy
passport.use(new LocalStrategy((username, password, done) => {
  if (username === 'user' && password === 'password') {
    return done(null, { id: 1, username: 'user' });
  } else {
    return done(null, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, { id: 1, username: 'user' });
});

// Set up routes
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).send('Login successful');
});

app.delete('/logout', (req, res) => {
  req.logout();
  res.status(200).send('Logout successful');
});

app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.status(401).send('Unauthorized');
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});









// import React from "react";

// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
//   }
  
//   const express = require('express')
//   const app = express()
//   const bcrypt = require('bcrypt')
//   const passport = require('passport')
//   const flash = require('express-flash')
//   const session = require('express-session')
//   const methodOverride = require('method-override')
  
//   const initializePassport = require('./passport-config')
//   initializePassport(
//     passport,
//     email => users.find(user => user.email === email),
//     id => users.find(user => user.id === id)
//   )
  
//   const users = []
  
//   app.set('view-engine', 'ejs')
//   app.use(express.urlencoded({ extended: false }))
//   app.use(flash())
//   app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
//   }))
//   app.use(passport.initialize())
//   app.use(passport.session())
//   app.use(methodOverride('_method'))
  
//   app.get('/', checkAuthenticated, (req, res) => {
//     res.render('index.ejs', { name: req.user.name })
//   })
  
//   app.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('login.ejs')
//   })
  
//   app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   }))
  
//   app.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('register.ejs')
//   })
  
//   app.post('/register', checkNotAuthenticated, async (req, res) => {
//     try {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10)
//       users.push({
//         id: Date.now().toString(),
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//       })
//       res.redirect('/login')
//     } catch {
//       res.redirect('/register')
//     }
//   })
  
//   app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
//   })
  
//   function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next()
//     }
  
//     res.redirect('/login')
//   }
  
//   function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return res.redirect('/')
//     }
//     next()
//   }
  

//   export default initializePassport;




