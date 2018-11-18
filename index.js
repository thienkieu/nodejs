const express = require('express');
const dbCommand = require('./dbComand');
const bodyParser = require('body-parser');
const dt = require('./myFirstModule');

import QueryBuilder from './queryBuilder';
import handleAuthorization, { initPublicKey } from '/webApi/user/handleAuthorization';
import tokenGenerator, { initPrivateKey } from 'webApi/user/token';

const argv = require('yargs').argv

let privateKey = Buffer.from(argv.privateKey, 'base64');
initPrivateKey(privateKey.toString());

let publicKey = Buffer.from(argv.publicKey, 'base64');
initPublicKey(publicKey.toString());

const dbconfig = 'mongodb://thienkieu:Mlab0958588127@ds243963.mlab.com:43963/thienkieu';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.end('hellow');
});

app.post('/token', tokenGenerator);

import userRouter from 'webApi/user/router';
app.use('/user', handleAuthorization, userRouter);

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
