var restify = require('restify');
var validate = require('jsonschema').validate;
var budgetSchema = require('./schemas/budget.json');

function respond(req, res, next) {
    console.log('in respond')
    res.send('hello ' + req.params.name);
    next();
}

function postRespond(req, res, next) {
    validationResult = validate(req.body, budgetSchema);

    if (!validationResult.valid)
    {
        console.log("Validation Error: " + validationResult.errors)
    }
    console.log("Request body: " + req.body);
    res.send("Got It!!!  Thanks!");
    return next();
}

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.get('/hello/:name', respond);
server.head('/hello/:name', respond);
server.post('/customer', postRespond);

/*
server.use(function(req, res, next) {
    console.log('in use');
    next();
});
*/

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
})