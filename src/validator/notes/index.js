import { NotesPayloadSchema } from "./schema.js";

const NotesValidator = {
  validateNotePayload: (payload) => {
    const validationResult = NotesPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

export default NotesValidator;
