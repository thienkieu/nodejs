const express = require('express');

const dt = require('./myFirstModule');
const dbconfig = 'mongodb://thienkieu:Mlab0958588127@ds243963.mlab.com:43963/thienkieu';
const QueryBuilder = require('./queryBuilder').default;
const dbCommand = require('./dbComand').default;

const app = express();
const port = 8080;

app.get('/', function(req, res) {
    console.log(QueryBuilder);
    const queryBuilderInstancee = new QueryBuilder(dbconfig);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('The date and time are currently:' + dt.myDateTime());
    setTimeout(function(){
        const result = queryBuilderInstancee.selectCollection('customers').insertOne({name: 'Thien', address: 'Nui thanh'});
        console.log(result);
        console.log(await result.excute());
        res.end('Hellow World!');
        console.log('after timeout');
    }.bind(this), 5000);
});

app.get('/insertRecord', async function(req, res) {
    const i = await dbInstance.mongodbImplement;

    i.insertRecord(function(){
        res.end('insert 1 record');
    });
    
});

app.listen(port);
