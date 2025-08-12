import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import syncTimer from "./routes/sync-timer.route.js";
import saveAnswers from "./routes/save-answers.route.js";

import ConnectedUsers from "./models/connected-users.model.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "static")));

app.set("users", new ConnectedUsers());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/index.html"));
});

app.get("/sync-timer", syncTimer);
app.post("/save-answers", saveAnswers);

app.get("/connected-users", (req, res) => {
  const users = req.app.get("users");

  return res.status(200).send(users.getConnectUsersCount());
});

const port = process.env.PORT || "8080";

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
