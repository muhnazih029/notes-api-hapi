class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  postNoteHandler(Request, Hapi) {
    try {
      this._validator.validateNotePayload(Request.payload);

      const { title = 'untitled', tags, body } = Request.payload;
      const notes = this._service.addNote({ title, tags, body });

      const Response = Hapi.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          notes,
        },
      });
      return Response.code(201).takeover();
    } catch (error) {
      return Hapi.response({
        status: 'fail',
        message: error.message,
      }).code(400);
    }
  }

  getNotesHandler(Request) {
    const notes = this._service.getAllNotes();
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  getNoteByIdHandler(Request, Hapi) {
    try {
      const { id } = Request.params;
      const note = this._service.getNoteById(id);
      return {
        status: 'success',
        data: {
          note,
        },
      };
    } catch (error) {
      return Hapi.response({
        status: 'fail',
        message: error.message,
      }).code(404);
    }
  }

  putNoteByIdHandler(Request, Hapi) {
    try {
      this._validator.validateNotePayload(Request.payload);

      const { id } = Request.params;
      const { title, tags, body } = Request.payload;
      this._service.editNoteById(id, { title, tags, body });

      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (error) {
      return Hapi.response({
        status: 'fail',
        message: error.message,
      }).code(404);
    }
  }

  deleteNoteByIdHandler(Request, Hapi) {
    try {
      const { id } = Request.params;
      this._service.deleteNoteById(id);
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      };
    } catch (error) {
      return Hapi.response({
        status: 'fail',
        message: error.message,
      }).code(404);
    }
  }
}

export default NotesHandler;
