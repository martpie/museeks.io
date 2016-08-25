// Modules
var express  = require('express'),
    stylus   = require('stylus'),
    path     = require('path'),
    https    = require('https'),
    compress = require('compression'),
    force    = require('forcedomain'),
    minify   = require('express-minify');



// The app
var app = express();

// Views and view engine
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'pug');

// Stylus
app.use(stylus.middleware({
    src     : path.join(__dirname, 'src', 'styles'),
    dest    : path.join(__dirname, 'public', 'styles'),
    compile : function (str, path) {
        return stylus(str)
            .set('filename', path)
            .set('compress', true);
    }
}));

// Public pathes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'src', 'images')));
app.use('/scripts', express.static(path.join(__dirname, 'src', 'scripts')));

// Gzip
app.use(compress());

// Minify css and js
app.use(minify());

// forcedomain
app.use(force({
    hostname : 'museeks.io',
    type     : 'permanent'
}));



/*--- Routes -*/

app.get('/*', function(req, res, next) {
    if (req.headers.host.match(/^www/) !== null ) {
        res.redirect(301, 'http://' + req.headers.host.replace(/^www\./, '') + req.url);
    } else {
        next();
    }
})

app.get('/', function (req, res) {

    res.render(
        'home',
        {
            title       : 'A simple, clean and cross-platform music player',
            description : 'Museeks is a simple, clean and cross-platform music player, written with hipsters techs.',
            keywords    : 'museeks, music, music player, simple, free, minimalistic, lightweight, open-source, cross-platform'
        }
    );
})

app.listen(80);
