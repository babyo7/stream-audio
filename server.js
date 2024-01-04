const express = require("express");
const StreamAudio = require("ytdl-core");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");

app.use(cors());
app.use(express.static("./"));

app.get("/", async (req, res) => {
  try {
    const link = req.query.url;
    if (!link) {
      return res.status(500).json({ message: "url not provided" });
    }
      const info = await StreamAudio.getInfo(link);
      const duration = parseInt(info.videoDetails.lengthSeconds);

      const url = StreamAudio(link, {
        filter: "videoandaudio",
        quality: "highestvideo",
      });
      res.setHeader("content-type", "audio/mpeg");
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Content-Length", calculateContentLength(duration));

      url.on("error", (error) => {
        res.end();
      });

      url.pipe(res);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

function calculateContentLength(duration) {
  const bitrate = 128;
  const contentLength = (duration * bitrate * 1000) / 8;
  return Math.floor(contentLength).toString();
}

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;
