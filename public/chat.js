const usernameFormRef = document.querySelector('.user-input-box');
const sendMessageFormRef = document.querySelector('.message-send-box');
const listMessagesRef = document.querySelector('.message-field');

function socketProcessing() {
  const socket = io.connect('http://localhost:3000');
  
  usernameFormRef.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    socket.emit('change_username', { username });
  });

  sendMessageFormRef.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = e.target.message.value;

    if (!message) return;
    socket.emit('new_message', { message });

    sendMessageFormRef.reset();
  });

  socket.on('new_message', (data) => {
    listMessagesRef.insertAdjacentHTML('beforeend',
      `<li class="message"><p>${data.username}</p><p>${data.message}</p></li>`);
    
    listMessagesRef.scrollTo({
      top: listMessagesRef.scrollHeight,
      behavior: 'smooth'
    });
  });
}

socketProcessing();
