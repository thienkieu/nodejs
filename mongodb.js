const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://thienkieu:Mlab0958588127@ds243963.mlab.com:43963/thienkieu';

function MongodbImplement() {
    /*this.mongodbImplement = await mongoClient.connect(url);

    this.insertRecord = async function(successFunction) {
        const myobj = { name: 'Company Inc', address: 'Highway 37'};
        const db = await this.mongodbInstance;

        db.collection('customers').insertOne(myobj, function(err, res) {
            if (err) throw err;
            successFunction();
            console.log('1 document instered');
        });
    }.bind(this);

    return this;*/
};

function MongodbImplement(url) {
    this.db = null;
    this.url = url;
    this.queue= [];
}

MongodbImplement.prototype.createCollection = function() {
    this.queue.push({F: this.createCollection, Params: params});
    return this;
}

MongodbImplement.prototype.find = function(params){
    this.queue.push({F: this.find, Params: params});
    return this;
}

MongodbImplement.prototype.query = function(params){
    this.queue.push({F: this.query, Params: params});
    return this;
}

MongodbImplement.prototype.sort = function(params){
    this.queue.push({F: this.sort, Params: params});
    return this;
}

MongodbImplement.prototype.delete = function(params){
    this.queue.push({F: this.delete, Params: params});
    return this;
}

MongodbImplement.prototype.update = function(params){
    this.queue.push({F: this.update, Params: params});
    return this;
}

MongodbImplement.prototype.limit = function(params){
    this.queue.push({F: this.limit, Params: params});
    return this;
}

MongodbImplement.prototype.join = function(params){
    this.queue.push({F: this.join, Params: params});
    return this;
}

module.exports = MongodbImplement;

