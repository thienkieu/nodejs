const dbCommand = require('../dbComand');
import QueryBuilder from '../queryBuilder';
const uuidv1 = require('uuid/v1');
import logger from 'infrastructure/logger/logger';

async function storeUser(user) {
    user.encrypeDataKey =  uuidv1;
    const queryBuilderInstancee = new QueryBuilder();
    const queryBuilder = queryBuilderInstancee.selectCollection('users').insertOne(user);
    const command = new dbCommand();
    const commandRespone = await command.execute(queryBuilderInstancee);
    logger.log({level: 'info', message: commandRespone});
    if (commandRespone.result.ok === 1) {
        return {
            isSuccess : true,
            insertId : commandRespone.insertedId,
        };
    } else {
        return {
            isSuccess : false,
            message : 'there is error in add new user',
        }
    }
}

export default storeUser;
