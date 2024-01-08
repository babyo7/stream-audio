const express = require("express");
const StreamAudio = require("ytdl-core");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.static("./"));

app.get("/", async (req, res) => {
  const Link = req.query.url;
  if (Link) {
    try {
      console.log(Link);
      if (fs.existsSync(`music/${Link}.mp3`)) {
        const Data = fs.statSync(`music/${Link}.mp3`);
        const audio = fs.createReadStream(`music/${Link}.mp3`);
        res.setHeader("content-type", "audio/mp3");
        res.setHeader("content-length", Data.size);
        console.log("piped");
        audio.pipe(res);
        return;
      }

      const Download = StreamAudio(Link, {
        filter: "videoandaudio",
        quality: "highestvideo",
      });

      Download.on("error", (e) => {
        res.status(404).json(e.message);
        return;
      });

      const audio = Download.pipe(fs.createWriteStream(`music/${Link}.mp3`));

      audio.on("finish", () => {
      res.send('sex')
      });
    } catch (error) {}
  } else {
    res.status(404).json("url not provided");
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;
