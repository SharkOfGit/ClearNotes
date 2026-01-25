const note = document.getElementById("note");
const status = document.getElementById("status");

// Load saved note on page load
note.value = localStorage.getItem("note") || "";

// Save automatically when typing
note.addEventListener("input", () => {
  localStorage.setItem("note", note.value);
  status.textContent = "Saved ✔";
});
