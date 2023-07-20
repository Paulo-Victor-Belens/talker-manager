const express = require('express');
const { join } = require('path');
const fs = require('fs').promises;

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
    const getAllFile = await fs.readFile(join(__dirname, './talker.json'));
    response.status(200).json(JSON.parse(getAllFile));
  } catch (error) {
    console.log(error.message);
  }
});
