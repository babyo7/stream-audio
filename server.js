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

    const length = info.formats[0].contentLength;

    const url = StreamAudio(link, {
      filter: "videoandaudio",
      quality: "highestvideo",
    });

    res.setHeader("content-type", "audio/mpeg");
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Content-Length", length);

    url.on("error", (error) => {
      console.log(error);
      url.destroy();
      res.end();
    });

    url.pipe(res);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;
