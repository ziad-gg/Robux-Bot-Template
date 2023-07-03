const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const axios = require('axios');

const { PORT, UPTIME_API, PROJECT_LINK } = require('../src/Constants.js');
const client = require('../index');

const app = express();
const http = require('http').Server(app);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

require('./auth/passport')(passport);

const MongoStore = require('connect-mongo');

app.use(session({
  secret: 'foo',
  resave: false, 
  saveUninitialized: false, 
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'Session'
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/home.js'));
app.use('/api', require('./routes/api.js'));
app.use('/login', require('./routes/login.js'));
app.use('/dashboard', require('./routes/dashboard.js'));

app.get('/uptime', (req, res) => {
  res.status(200).send('OK');
});

app.use(function (req, res) {
  res.redirect('/');
});

http.on('listening', async () => {
  await axios({ url: UPTIME_API + '/add', method: 'POST', data: { url: PROJECT_LINK + '/uptime' } })
  .then(() => {
     console.log('Uptimed Successfully !');
   })
  .catch(() => {
     console.error('Uptimed Failed !');
   });
});

delete Object.prototype.extends;
http.listen(PORT);