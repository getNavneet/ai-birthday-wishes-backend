const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // For JSON parsing
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;
// Initialize dataStorage globally

app.set("view engine", "ejs");
// let id = 1; //initial id

const filePath = "./data.json";

try {
  // Check if the data file exists, create it if not
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "{}");
    console.log("data.json file created successfully");
  }

} catch (error) {
  console.error("Error:", error);
}
  // Load existing data from file
  let dataStorage = JSON.parse(fs.readFileSync(filePath));
  console.log("Data loaded from data.json:", dataStorage);

app.use(express.static(path.join(__dirname, "public"))); // Set up a static directory for your CSS and JS files
// File path to store data

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
  // console.log(dataStorege);
  // const foundData = dataStore.find((item) => item.id === number);

  if (dataStorage.hasOwnProperty(someId)) {
    console.log("Data available");
    let foundData = dataStorage[someId];
    console.log(foundData);
    res.render("index", {
      id: "id goes here",
      name: foundData.name,
      msg: foundData.msg,
    });
  } else {
    res.status(404).json({ error: "Data not found" });
    return;
  }
});

app.post("/gen", (req, res) => {
  try {
    const { name, msg } = req.body;
      //split name with space and take first word only and also make it unique by adding some number
        // Calculate the next available id
    let id = Object.keys(dataStorage).length + 1;
    console.log("Next available ID:", id);
      const nm = (name.split(" ")[0]);
    let slug = `${nm}-${id}`; 
    console.log("data received successfully");
    console.log("dataStorage is");
    console.log(dataStorage);
    dataStorage[slug] = { name, msg, createdAt: Date.now() };
    // dataStore.push({ id, createdAt: Date.now(), ...data });
    console.log(dataStorage);

    // Write data to file
    fs.writeFileSync(filePath, JSON.stringify(dataStorage));
    // Process the received data (name, message, and ID)

    // console.log("Received data:", name, message, id);

    // Simulate some processing or data storage

    const processedData = {
      url: `http://localhost:3000/share/${slug}`,
      url2: `https://ai-wishes-test.vercel.app/share/${slug}`,
      url3: `https://a5e10e73-d368-4af1-8289-d64edbcda316-00-17ea5ot831lh1.riker.replit.dev/share/${slug}`,
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
