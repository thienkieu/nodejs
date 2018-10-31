const MongoClient = require('mongodb').MongoClient; 
class dbCommand {
    constructor(url) {
        this.url = url;
    }

    async execute(queryBuilder){
        const db = await MongoClient.connect(this.url);
        let chanel = db.db('thienkieu');
        try{
            for(var i = 0; i< queryBuilder.queue.length; i++){
                const item = queryBuilder.queue[i];
                chanel = await chanel[item.F](item.Params);
                console.log('db-Command -- ' + item.F);
            }
            
        } catch(e) {
            console.log('db-Command --exception');
            console.log(e);
        } finally {
            console.log('db-Command -- close db');
            db.close();
        }

        
        return chanel;
    }
}

exports.default = dbCommand;