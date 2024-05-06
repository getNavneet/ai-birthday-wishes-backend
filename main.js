const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.get("/share/:id", (req, res) => {
  const messageId = req.params.id; // share/someId
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Birthday Wishes for Rahul</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Birthday Wishes for ${messageId}</h1>
    <p>This special message was generated just for you!</p>
  </body>
  </html>`;

  res.send(htmlContent);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// working fine till @link changed commit 
