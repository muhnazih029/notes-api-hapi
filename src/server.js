import Hapi from '@hapi/hapi';
import inert from '@hapi/inert';
import vision from '@hapi/vision';
import hapiSwagger from 'hapi-swagger';

import notes from './api/notes/index.js';
import NotesService from './services/inMemory/NotesService.js';
import NotesValidator from './validator/notes/index.js';

const init = async () => {
  const notesService = new NotesService();

  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  const swaggerOptions = {
    info: {
      title: 'Notes API Documentation',
      version: '1.0.0',
    },
    grouping: 'tags',
    documentationPath: '/docs',
  };

  await server.register([
    inert,
    vision,
    {
      plugin: hapiSwagger,
      options: swaggerOptions,
    },
  ]);

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
