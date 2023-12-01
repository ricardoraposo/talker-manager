const formatList = (list) => list.map((r) => {
  const { name, age, id, talk_watched_at: watchedAt, talk_rate: rate } = r;
  return {
    name,
    age,
    id,
    talk: {
      watchedAt,
      rate,
    },
  };
});

module.exports = {
  formatList,
};
