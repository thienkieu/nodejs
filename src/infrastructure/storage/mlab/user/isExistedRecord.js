const dbCommand = require('../dbComand');
import QueryBuilder from '../queryBuilder';

async function isExistedRecord(params){
    const queryBuilderInstancee = new QueryBuilder();
    const query = {
        name: params.name,
    };

    const deleteCommand = queryBuilderInstancee.selectCollection('users').find(query).toArray();
    const command = new dbCommand();
    const result = await command.execute(deleteCommand);
    console.log(result);
    return result;
}

export default isExistedRecord;
