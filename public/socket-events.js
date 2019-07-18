const socket = io.connect();
let textarea = document.getElementById('exampleFormControlTextarea1');
let name = document.getElementById('name');
let messages = document.getElementById('messages');
let online = document.getElementById('online');

function sendMess(event) {
    event.preventDefault();
    if(textarea.value.length !== 0 && textarea.value !== '' && name.value.length > 0 && name.value !== '') {
        socket.emit('sendMessage', {mess: textarea.value, name: name.value});
    }
    textarea.value = '';
}

socket.on('addMessage', data => {
    messages.innerHTML += "<div class='message-item'><b>" + data.name + " : </b>" + data.mess + "</div>";
});

socket.on('getPeopleOnline', length => {
    online.innerText = 'Online: ' + length;
});