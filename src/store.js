const { v4: uuidv4 } = require('uuid');

let notes = [];

function resetStore() {
  notes = [];
}

function getAllNotes() {
  return notes;
}

function getNoteById(id) {
  return notes.find(n => n.id === id) || null;
}

function createNote({ title, content = '', tags = [] }) {
  const now = new Date().toISOString();
  const note = { id: uuidv4(), title, content, tags, createdAt: now, updatedAt: now };
  notes.push(note);
  return note;
}

function updateNote(id, fields) {
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) return null;
  notes[idx] = { ...notes[idx], ...fields, updatedAt: new Date().toISOString() };
  return notes[idx];
}

function deleteNote(id) {
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) return false;
  notes.splice(idx, 1);
  return true;
}

module.exports = { resetStore, getAllNotes, getNoteById, createNote, updateNote, deleteNote };
