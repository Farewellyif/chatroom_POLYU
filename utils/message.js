const moment=require('moment');
//use moment to get format

function formatMessage(username,text){
    return{
        username,
        text,
        time:moment().format(' '+'l'+' '+'LT')
    };

}
module.exports=formatMessage;