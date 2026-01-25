const note = document.getElementById("note");

// load saved note
note.value = localStorage.getItem("note") || "";

// save on typing
note.addEventListener("input", () => {
  localStorage.setItem("note", note.value);
});
