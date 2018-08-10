var errs = require('restify-errors');
var validate = require('jsonschema').validate;
var budgetSchema = require('./../schemas/budget.json');

var budgets = [];

exports.getAll = function(req, res, next) {
    res.send(budgets);
    return next();
}

exports.createBudget = function(req, res, next) {
    var validationResult = validate(req.body, budgetSchema);

    if (!validationResult.valid)
    {
        console.log("Validation Error: " + validationResult.errors)
        return next(new errs.InvalidContentError(validationResult.errors.toString()));
    }

    var budget = req.body;

    if (budgets.findIndex(i => i.name === budget.name) !== -1) {
        console.log("Budget already exists");
        return next(new errs.ConflictError("Budget '" + budget.name + "' already exists."));
    }

    budgets[budgets.length] = req.body;

    res.send("Budget + '" + budget.name + "' created for $" + budget.amount);
    return next();
}

exports.get = function(req, res, next) {
    var budget = budgets.find(item => item.name === req.params.name);

    if (!budget) {
        var message = "Budget + '" + req.params.name + "' does not exist.";
        console.log(message);
        return next(new errs.NotFoundError(message));
    }

    res.send(budget);

    return next();
}

exports.put = function(req, res, next) {
    var validationResult = validate(req.body, budgetSchema);

    if (!validationResult.valid)
    {
        console.log("Validation Error: " + validationResult.errors)
        return next(new errs.InvalidContentError(validationResult.errors.toString()));
    }

    var index = budgets.findIndex(item => item.name === req.params.name);

    if (index === -1) {
        var message = "Budget + '" + req.params.name + "' does not exist.";
        console.log(message);
        return next(new errs.NotFoundError(message));
    }

    var budget = req.body;

    // if the name is changing make sure the new name doesn't exist
    if (budget.name !== budgets[index].name) {
        var existingBudget = budgets.find(item => item.name === budget.name);

        if (budget) {
            var message = "Budget + '" + req.params.name + "' already exist.";
            console.log(message);
            return next(new errs.ConflictError(message));
        }          
    }

    budgets[index] = req.body;
    res.send(budgets[index]);

    return next();
}

exports.delete = function(req, res, next) {
    var index = budgets.findIndex(item => item.name === req.params.name);

    if (index === -1) {
        var message = "Budget + '" + req.params.name + "' does not exist.";
        console.log(message);
        return next(new errs.NotFoundError(message));
    }

    budgets.splice(index, 1);
    res.send(204);
    return next();
}