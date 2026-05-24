const express = require('express');
const router = express.Router();
const store = require('../store');

router.get('/', (req, res) => {
  const { q } = req.query;
  if (q) {
    const lower = q.toLowerCase();
    const filtered = store.getAllNotes().filter(
      note =>
        note.title.toLowerCase().includes(lower) ||
        note.content.toLowerCase().includes(lower)
    );
    return res.json(filtered);
  }
  res.json(store.getAllNotes());
});

router.post('/', (req, res) => {
  const { title, content, tags } = req.body;
  const note = store.createNote({ title, content, tags });
  res.status(201).json(note);
});

router.get('/:id', (req, res) => {
  const note = store.getNoteById(req.params.id);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

router.put('/:id', (req, res) => {
  const { title, content, tags } = req.body;
  const note = store.updateNote(req.params.id, { title, content, tags });
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

router.delete('/:id', (req, res) => {
  const deleted = store.deleteNote(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Note not found' });
  res.status(204).send();
});

module.exports = router;
