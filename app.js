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

    var options = {
        method: 'GET',
        host: 'api.github.com',
        path: '/repos/KeitIG/museeks/contributors',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Museeks-Website'
        }
    };

    https.get(options, function(call) {

        var body = '';
        var data = {
            title       : 'A simple, clean and cross-platform music player',
            description : 'Museeks is a simple, clean and cross-platform music player',
            keywords    : 'museeks, music, music player, simple, free, minimalistic, lightweight, open-source, cross-platform'
        };

        call.on('data', function(chunk) {

            body += chunk;
        });

        call.on('end', function() {

            res.render(
                'home',
                Object.assign(data, { contributors: JSON.parse(body) })
            );
        });


    }).on('error', function(e) {

        console.log(e);

        res.render(
            'home',
            data
        )
    });
})

app.listen(80);
