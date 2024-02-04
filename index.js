const sendBtn = document.querySelector('#send');
const messages = document.querySelector('#messages');
const messageInput = document.querySelector('#message-input');
const nameInput = document.querySelector('#input-name'); 

let ws;

function showMessage(data) {
  const listItem = document.createElement('li');

  const timestamp = new Date(data.timestamp);
  const formattedTime = timestamp.toLocaleTimeString(); 

  listItem.innerHTML = `<span class="message-time">${formattedTime}</span> ${data.name}: ${data.message}`;
  listItem.classList.add(data.sender === 'server' ? 'incoming' : 'outgoing');

  messages.appendChild(listItem);
  messages.scrollTop = messages.scrollHeight;
  messageInput.value = '';
}

function init() {
  if (ws) {
    ws.onerror = ws.onopen = ws.onclose = null;
    ws.close();
  }

  ws = new WebSocket('ws://localhost:6969');

  ws.onopen = () => console.log('Connection opened!');

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    showMessage(data);
  };

  ws.onclose = () => (ws = null);
  ws.onerror = (error) => console.error('WebSocket Error: ', error);
}

sendBtn.onclick = function () {
  if (!ws) {
    showMessage({ sender: 'client', message: 'No WebSocket connection :(' });
    return;
  }

  const data = {
    sender: 'client',
    name: nameInput.value,
    message: messageInput.value,
    timestamp: Date.now(),
  };

  ws.send(JSON.stringify(data));
  showMessage(data);
};

init();