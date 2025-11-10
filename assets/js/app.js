async function askAI() {
  const input = document.getElementById("userInput").value;
  const responseBox = document.getElementById("response");
  responseBox.innerHTML = "<i>Thinking...</i>";

  const apiKey = "{AIzaSyB4RF6GyzBWa33SxgNRz213C8kcDLKghQs}"; // <-- Paste your Gemini/ChatGPT API key here
  const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey;

  const requestBody = { contents: [{ parts: [{ text: input }] }] };

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    const data = await res.json();
    const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    responseBox.innerHTML = `<b>AI:</b> ${aiResponse}`;
  } catch (err) {
    responseBox.innerHTML = "<b>Error:</b> " + err.message;
  }
}
