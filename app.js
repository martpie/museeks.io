// Modules
var express  = require('express'),
    stylus   = require('stylus'),
    path     = require('path'),
    compress = require('compression'),
    force    = require('forcedomain'),
    minify   = require('express-minify');



// The app
var app = express();

// Views and view engine
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'jade');

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
            title       : 'Home',
            description : 'Museeks is a free, lightweight and cross-platform music player',
            keywords    : 'museeks, music, music player, free, lightweight, open-source, cross-platform'
        }
    )
})

app.listen(4000);
