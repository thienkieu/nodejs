const MongoClient = require('mongodb').MongoClient;
class dbCommand {
    constructor(url) {
        if (url) {
            this.url = url;
        } else {
            this.url = 'mongodb://thienkieu:Mlab0958588127@ds243963.mlab.com:43963/thienkieu';
        }
    }

    async execute(queryBuilder){
        const db = await MongoClient.connect(this.url, { useNewUrlParser: true });
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

module.exports = dbCommand;
