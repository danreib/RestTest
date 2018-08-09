var validate = require('jsonschema').validate;
var budgetSchema = require('./schemas/budget.json');

exports.createBudget = function(req, resp, next) {
    var validationResult = validate(req.body, budgetSchema);

    if (!validationResult.valid)
    {
        console.log("Validation Error: " + validationResult.errors)
    }
    console.log("Request body: " + req.body);
    res.send("Got It!!!  Thanks!");
    return next();
}