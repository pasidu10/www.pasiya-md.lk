const OPENAI_KEY = "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";

async function askChatGPT(question) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: question}],
      max_tokens: 500
    })
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No answer found.";
}

async function sendQuestion() {
  const input = document.getElementById('userInput');
  const question = input.value.trim();
  if(!question) return;
  appendMsg("user", question);
  input.value = "";
  appendMsg("ai", "Thinking...");
  const answer = await askChatGPT(question);
  document.querySelector(".ai:last-child").innerText = answer;
}

function appendMsg(role, msg) {
  const box = document.getElementById("chatOutput");
  const div = document.createElement("div");
  div.className = role;
  div.textContent = (role==="user"?"🧑‍🎓 ":"🤖 ")+msg;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}
