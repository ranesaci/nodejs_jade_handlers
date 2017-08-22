var express = require('express'),
routes = require('./routes'),
http = require('http'),
path = require('path'),
mongoskin = require('mongoskin'),
dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/sachindb',
db = mongoskin.db(dbUrl, {safe: true}),
collections = {
articles: db.collection('articles'),
users: db.collection('users')
};

var session = require('express-session'),
logger = require('morgan'),
errorHandler = require('errorhandler'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
methodOverride = require('method-override');

var app = express();
app.locals.appTitle = 'Sachin Rane\'s blog.';

app.use(function(req, res, next) {
if (!collections.articles || ! collections.users) return next(new Error('No collections.'))
req.collections = collections;
return next();
});


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/*The configs now include more Connect/Express middleware, the meanings of most of which is to log requests,
parse JSON input, use Stylus and server static conten*/

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
app.use(errorHandler());
}


//PAGES&ROUTES
app.get('/', routes.index);
app.get('/login', routes.user.login);
app.post('/login', routes.user.authenticate);
app.get('/logout', routes.user.logout);
app.get('/admin', routes.article.admin);
app.get('/post', routes.article.post);
app.post('/post', routes.article.postArticle);
app.get('/articles/:slug', routes.article.show);

//REST API ROUTES
app.get('/api/articles', routes.article.list)
app.post('/api/articles', routes.article.add);
app.put('/api/articles/:id', routes.article.edit);
app.del('/api/articles/:id', routes.article.del);

//In the end, we have a 404 catch-all route.
app.all('*', function(req, res) {
res.send(404);
});

var server = http.createServer(app);
var server = http.createServer(app);
var boot = function () {
server.listen(app.get('port'), function(){
console.info('Express server listening on localhost:' + app.get('port'));
});
}
var shutdown = function() {
server.close();
}

if (require.main === module) {
boot();
}
else {
console.info('Running app as a module')
exports.boot = boot;
exports.shutdown = shutdown;
exports.port = app.get('port');
}



