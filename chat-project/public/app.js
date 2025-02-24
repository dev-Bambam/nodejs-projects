const socket = io();
const form = document.getElementById("form");
const msgInput = document.getElementById("input");
const messages = document.getElementById("messages");

function sendMessage(e) {
   e.preventDefault();
   if (msgInput.value) {
      socket.emit("message", msgInput.value);
      msgInput.value = "";
   }
   msgInput.focus();
}

form.addEventListener("submit", sendMessage);

socket.on("message", (msg) => {
   const item = document.createElement("li");
   item.classList.add("self");
   item.textContent = msg;
   messages.appendChild(item);
   window.scrollTo(0, document.body.scrollHeight);
});
