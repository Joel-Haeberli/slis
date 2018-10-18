var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var list = [];

app.get('/list', function(request, response) {
    
    response.contentType('application/json');
    response.send(list);
});

app.post('/newitem', function(request, response) {
    
    var b = request.body;

    list.push(item = {
	    identifier:request.body.identifier,
        who:request.body.who,
        what:request.body.what,
        where:request.body.where,
        when:request.body.when,
        desc:request.body.desc
    });
    
    response.contentType('application/json');
    response.send(b);
});

app.put('/deleteitem/:identifier', function(request, response) {

    var identifier = request.params.identifier;
    var deleted = false;
    response.contentType('application/json');

    list.forEach(function(element) {
        if (element.identifier == identifier) {
            list.splice(list.indexOf(element), 1);
            deleted = true;
            response.send(answer = {answer:"deleted"});
        }
    });

    if (!deleted) {
        response.send(answer = {answer:"failed", identifier:identifier});
    }
});

app.listen(3000);