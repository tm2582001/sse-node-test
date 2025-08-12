const syncTimer = (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.sendStatus(400);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const users = req.app.get("users");

  users.insertUser(userId);

  let counter = 360;
  const sseInterval = setInterval(() => {
    res.write(`data: ${counter}\n\n`);
    if (counter === 0) {
      clearInterval(sseInterval);
      res.end();
      return;
    }
    counter -= 1;
  }, 1000);

  res.on("close", () => {
    console.log("client dropped me");
    clearInterval(sseInterval);
    users.removeUser(userId);
    res.end();
  });
};

export default syncTimer;
