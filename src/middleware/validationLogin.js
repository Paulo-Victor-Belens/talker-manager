const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const valitadeEmail = ({ body }, res, next) => {
  if (!body.email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } 
  if (!emailRegex.test(body.email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
    next();
};

const valitadePassword = ({ body }, res, next) => {
  if (!body.password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (body.password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = [
    valitadeEmail,
    valitadePassword,
];