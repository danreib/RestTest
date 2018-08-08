var restify = require('restify');

function respond(req, res, next) {
    console.log('in respond')
    res.send('hello ' + req.params.name);
    next();
}

var server = restify.createServer();

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.use(function(req, res, next) {
    console.log('in use');
    next();
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
})