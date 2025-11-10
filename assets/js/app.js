const GEMINI_KEY = "AQ.Ab8RN6JT14b4cqUw7POMJ_BX-fRiWpTvAZ9AJ-x0LW3UhMxAZg";

async function askGemini(question) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" + GEMINI_KEY,
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        contents: [{ parts: [{ text: question }]}]
      })
    }
  );
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No answer found.";
}

async function sendQuestion() {
  const input = document.getElementById('userInput');
  const question = input.value.trim();
  if(!question) return;
  appendMsg("user", question);
  input.value = "";
  appendMsg("ai", "Thinking...");
  const answer = await askGemini(question);
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
