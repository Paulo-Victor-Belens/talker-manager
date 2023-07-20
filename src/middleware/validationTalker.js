const valitadeName = ({ body }, res, next) => {
  if (!body.name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } 
  if (body.name.length <= 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
    next();
};

const valitadeAge = ({ body }, res, next) => {
  if (!body.age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!Number.isInteger(body.age) || body.age < 18) {
    return res
    .status(400)
    .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  next();
};

const valitadeTalk = ({ body }, res, next) => {
  if (!body.talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const validateTalk2 = ({ body: { talk: { watchedAt } } }, res, next) => {
  const regexDate = /^['"]?[0-3][0-9]\/[0-1][0-9]\/20[0-9]{2}['"]?$/;
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!regexDate.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateTalk3 = ({ body: { talk: { rate } } }, res, next) => {
  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  } 
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) { 
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};

module.exports = [
    valitadeName,
    valitadeAge,
    valitadeTalk,
    validateTalk2,
    validateTalk3,
];