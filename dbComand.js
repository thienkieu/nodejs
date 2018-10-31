class dbCommand {
    async execute(queryBuilder){
        const channel = await mongodbImplement.connect(this.url);
        this.queue.forEach(async function(item){
            channel = await channel[item.F](item.Params);
        });
        
        return channel;
    }
}

exports.default = dbCommand;