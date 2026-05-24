# Notes API

A simple REST API for managing notes. Built with Express.js.

## Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | /notes | List all notes |
| POST | /notes | Create a note |
| GET | /notes/:id | Get a note by ID |
| PUT | /notes/:id | Update a note |
| DELETE | /notes/:id | Delete a note |

## Note shape

```json
{
  "id": "uuid",
  "title": "string",
  "content": "string",
  "tags": ["string"],
  "createdAt": "ISO 8601",
  "updatedAt": "ISO 8601"
}
```

## Running

```bash
npm install
npm start   # http://localhost:3000
npm test
```

## Storage

In-memory only — data resets on restart.
