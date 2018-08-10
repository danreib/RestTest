var errs = require('restify-errors');
var validate = require('jsonschema').validate;
var transactionSchema = require('./../schemas/transaction.json');

var transactions = [];

exports.getAll = function(req, res, next) {
    res.send(transactions);
    return next();
}

exports.createTransaction = function(req, res, next) {
    var validationResult = validate(req.body, transactionSchema);

    if (!validationResult.valid)
    {
        console.log("Validation Error: " + validationResult.errors)
        return next(new errs.InvalidContentError(validationResult.errors.toString()));
    }

    var transaction = req.body;

    if (transactions.findIndex(i => i.id === transaction.id) !== -1) {
        console.log("Transaction id already exists.");
        return next(new errs.ConflictError("Transaction '" + transaction.id + "' already exists."));
    }

    transactions[transactions.length] = req.body;

    res.send("Transaction for payee + '" + transaction.payee + "' in the amount of $" + transaction.amount + " has been added.");
    return next();
}

exports.get = function(req, res, next) {
    var transaction = transactions.find(item => item.id === req.params.id);

    if (!transaction) {
        var message = "Transaction '" + req.params.id + "' does not exist.";
        console.log(message);
        return next(new errs.NotFoundError(message));
    }

    res.send(transaction);

    return next();
}

exports.put = function(req, res, next) {
    var validationResult = validate(req.body, transactionSchema);

    if (!validationResult.valid)
    {
        console.log("Validation Error: " + validationResult.errors)
        return next(new errs.InvalidContentError(validationResult.errors.toString()));
    }

    var index = transactions.findIndex(item => item.id === req.params.id);

    if (index === -1) {
        var message = "Transaction + '" + req.params.id + "' does not exist.";
        console.log(message);
        return next(new errs.NotFoundError(message));
    }

    var transaction = req.body;

    // transaction id cannot be changed
    transaction.id = req.params.id;

    transactions[index] = transaction;
    res.send(transactions[index]);

    return next();
}

exports.delete = function(req, res, next) {
    var index = transactions.findIndex(item => item.id === req.params.id);

    if (index === -1) {
        var message = "Transaction + '" + req.params.id + "' does not exist.";
        console.log(message);
        return next(new errs.NotFoundError(message));
    }

    transactions.splice(index, 1);
    res.send(204);
    return next();
}