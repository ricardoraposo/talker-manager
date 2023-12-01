const { Router } = require('express');
const talkerDB = require('../db/talkerDB');
const utils = require('../utils/utils');
const { PATH_TO_TALKERS } = require('../utils/consts');

const router = Router();

router.get('/', (_req, res) => {
  const data = utils.readJsonFile(PATH_TO_TALKERS);
  res.status(200).json(data);
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
