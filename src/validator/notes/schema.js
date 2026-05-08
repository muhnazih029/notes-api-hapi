import Joi from 'joi';

const NotesPayloadSchema = Joi.object({
  title: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  body: Joi.string().required(),
}).label('NoteInput');

const NoteIdParamSchema = Joi.object({
  id: Joi.string().required(),
})

export { NotesPayloadSchema, NoteIdParamSchema };
