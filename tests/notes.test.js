const request = require('supertest');
const app = require('../src/app');
const { resetStore } = require('../src/store');

beforeEach(() => {
  resetStore();
});

describe('POST /notes', () => {
  it('creates a note and returns 201', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ title: 'Test note', content: 'Some content', tags: ['work'] });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe('Test note');
    expect(res.body.content).toBe('Some content');
    expect(res.body.tags).toEqual(['work']);
    expect(res.body.createdAt).toBeDefined();
  });
});

describe('GET /notes', () => {
  it('returns all notes as an array', async () => {
    await request(app).post('/notes').send({ title: 'Note 1', content: 'a' });
    await request(app).post('/notes').send({ title: 'Note 2', content: 'b' });
    const res = await request(app).get('/notes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2);
  });
});

describe('GET /notes/:id', () => {
  it('returns the correct note by ID', async () => {
    const created = await request(app)
      .post('/notes')
      .send({ title: 'Specific note', content: 'hello' });
    const res = await request(app).get(`/notes/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Specific note');
  });
});

describe('DELETE /notes/:id', () => {
  it('removes the note and returns 204', async () => {
    const created = await request(app)
      .post('/notes')
      .send({ title: 'To delete', content: '' });
    const res = await request(app).delete(`/notes/${created.body.id}`);
    expect(res.status).toBe(204);
    const check = await request(app).get(`/notes/${created.body.id}`);
    expect(check.status).toBe(404);
  });
});

describe('PUT /notes/:id', () => {
  it('updates title and content and returns updated values with a newer updatedAt', async () => {
    const created = await request(app)
      .post('/notes')
      .send({ title: 'Original title', content: 'Original content' });
    expect(created.status).toBe(201);

    const originalUpdatedAt = created.body.updatedAt;

    // Wait a tick to ensure the timestamp will differ
    await new Promise((resolve) => setTimeout(resolve, 10));

    const res = await request(app)
      .put(`/notes/${created.body.id}`)
      .send({ title: 'Updated title', content: 'Updated content' });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated title');
    expect(res.body.content).toBe('Updated content');
    expect(res.body.updatedAt).toBeDefined();
    expect(new Date(res.body.updatedAt).getTime()).toBeGreaterThan(
      new Date(originalUpdatedAt).getTime()
    );
  });

  it('returns 404 when the note does not exist', async () => {
    const res = await request(app)
      .put('/notes/nonexistent-id')
      .send({ title: 'Doesn\'t matter', content: 'Also doesn\'t matter' });

    expect(res.status).toBe(404);
  });
});
