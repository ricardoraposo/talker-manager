const utils = require('../utils/utils');

const rateFilter = (req, res, next) => {
  const { rate } = req.query;
  const data = utils.readTalkersList();

  if (rate === undefined) {
    req.body.data = data;
    next();
  }

  const rateNumber = Number(rate);

  if (!Number.isInteger(rateNumber) || rateNumber > 5 || rateNumber < 1) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  req.body.data = data.filter(({ talk }) => talk.rate === rateNumber);
  next();
};

module.exports = {
  rateFilter,
};
