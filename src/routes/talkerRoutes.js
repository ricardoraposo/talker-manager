const { Router } = require('express');
const talkerDB = require('../db/talkerDB');
const utils = require('../utils/utils');
const { PATH_TO_TALKERS } = require('../utils/consts');

const router = Router();

router.get('/', (_req, res) => {
  const data = utils.readJsonFile(PATH_TO_TALKERS);
  return res.status(200).json(data);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const data = utils.readJsonFile(PATH_TO_TALKERS);
  const talker = data.find((t) => t.id === parseInt(id, 10));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
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

module.exports = router;
