const socket = io();

const nameContainer = document.getElementById("name-container");
const nameInput = document.getElementById("name-input");
const joinButton = document.getElementById("join-button");
const chatApp = document.getElementById("chat-app");
const userListContainer = document.getElementById("user-list-container");
const userList = document.getElementById("user-list");
const chatContainer = document.getElementById("chat-container");
const chatHeader = document.getElementById("chat-header");
const chatUsername = document.getElementById("chat-username");
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const typingIndicator = document.getElementById("typing-indicator");

let userName = "";
let currentRoom = "";

joinButton.addEventListener("click", () => {
   userName = nameInput.value.trim();
   if (userName) {
      nameContainer.style.display = "none";
      chatApp.style.display = "flex";
      socket.emit("join", userName);
   }
});

form.addEventListener("submit", function (e) {
   e.preventDefault();
   if (input.value) {
      socket.emit("chat message", { userName, message: input.value, room: currentRoom });
      input.value = "";
   }
});

input.addEventListener("keypress", () => {
   socket.emit("activity", userName);
});

userList.addEventListener("click", (e) => {
   if (e.target.tagName === "LI") {
      currentRoom = e.target.textContent;
      chatUsername.textContent = currentRoom;
      messages.innerHTML = ""; // Clear previous messages
      socket.emit("join room", currentRoom);
   }
});

socket.on("chat history", function (history) {
   history.forEach((data) => {
      const item = document.createElement("li");
      item.classList.add(data.userName === userName ? "self" : "other");
      item.textContent = `${data.userName}: ${data.message}`;
      messages.appendChild(item);
   });
   window.scrollTo(0, document.body.scrollHeight);
});

socket.on("chat message", function (data) {
   const item = document.createElement("li");
   item.classList.add(data.userName === userName ? "self" : "other");
   item.textContent = `${data.userName}: ${data.message}`;
   messages.appendChild(item);
   window.scrollTo(0, document.body.scrollHeight);
});

socket.on("user joined", function (userName) {
   const item = document.createElement("li");
   item.classList.add("system");
   item.textContent = `${userName} joined the chat`;
   messages.appendChild(item);
   window.scrollTo(0, document.body.scrollHeight);
});

socket.on("user list", function (users) {
   userList.innerHTML = "";
   users.forEach((user) => {
      const item = document.createElement("li");
      item.textContent = user === userName ? "You" : user;
      userList.appendChild(item);
   });
});

let activityTimer;
socket.on("activity", (name) => {
   if (name !== userName) {
      typingIndicator.textContent = `${name} is typing...`;
      typingIndicator.style.display = "block";
      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
         typingIndicator.style.display = "none";
      }, 2000);
   }
});
