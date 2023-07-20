const express = require('express');
const { join } = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');
const validateLogin = require('./middleware/validationLogin');
const validationTalker = require('./middleware/validationTalker');
const tokenValidation = require('./middleware/validationToken');
const { modifyFile, deleteFile } = require('./helpers/functionsOfRoutes');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/:id', async (request, response) => {
  try {
    const id = Number(request.params.id);
    const getAllFile = await fs.readFile(join(__dirname, './talker.json'), 'utf-8');
    const speakers = JSON.parse(getAllFile);

    const talker = speakers.find((speaker) => speaker.id === id);
    if (!talker) {
      return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    response.status(200).json(talker); 
  } catch (error) {
    console.log(error.message);
  }
});

app.get('/talker', async (_request, response) => {
  try {
    const getAllFile = await fs.readFile(join(__dirname, './talker.json'), 'utf-8');
    response.status(200).json(JSON.parse(getAllFile));
  } catch (error) {
    console.log(error.message);
  }
});

app.post('/login', validateLogin, async (_request, response) => {
  try {
    const token = crypto.randomBytes(8).toString('hex');
    response.status(200).json(({ token }));
  } catch (error) {
    console.log(error.message);
  }
});

app.use(tokenValidation);

app.put('/talker/:id', validationTalker, async (request, response) => {
  try {
    const { id } = request.params;
    const createdTalker = request.body;
    const modify = await modifyFile(id, createdTalker); 
    console.log(modify);
    if (!modify) {
      return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    response.status(200).json(modify);
  } catch (error) {
    console.log(error.message);
  }
});

app.delete('/talker/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const modify = await deleteFile(id); 

    if (!modify) {
      return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    response.status(204).end();
  } catch (error) {
    console.log(error.message);
  }
});

app.post('/talker', validationTalker, async (request, response) => {
  try {
    const createdTalker = request.body;
    const getAllFile = await fs.readFile(join(__dirname, './talker.json'), 'utf-8');
    const getAllFileJson = JSON.parse(getAllFile);
    createdTalker.id = getAllFileJson[getAllFileJson.length - 1].id + 1;

    await fs.writeFile(join(__dirname, './talker.json'),
    JSON.stringify([...getAllFileJson, createdTalker]));
    response.status(201).json(createdTalker);
  } catch (error) {
    console.log(error.message);
  }
});
