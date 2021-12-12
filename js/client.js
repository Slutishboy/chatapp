const socket = io('http://localhost:8000')


const form=document.getElementById('send-container')
const messageIn=document.getElementById('messageIn')
const messageContainer =document.querySelector(".container")
var audio =new Audio('notification.mp3')
const append =(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    // audio.play();



}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageIn.value;
    append('You: '+message,'right');
    socket.emit('send',message);
    messageIn.value='';
})
const name=prompt("Enter your name to join");
console.log(name);
socket.emit('new-user-joined', name);
socket.on('user-joined',data=>{
append(data+' joined the chat','right');
})

socket.on('recieve',data=>{
    audio.play();
    // let str=name+' joined the chat';
append(data.name+": "+data.message  ,'left');
})
socket.on('left',data=>{
// let str=name+' joined the chat';
audio.play(); 
append(data+" left the chat"  ,'left');
})


