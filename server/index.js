const express = require('express')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const { PORT, PROJECT_LINK } = require('../src/Constants.js')
const client = require('../index');

const app = express();
const http = require('http').Server(app);
// const io = require('socket.io')(http);
//const uptime = new (require('uptimer-web').UptimeBuilder)({ TYPE: 'Array', URLS: [PROJECT_LINK], TIMEOUT: 24e4 });

//uptime.startAll();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

require('./auth/passport')(passport);

app.use(
    session({
        secret: '4135231b7f33c66406cdb2a78420fa76',
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global
app.use(function (req, res, next) {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', require('./routes/home.js'));
app.use('/login', require('./routes/login.js'));

// Error Pages
app.use(function (req, res) {
    res.redirect('/')
});

http.listen(PORT)
