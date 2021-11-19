const express= require('express');
const path= require('path');
const http= require('http');
const socketio=require('socket.io');
const app =express();
const formatMessage=require('./utils/message');
//do not forget ./
const {userjoin,getCurrentUser,userleave,getRoomUsers}=require('./utils/user');

//create server we need to use
const server=http.createServer(app);

//use websocket for this server
const io= socketio(server);

const botname='POLYU bot';

//set static(means pictures or js or css files ) folder
app.use(express.static(path.join(__dirname,'public')));


io.on('connection',socket=>{
    socket.on('joinroom',({username,room})=>{
        //randomly use socketid, socket.join : let socket work on the specific room
        const user=userjoin(socket.id,username,room);
        socket.join(user.room);
        

        //emit to single user
        socket.emit('message',formatMessage(botname,'Welcome to POLYU chatroom'));

        // emit to all the user that connecting to the user.room
        //io.emit() emit to all the user 
        socket.broadcast.to(user.room).emit('message',formatMessage(botname,`${user.username} has joined the room`));
        //sent room user info
        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
        });
    
    });
    //use () when included in the io

    //when disconnect, delete it from array
    socket.on('disconnect', () =>{
        const user=userleave(socket.id);
        if(user){
            io.to(user.room).emit('message',formatMessage(botname,`${user.username} has left the room`));
        

            io.to(user.room).emit('roomUsers',{
                room:user.room,
                users:getRoomUsers(user.room)
            });
        }
    });
        

        
    
     
    
    
    //after clien emit, the server should use above code to receive. And emit to other client in the room
    socket.on('chatMessage',msg =>{
        const user=getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(user.username,msg));
    });
    //server get image
    socket.on('sendImage',img =>{
        const user=getCurrentUser(socket.id);
        io.to(user.room).emit('receiveImage',formatMessage(user.username,img));
    })
});
// use websocket to send message, and at this time we should add src to html file and also
const PORT=3000 || process.env.PORT;
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
//above line show that to include ${} in, you need to use
