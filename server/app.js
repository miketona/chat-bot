const cleverbot = require("cleverbot-free"),
  express = require("express"),
  app = express(),
  cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const response = await cleverbot(message);
  res.json({
    response: response,
  });
});
app.listen(8000, (req, res) => {
  console.log("running");
});
