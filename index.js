const express = require('express');

const dt = require('./myFirstModule');
const dbconfig = 'mongodb://thienkieu:Mlab0958588127@ds243963.mlab.com:43963/thienkieu';
const QueryBuilder = require('./queryBuilder').default;
const dbCommand = require('./dbComand').default;
const bodyParser = require('body-parser');
const fs   = require('fs');
const jwt  = require('jsonwebtoken');
const multer  = require('multer');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer());

app.get('/', function(req, res) {
    res.end('Hello');
});

app.post('/user', function(req, res) {
    const verifyOptions = {
        expiresIn:  "12h",
        algorithm:  ["RS256"]
    };

    token = req.headers.token;

    const publicKEY  = fs.readFileSync('./public.key', 'utf8');
    let isValid = false;
    try{
        const legit = jwt.verify(token, publicKEY, verifyOptions);
        isValid = true;
        console.log(legit);
        res.write('ok');
    } catch(ex) {
        console.log(ex);
    }


    res.end('done');
});

app.post('/token', async function(req, res){
    const identity = req.body.identity;
    const password = req.body.password;

    if (!identity || ! password) {
        res.json({
            isError: true,
            message: 'password or user is not correct',
        });
    }

    const privateKEY  = fs.readFileSync('./private.key', 'utf8');

    const payload = {
        email: identity,
    };

    const signOptions = {
        expiresIn:  "12h",
        algorithm:  "RS256"
    };

    var token = jwt.sign(payload, privateKEY, signOptions);
    res.end(token);
});

app.get('/add/:name/:address', async function(req, res) {
    const queryBuilderInstancee = new QueryBuilder();

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('The date and time are currently:' + dt.myDateTime());

    const data = {
        name: req.params.name,
        address: req.params.address,
    };

    const queryBuilder = queryBuilderInstancee.selectCollection('customers').insertOne(data);

    setTimeout(async function(){
        const command = new dbCommand(dbconfig);
        const result = await command.execute(queryBuilderInstancee);
        console.log(result.insertedCount);
    }, 500);

    res.end('Hellow World!');
    console.log('after timeout');

});

app.get('/delete', async function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Recieve delete request:' + dt.myDateTime() + '</h1>');

    const queryBuilderInstancee = new QueryBuilder();
    const deleteCommand = queryBuilderInstancee.selectCollection('customers').deleteMany({name: 'Thien'});

    setTimeout(async function(){
        const command = new dbCommand(dbconfig);
        const result = await command.execute(deleteCommand);
        res.write('<h1> Finished delete request:' + dt.myDateTime() + '</h1>');
        res.write(result.result.n + ' document(s) deleted');
        res.end('End');
    }, 500);

    res.write('<p>Waiting result</p>');
});

app.get('/search/:name', async function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Recieve delete request:' + dt.myDateTime() + '</h1>');

    const queryBuilderInstancee = new QueryBuilder();
    const query = {
        name: req.params.name,
    };

    const deleteCommand = queryBuilderInstancee.selectCollection('customers').find(query).toArray();

    setTimeout(async function(){
        const command = new dbCommand(dbconfig);
        const result = await command.execute(deleteCommand);
        console.log('myFirst after await');
        res.write('<h1> Finished delete request:' + dt.myDateTime() + '</h1>');
        res.write(JSON.stringify(result) + ' document(s) deleted');
        console.log(result);
        res.end('End');
    }, 500);

    res.write('<p>Waiting result</p>');
});

app.listen(port);
