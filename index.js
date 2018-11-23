const express = require('express');
const dbCommand = require('./dbComand');
const bodyParser = require('body-parser');
const dt = require('./myFirstModule');
const http = require('http');
const socketIO = require('socket.io');

import logger from 'infrastructure/logger/logger';
import QueryBuilder from './queryBuilder';
import handleAuthorization from '/webApi/user/handleAuthorization';
import tokenGenerator from 'webApi/user/token';
import { initDataPrivateKey, initDataPublicKey, initPrivateKey, initPublicKey } from './appConfig';

const argv = require('yargs').argv

let privateKey = Buffer.from(argv.privateKey, 'base64');
initPrivateKey(privateKey.toString());

let publicKey = Buffer.from(argv.publicKey, 'base64');
initPublicKey(publicKey.toString());

let privateKey1 = Buffer.from(argv.privateKey1, 'base64');
initDataPrivateKey(privateKey1.toString());

let publicKey1 = Buffer.from(argv.publicKey1, 'base64');
initDataPublicKey(publicKey1.toString());

const dbconfig = 'mongodb://thienkieu:Mlab0958588127@ds243963.mlab.com:43963/thienkieu';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.end('hellow');
});

app.post('/token', tokenGenerator);

import { userRouterWithAuthen, userRouterWithoutAuthen } from 'webApi/user/router';
app.use('/user', handleAuthorization, userRouterWithAuthen);
app.use('/nouser', userRouterWithoutAuthen);

import { coreRouterWithAuthen, coreRouterWithoutAuthen } from 'webApi/core/router';
app.use('/core', handleAuthorization, coreRouterWithAuthen);
app.use('/nousercore', coreRouterWithoutAuthen);

import { chatRouterWithAuthen, chatRouterWithoutAuthen } from 'webApi/chat/router';
app.use('/chat', chatRouterWithoutAuthen);

app.use('/static', express.static('./src/public'));
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


let httpServer = http.Server(app);
let io = socketIO(httpServer);
//app.listen(port);
import socketHanlder from 'webSocket/socketHanlder';

io.on('connection', function(socket){
    new socketHanlder(socket);
});
/*io.on('connection', function(socket){
    console.log(socket.id);
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
});
*/

httpServer.listen(port, function(){
    console.log('sdfsf');
});
