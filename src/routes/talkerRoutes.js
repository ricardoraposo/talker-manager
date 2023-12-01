const { Router } = require('express');
const talkerDB = require('../db/talkerDB');
const utils = require('../utils/utils');
const postValidators = require('../middlewares/postValidators');
const validateToken = require('../middlewares/auth');

const router = Router();

router.get('/', (_req, res) => {
  const data = utils.readTalkersList();
  return res.status(200).json(data);
});

router.get('/db', async (_req, res) => {
  try {
    const [result] = await talkerDB.findAll();
    const talkerList = utils.formatList(result);
    res.status(200).json(talkerList);
  } catch (e) {
    res.status(500).json({ message: `Something went wrong: ${e.sqlMessage}` });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const data = utils.readTalkersList();
  const talker = data.find((t) => t.id === parseInt(id, 10));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

router.post('/', validateToken, postValidators, (req, res) => {
  const talker = req.body;
  const data = utils.readTalkersList();
  const newTalker = { id: data.length + 1, ...talker };
  data.push(newTalker);
  utils.writeToTalkersList(data);
  return res.status(201).json(newTalker);
});

router.put('/:id', validateToken, postValidators, (req, res) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  console.log('id: ', idNumber);
  const data = utils.readTalkersList();

  const talker = data.find((t) => t.id === idNumber);
  if (!talker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  const editedData = data.reduce((acc, currTalker) => {
    if (currTalker.id === idNumber) return [...acc, { id: idNumber, ...req.body }];
    return [...acc, currTalker];
  }, []);

  utils.writeToTalkersList(editedData);
  return res.status(200).json({ id: idNumber, ...req.body });
});

module.exports = router;
