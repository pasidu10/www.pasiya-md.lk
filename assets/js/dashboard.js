const subjectsByGrade = {
  1: ["Maths", "Environment", "Language"],
  2: ["Maths", "Science", "English"],
  3: ["Maths", "Sinhala", "Science", "ICT"],
  4: ["Mathematics", "Science", "English", "Buddhism"],
  5: ["Maths", "English", "Science", "History"],
  6: ["Maths", "Science", "Civics", "ICT"],
  7: ["Maths", "Science", "Geography", "ICT"],
  8: ["Maths", "Science", "Commerce", "History"],
  9: ["Maths", "Science", "Buddhism", "ICT"],
  10: ["Maths", "Science", "History", "Commerce"],
  11: ["Maths", "English", "ICT", "Civic Education"],
  12: ["Physics", "Chemistry", "Biology", "ICT", "Economics"],
  13: ["Combined Maths", "Physics", "Chemistry", "ICT", "Business Studies"]
};

const gradeListDiv = document.getElementById("gradeList");
const selectedSubjectText = document.getElementById("selectedSubject");
let currentSubject = null;

// Generate grade cards
for (let i = 1; i <= 13; i++) {
  const div = document.createElement("div");
  div.className = "grade";
  div.innerHTML = `<h2>Grade ${i}</h2>`;
  subjectsByGrade[i].forEach(sub => {
    const btn = document.createElement("button");
    btn.className = "subject-btn";
    btn.textContent = sub;
    btn.onclick = () => selectSubject(sub, i);
    div.appendChild(btn);
  });
  gradeListDiv.appendChild(div);
}

// Select subject
function selectSubject(subject, grade) {
  currentSubject = `Grade ${grade} - ${subject}`;
  selectedSubjectText.innerHTML = `<b>Selected:</b> ${currentSubject}`;
}

// AI chat
async function askAI() {
  const input = document.getElementById("userInput").value;
  const responseBox = document.getElementById("response");
  if (!currentSubject) {
    responseBox.innerHTML = "⚠️ Please select a subject first.";
    return;
  }
  responseBox.innerHTML = "<i>Thinking...</i>";

  const apiKey = "{YOUR_API_KEY_HERE}"; // Paste your Gemini/ChatGPT key here
  const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey;

  const requestBody = {
    contents: [{ parts: [{ text: `You are a teacher for ${currentSubject}. ${input}` }] }]
  };

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
