const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What\'s your username?');
appendMessage('You joined the chat');
socket.emit('new-user', name);

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name => {
  appendMessage(`User ${name} joined the chat`);
});

socket.on('user-disconnected', name => {
  appendMessage(`User ${name} disconnected`);
});

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message);
  messageInput.value = '';
})

function appendMessage(message){
  const messagaeElement = document.createElement('div');
  messagaeElement.innerText = message;
  messageContainer.append(messagaeElement);
}