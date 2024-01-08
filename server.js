const express = require("express");
const StreamAudio = require("ytdl-core");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.static("./"));

app.get("/", async (req, res) => {
  try {
    const Link = req.query.url;
    if (!Link) {
      res.status(400).json({ error: "url not provided" });
      return;
    }
    const SongId = StreamAudio.getVideoID(Link);
    const filePath = `music/${SongId}.mp3`;

    if (fs.existsSync(filePath)) {
      SendStream(res, SongId);
    } else {
      const download = StreamAudio(Link, {
        filter: "videoandaudio",
        quality: "highestvideo",
      }).pipe(fs.createWriteStream(filePath));

      download.on("finish", () => {
        SendStream(res, SongId);
      });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

function SendStream(res, Id) {
  try {
    const filePath = `music/${Id}.mp3`;
    const data = fs.statSync(filePath);
    const file = fs.createReadStream(filePath);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", data.size);

    console.log("Streaming");

    file.pipe(res);

    file.on("end", () => {
      console.log("Streaming complete.");
    });

    file.on("error", (error) => {
      console.error("Error streaming file:", error);
      res.status(500).end();
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).end();
  }
}

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;