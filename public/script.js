const socket = io();

const chat = document.querySelector(".chat-form");
const Input = document.querySelector(".chat-input");
const chatWindow = document.querySelector(".chat-window");

chat.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("message.send", Input.value);
  Input.value = "";
});

const renderMessage = (message) => {
  const div = document.createElement("div");
  div.classList.add("render-message");
  div.innerText = message;
  chatWindow.appendChild(div);
};

socket.on("message.send", (message) => {
  renderMessage(message);
});

fetch("/messages").then((response) =>
  response.json().then((messages) => {
    for (const message of messages) {
      renderMessage(message);
    }
  })
);
