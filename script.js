const note = document.getElementById("note");
const title = document.getElementById("title");
const status = document.getElementById("status");
const notesList = document.getElementById("notesList");
const newNoteBtn = document.getElementById("newNote");
const deleteNoteBtn = document.getElementById("deleteNote");
const search = document.getElementById("search");

const STORAGE_KEY = "notes360_v1";

let notes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let activeNoteId = notes[0]?.id || null;

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function createNote() {
  const id = Date.now().toString();
  const newNote = { id, title: "Untitled", content: "" };
  notes.unshift(newNote);
  activeNoteId = id;
  saveNotes();
  renderNotes();
  loadActiveNote();
}

function deleteNote() {
  if (!activeNoteId) return;
  notes = notes.filter(n => n.id !== activeNoteId);
  activeNoteId = notes[0]?.id || null;
  saveNotes();
  renderNotes();
  loadActiveNote();
}

function renderNotes() {
  const query = search.value.toLowerCase();
  notesList.innerHTML = "";

  notes
    .filter(n => n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query))
    .forEach(n => {
      const div = document.createElement("div");
      div.className = "note-item" + (n.id === activeNoteId ? " active" : "");
      div.textContent = n.title;
      div.addEventListener("click", () => {
        activeNoteId = n.id;
        renderNotes();
        loadActiveNote();
      });
      notesList.appendChild(div);
    });
}

function loadActiveNote() {
  const active = notes.find(n => n.id === activeNoteId);
  if (!active) {
    title.value = "";
    note.value = "";
    return;
  }
  title.value = active.title;
  note.value = active.content;
}

note.addEventListener("input", () => {
  const active = notes.find(n => n.id === activeNoteId);
  if (!active) return;
  active.content = note.value;
  status.textContent = "Saved ✔";
  saveNotes();
});

title.addEventListener("input", () => {
  const active = notes.find(n => n.id === activeNoteId);
  if (!active) return;
  active.title = title.value || "Untitled";
  saveNotes();
  renderNotes();
});

newNoteBtn.addEventListener("click", createNote);
deleteNoteBtn.addEventListener("click", deleteNote);
search.addEventListener("input", renderNotes);

renderNotes();
loadActiveNote();
