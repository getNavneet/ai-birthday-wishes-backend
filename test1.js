const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to test file operations
app.get("/test", (req, res) => {
  try {
    // Check if the file exists, create it if not
    const filePath = "./test.txt";
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "Hello, Replit!");
      console.log("File created successfully");
    }

    // Read file contents
    const fileContent = fs.readFileSync(filePath, "utf8");
    console.log("File content:", fileContent);

    // Append additional content to the file
    fs.appendFileSync(filePath, "\nThis is a test.");

    // Read updated file contents
    const updatedFileContent = fs.readFileSync(filePath, "utf8");
    console.log("Updated file content:", updatedFileContent);

    res.send("File operations test completed.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
