const mongodbImplement = require('./mongodb');
class QueryBuilder{
    constructor(){
        this.queue= [];
    }
}

QueryBuilder.prototype.createCollection = function() {
    this.queue.push({F: 'createCollection', Params: params});
    return this;
}

QueryBuilder.prototype.selectCollection = function(params){
    this.queue.push({F: 'collection', Params: params});
    return this;
}

QueryBuilder.prototype.insertOne = function(params){
    this.queue.push({F: 'insertOne', Params: params});
    return this;
}

QueryBuilder.prototype.insertMany = function(params){
    this.queue.push({F: 'insertMany', Params: params});
    return this;
}

QueryBuilder.prototype.findOne = function(params){
    this.queue.push({F: 'findOne', Params: params});
    return this;
}

QueryBuilder.prototype.find = function(params){
    this.queue.push({F: 'find', Params: params});
    return this;
}

QueryBuilder.prototype.toArray = function(){
    this.queue.push({F: 'toArray'});
    return this;
}

QueryBuilder.prototype.sort = function(params){
    this.queue.push({F: 'sort', Params: params});
    return this;
}

QueryBuilder.prototype.deleteOne = function(params){
    this.queue.push({F: 'deleteOne', Params: params});
    return this;
}

QueryBuilder.prototype.deleteMany = function(params){
    this.queue.push({F: 'deleteMany', Params: params});
    return this;
}

QueryBuilder.prototype.updateOne = function(params){
    this.queue.push({F: 'updateOne', Params: params});
    return this;
}

QueryBuilder.prototype.updateMany = function(params){
    this.queue.push({F: 'updateMany', Params: params});
    return this;
}

QueryBuilder.prototype.limit = function(params){
    this.queue.push({F: 'limit', Params: params});
    return this;
}

QueryBuilder.prototype.join = function(params){
    this.queue.push({F: 'aggregate', Params: params});
    return this;
}

export default QueryBuilder;

