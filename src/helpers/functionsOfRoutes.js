const fs = require('fs').promises;
const { join } = require('path');

const modifyFile = async (id, updateTalker) => {
  const getAllFile = await fs.readFile(join(__dirname, '../talker.json'));
  const getAllFileJson = JSON.parse(getAllFile);
  const index = getAllFileJson.findIndex((talker) => talker.id === Number(id));

  if (index === -1) {
    return false;
  }

  getAllFileJson[index] = { id: Number(id), ...updateTalker };

  try {
    fs.writeFile(join(__dirname, '../talker.json'), JSON.stringify(getAllFileJson));
    return getAllFileJson[index];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = modifyFile;
