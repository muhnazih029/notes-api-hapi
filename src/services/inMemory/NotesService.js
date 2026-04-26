import { nanoid } from 'nanoid';

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, tags, body }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updatedAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
      return {
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId: id,
        },
      };
    }

    return {
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    };
  }

  getAllNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
      return {
        status: 'success',
        data: {
          note,
        },
      };
    }

    return {
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    };
  }

  editNoteById(id, { title, tags, body }) {
    const updatedAt = new Date().toISOString();

    const index = this._notes.findIndex((note) => note.id === id);

    if (index !== -1) {
      this._notes[index] = {
        ...this._notes[index],
        title,
        tags,
        body,
        updatedAt,
      };

      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    }
  }

  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index !== -1) {
      this._notes.splice(index, 1);

      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      };
    }

    return {
      status: 'fail',
      message: 'Catatan gagal dihapus. Id tidak ditemukan',
    };
  }
}

export default NotesService;
