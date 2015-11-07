var express = require('express'),
    stylus  = require('stylus'),
    path    = require('path');


var app = express();

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'jade');
app.use(stylus.middleware({
    src     : path.join(__dirname, 'src', 'styles'),
    dest    : path.join(__dirname, 'public'),
    compile : function (str, path) { // optional, but recommended
         return stylus(str)
            .set('filename', path)
            .set('compress', true);
    }
}));
app.use(express.static(__dirname + '/public'))



/*--- Routes -*/
app.get('/', function (req, res) {
    res.render(
        'home',
        {
            title       : 'Home',
            description : 'coming soon, something made with ♥ and JavaScript =)',
            keywords    : 'museeks, music, music player, free, open-source'
        }
    )
})

app.listen(80);
