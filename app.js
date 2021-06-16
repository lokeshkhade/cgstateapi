var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const bodyParser = require('body-parser');
var app = express();
var svgCaptcha = require('svg-captcha');
express.json();
express.urlencoded({ extended: false });


var usersRouter = require('./routes/users');
const common = require('./routes/common');
var uploadRouter = require('./routes/upload');
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/', common);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);

app.get('/captcha', function(req, res) {
    var captcha = svgCaptcha.create({ ignoreChars: 'lI' });
    // req.session.captcha = captcha.text;
    res.json(captcha);
    // var captcha = svgCaptcha.create({ ignoreChars: 'lI' });
    // captcha.text = CryptoJS.AES.encrypt(JSON.stringify(captcha.text), 'svgcaptcha_key').toString();
    // res.json(captcha);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;