const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Landing Page");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT ${PORT}`);
});
