import messageConst from 'webSocket/messageConst';
import logger from 'infrastructure/logger/logger';

function socketHanlder(socketInstance){
    this.socket  = socketInstance;
    this.socket.authen = false;

    this.socket.on(messageConst.authentication, function(){
        this.socket.authen = true;
    }.bind(this));

    this.socket.on(messageConst.chat, function(msg){
        logger.log({level: 'info', message: msg});
        this.reply(`message from server for ${msg}`);
    }.bind(this));

    this.reply = function(msg){
        this.socket.emit(messageConst.chat, msg);
    }.bind(this);
    this.disconnectWithoutAuthentication  = function(){
        if (!this.socket.authen) {
            logger.log({level: 'info', message: `socket is reject with un authen ${this.socket.id}`});
            //this.socket.disconnect('unauthorized');
        }
    }.bind(this);

    setTimeout(this.disconnectWithoutAuthentication, 5000);
};

export default socketHanlder;
