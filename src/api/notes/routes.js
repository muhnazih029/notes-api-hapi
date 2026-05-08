import { NotesPayloadSchema, NoteIdParamSchema } from '../../validator/notes/schema.js';

const routes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler,
    options: {
      tags: ['api', 'notes'],
      description: 'Menambahkan catatan baru',
      validate: {
        payload: NotesPayloadSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler,
    options: {
      tags: ['api', 'notes'],
      description: 'Menampilkan semua catatan',
    },
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteByIdHandler,
    options: {
      tags: ['api', 'notes'],
      description: 'Menampilkan catatan berdasarkan id',
      validate: {
        params: NoteIdParamSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteByIdHandler,
    options: {
      tags: ['api', 'notes'],
      description: 'Menyunting catatan berdasarkan id',
      validate: {
        payload: NotesPayloadSchema,
        params: NoteIdParamSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteByIdHandler,
    options: {
      tags: ['api', 'notes'],
      description: 'Menghapus catatan berdasarkan id',
      validate: {
        params: NoteIdParamSchema,
      },
    },
  }
];

export default routes;
