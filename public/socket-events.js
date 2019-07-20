const socket = io.connect();
let textarea = document.getElementById('exampleFormControlTextarea1');
let name = document.getElementById('name');
let messages = document.getElementById('messages');
let online = document.getElementById('online');


function sendMess(event) {
    event.preventDefault();

    if(textarea.value.length !== 0 && textarea.value !== '' && name.value.length > 0 && name.value !== '') {
        socket.emit('send message', {message: textarea.value, name: name.value});
    }

    textarea.value = '';
}

socket.on('add message', data => {
    messages.innerHTML += "<div class='message-item'><b>" + data.name + " : </b>" + data.message + "</div>";
});

socket.on('getPeopleOnline', length => {
    online.innerText = 'Online: ' + length;
});