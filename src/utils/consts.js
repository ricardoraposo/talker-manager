const path = require('path');

const PATH_TO_TALKERS = path.resolve(__dirname, '..', 'talker.json');

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;

module.exports = {
  PATH_TO_TALKERS,
  EMAIL_REGEX,
};
