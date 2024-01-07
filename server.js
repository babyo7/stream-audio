const express = require("express");
const ytdl = require("ytdl-core");
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

    const info = await ytdl.getInfo(link);
    const formats = ytdl.filterFormats(info.formats, "videoandaudio");
 
    if (formats.length === 0) {
      return res.status(500).json({ message: "No audio format found" });
    }

    const audioFormat = formats[0];
    const length = audioFormat.approxDurationMs;
    console.log(length);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Content-Length", length);
    res.setHeader("Content-Range", `bytes 0-${length - 1}/${length}`);
    res.status(200);

    const stream = ytdl(link, {
      quality: "highestvideo",
      filter: "videoandaudio",
      highWaterMark: 1 << 25, 
    });

    stream.on("error", (error) => {
      console.error(error);
      res.status(404)
      stream.destroy()
      res.end();
      return
    });

    stream.pipe(res);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
