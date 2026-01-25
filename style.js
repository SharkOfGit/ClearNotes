console.log("script.js is running");
const note = document.getElementById("note");
const status = document.getElementById("status");

// Load saved note on page load
note.value = localStorage.getItem("notev2") || "";

// Save automatically when typing
note.addEventListener("input", () => {
  localStorage.setItem("notev2", note.value);
  status.textContent = "Saved ✔";
});
