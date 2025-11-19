const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { uploadFileToR2 } = require("./r2");

const app = express();
const port = 3001;

app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/file-upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const fileUrl = await uploadFileToR2(req.file);
    res.status(200).json({ url: fileUrl });
  } catch (error) {
    console.error("Error uploading to R2:", error);
    res.status(500).send("Error uploading file.");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
