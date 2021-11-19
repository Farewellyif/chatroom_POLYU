

//get user id from html file
const chatForm=document.getElementById('chat-form');

const chatMessage=document.querySelector('.chat-messages');
//get username and room from URL, cause this appears in the URL
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
});

const roomName=document.getElementById('room-name');
const usersList=document.getElementById('users');


//to use the socket 
const socket=io();
socket.emit('joinroom',{username,room});

socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputUsers(users);
})

socket.on('message',message=>{
    console.log(message);
    outputMessage(message);
    

    chatMessage.scrollTop=chatMessage.scrollHeight;
    //this line to scroll. scroll top means the hidden above, init is 0. 
    //scrollheight means the total contain
    //by this way we can have the message in bottom
});
// client side, log the message, out put message

chatForm.addEventListener('submit', e=>{
    e.preventDefault();
    
   //get message text
    const msg=$(".emojionearea-editor").html();
    // emit message to server
    socket.emit('chatMessage',msg);
    //clear the text
    $(".emojionearea-editor").html('');


    $(".emojionearea-editor").focus();

    //focus means let user can keep type,becaus
    // we clear the message, keep cursor move
    
    
});

function outputMessage(message){
    //add a class of message,because the html use class 'message'
    const div=document.createElement('div');
    div.classList.add('message');
    if (message.username==username){
        div.innerHTML=`<p class="beta" align="right">${message.username}<span>${message.time}</span></p><p class="text" align="right">
        ${message.text}</p>`;
    //above is the type form of the message and use innerHTML to use string
        document.querySelector('.chat-messages').appendChild(div);}
    //find class and add the div html string}
    else if(message.username=='POLYU bot'){
        div.innerHTML=`<p class="theta" align="left">${message.username}<span>${message.time}</span></p><p class="text" align="left">
        ${message.text}</p>`;
    //above is the type form of the message and use innerHTML to use string
        document.querySelector('.chat-messages').appendChild(div);}
    //find class and add the div html string
    else{
        div.innerHTML=`<p class="meta" align="left">${message.username}<span>${message.time}</span></p><p class="text" align="left">
    ${message.text}</p>`;
//above is the type form of the message and use innerHTML to use string
        document.querySelector('.chat-messages').appendChild(div);}
//find class and add the div html string}}
};
//add room name to the html
function outputRoomName(room){
    roomName.innerText=room;

}
//add user name to the html
function outputUsers(users){
    usersList.innerHTML=`${users.map(user=> `<li>${user.username}</li>`).join('')}`;
}

//map excute each item in array and return  a new array with ( .....) function

//send image
$('#file').on('change', function () {
    //get upload file
    var file = this.files[0];
    //using html filereader 
    var fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = function () {
        const img=fr.result
        socket.emit('sendImage', img)
    }
})
//listen to receive image
socket.on('receiveImage',img=>{
    console.log(img);
    outputimg(img);
    chatMessage.scrollTop=chatMessage.scrollHeight;
})
function outputimg(img){
    //add a class of message,because the html use class 'message'
    const div=document.createElement('div');
    div.classList.add('message');
    if (img.username==username){
        div.innerHTML=`<p class="beta" align="right">${img.username}<span>${img.time}</span></p><p class="text" align="right">
        <img src="${img.text}" width="50%" height="50%"/></p>`;
    //above is the type form of the message and use innerHTML to use string
        document.querySelector('.chat-messages').appendChild(div);}
    //find class and add the div html string}
    else{
        div.innerHTML=`<p class="meta" align="left">${img.username}<span>${img.time}</span></p><p class="text" align="left">
    <img src="${img.text}"width="50%" height="50%"/></p>`;
//above is the type form of the message and use innerHTML to use string
        document.querySelector('.chat-messages').appendChild(div);}
//find class and add the div html string}}
};




