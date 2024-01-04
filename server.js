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
    if (link) {
      const info = await StreamAudio.getInfo(link);
      const duration = info.videoDetails.lengthSeconds;
      const url = StreamAudio(link, {
        filter: "videoandaudio",
        quality: "highestvideo",
      });
      const bitrate = 128;
      const bytesPerMinute = ((bitrate * 1000) / 8) * 60;

      res.setHeader("content-type", "audio/mpeg");
      res.setHeader("Content-Length", duration * bytesPerMinute);
      url.on("error", (error) => {
        res.end()
        return
      });
      url.on("end", () => {
        res.end()
        return
      })
      url.pipe(res);
    } else {
   res.status(500).json({"message":"url not provided"});
    }
  } catch (error) {
   res.status(500).json({"Error":error.message});
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;
