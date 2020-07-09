// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// Add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  chatroom.addChat(newChatForm.message.value.trim())
    .then(() => newChatForm.reset())
    .catch(err => console.log(err.message));
});

newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  // Reset the form
  newNameForm.reset();
  // Show then hide the update message
  updateMssg.innerHTML = `You name was updated to ${newName}`;
  setTimeout(() => updateMssg.innerHTML = ``, 3000);
});

// Update the chatrooms
rooms.addEventListener('click', e => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
  }
  chatroom.getChats(chat => chatUI.render(chat));
});

// Check localStorage for a name
const username = localStorage.username ? localStorage.username : 'anon';


// Class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// Get chats and render
chatroom.getChats(data => chatUI.render(data));
