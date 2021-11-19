const { once } = require("nodemon");

const users=[];

//join user to chatroom
function userjoin(id,username,room){
    const user={id, username,room};

    users.push(user);
    return user;
}
//defina a function use for getting user name
function getCurrentUser(id){
    return users.find(user=>user.id===id);
}
//function for userleave
function userleave(id){
    const index=users.findIndex(user=>user.id===id);
    if (index!=-1){// if not find return -1
        //splice: delete the item in array and return it
        return users.splice(index,1)[0];//delete 1 item,return the item[0](because we can determin deletescout)
    };
}
//get room users
function getRoomUsers(room){
    return users.filter(user=>user.room===room);//=== not transfer before compare. == transfer before compare
}
module.exports={getCurrentUser,
    userjoin,userleave,getRoomUsers};