const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

function addMessage(message, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.innerText = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function botReply(userMsg) {
  let reply = "I'm not sure, but our team will contact you soon! 😊";

  userMsg = userMsg.toLowerCase();
  if (userMsg.includes("hi") || userMsg.includes("hello")) reply = "Hey there! 👋 How can I assist you today?";
  else if (userMsg.includes("signal")) reply = "📈 Check our latest signals on the DEMONS VIP channel!";
  else if (userMsg.includes("vip")) reply = "💎 Our VIP plan gives access to premium crypto updates!";
  else if (userMsg.includes("owner")) reply = "📞 You can contact the owner at +947666359869";

  setTimeout(() => addMessage(reply, "bot"), 600);
}

sendBtn.addEventListener("click", () => {
  const msg = userInput.value.trim();
  if (msg === "") return;
  addMessage(msg, "user");
  userInput.value = "";
  botReply(msg);
});

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});
