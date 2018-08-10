var restify = require('restify');
var budgetController = require('./controllers/budgetController');
var transactionController = require('./controllers/transactionController');

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

// Budget routes
server.post('/budgets', budgetController.createBudget);
server.get('/budgets', budgetController.getAll);
server.get('/budgets/:name', budgetController.get);
server.del('/budgets/:name', budgetController.delete);
server.put('/budgets/:name', budgetController.put);

// transaction routes
server.post('/transactions', transactionController.createTransaction);
server.get('/transactions', transactionController.getAll);
server.get('/transactions/:id', transactionController.get);
server.del('/transactions/:id', transactionController.delete);
server.put('/transactions/:id', transactionController.put);


server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
})