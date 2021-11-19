chatForm.addEventListener('submit', e=>{
    e.preventDefault();
   //get message text
    const msg=e.target.elements.msg.value;
    // emit message to server
    socket.emit('chatMessage',msg);
    //clear the text
    $(".emojionearea-editor").html('');


    $(".emojionearea-editor").focus();

    //focus means let user can keep type,because we clear the message, keep cursor move
    
    
});

{
    events:{
      keydown:function(editor,event){
        if (event.keyCode==13){
          $("#btn1").click();

        }
        else{continue;}
      }
    }
  }