const saveAnswers = (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.sendStatus(400);


  const users = req.app.get("users");


  if (users.hasUser(userId)) {
    return res.sendStatus(200);
  } else {
    return res.sendStatus(400);
  }
};

export default saveAnswers;
