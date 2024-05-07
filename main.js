const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // For JSON parsing
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
// app.use(express.static("public")); // Set up a static directory for your CSS and JS files
app.use(express.static(path.join(__dirname, 'public')));
let id = 1;
let dataStore = []; //object value
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://ai-wishes-test.vercel.app/"], // Adjust the port if necessary
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization",
  }),
);
app.get("/share/:id", (req, res) => {
  const someId = req.params.id; // share/someId
  const number = parseInt(someId.split("-")[1]);
  console.log(number);
  console.log("data is -");
  console.log(dataStore);
  const foundData = dataStore.find((item) => item.id === number);
  console.log("Data available");
  console.log(foundData);

  if (!foundData) {
    res.status(404).json({ error: "Data not found" });
    return;
  } else if (foundData) {
    res.render("index", {
      id: foundData.id,
      name: foundData.name,
      msg: foundData.msg,
    });
  }
});

app.post("/gen", (req, res) => {
  try {
    const data = req.body; // Access the parsed JSON data
    let name = data.name;
    const message = data.msg;
    // const id = data.id;
    name += `-${id}`;
    dataStore.push({ id, ...data });
    console.log(dataStore);
    // Process the received data (name, message, and ID)
    console.log("data received successfully");
    // console.log("Received data:", name, message, id);

    // Simulate some processing or data storage

    const processedData = {
      url: `http://localhost:5173/share/${name}`,
      url2: `https://ai-wishes-test.vercel.app/share/${name}`,
      url3: `https://a607835b-65e9-42d1-8b19-5c28b6602f1c-00-zrl6pish6nk1.picard.replit.dev/share/${name}`,
    };

    res.json(processedData);
    id++;
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//   https://your-frontend.vercel.app/share?name=uniqueIdentifier
