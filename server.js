  const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const fs = require("fs");
const cluster = require("node:cluster");
const os = require("os");
const totalCpu = os.cpus().length;
const cp = require("child_process");
const { getVideoMP3Binary } = require("yt-get");
const ffmpeg = require("ffmpeg-static");

if (cluster.isPrimary) {
  for (let i = 0; i < totalCpu; i++) {
    cluster.fork();
  }
} else {
  app.use(cors());
  app.use(express.static("./"));

  app.get("/", async (req, res) => {
    const Link = req.query.url;

    if (Link) {
      try {
        if (fs.existsSync(`music/${Link}converted.mp3`)) {
          const audio = fs.createReadStream(`music/${Link}converted.mp3`);
          const data = fs.statSync(`music/${Link}converted.mp3`);
          res.setHeader("content-type", "audio/mpeg");
          res.setHeader("Accept-Ranges", "bytes");
          res.setHeader("content-length", data.size);

          audio.pipe(res);
          return;
        }

        const videoURL = `https://www.youtube.com/watch?v=${Link}`;

        const bin = getVideoMP3Binary(videoURL);

        bin.then((binary) => {
          fs.writeFileSync(`music/${Link}.mp3`, binary.mp3);

          const inputFilePath = `music/${Link}.mp3`;

          const outputFilePath = `music/${Link}converted.mp3`;

          const ffmpegProcess = cp.spawnSync(ffmpeg, [
            "-i",
            inputFilePath, // Input audio file
            "-c:a",
            "libmp3lame", // Output audio codec (MP3)
              "-preset",
          "ultrafast",
            "-y", // Overwrite output file if it exists
            outputFilePath, // Output file
          ]);

          // Check if the conversion was successful
          if (ffmpegProcess.status === 0) {
            console.log("Conversion successful.");
          } else {
            console.error(
              "Error converting file:",
              ffmpegProcess.stderr.toString()
            );
          }
          fs.unlinkSync(`music/${Link}.mp3`);

          const audio = fs.createReadStream(`music/${Link}converted.mp3`);
          const data = fs.statSync(`music/${Link}converted.mp3`);
          res.setHeader("content-type", "audio/mpeg");
          res.setHeader("Accept-Ranges", "bytes");
          res.setHeader("content-length", data.size);
          audio.pipe(res);
        });
      } catch (error) {
        console.log(error.message);
        res.json("error");
      }
    } else {
      res.status(200).json("url not provided");
    }
  });
  app.get("/download/", async (req, res) => {
    const Link = req.query.url;
    const File = req.query.file;

    if (Link) {
      try {
        if (fs.existsSync(`music/${Link}converted.mp3`)) {
          const audio = fs.createReadStream(`music/${Link}converted.mp3`);
          const data = fs.statSync(`music/${Link}converted.mp3`);
          res.setHeader("content-type", "audio/mpeg");
          res.setHeader("Accept-Ranges", "bytes");
          res.setHeader("content-length", data.size);
          res.setHeader(
            "Content-Disposition",
            `attachment; filename"${File}.mp3"`
          );

          audio.pipe(res);
          return;
        }

        const videoURL = `https://www.youtube.com/watch?v=${Link}`;

        const bin = getVideoMP3Binary(videoURL);

        bin.then((binary) => {
          fs.writeFileSync(`music/${Link}.mp3`, binary.mp3);

          const inputFilePath = `music/${Link}.mp3`;

          const outputFilePath = `music/${Link}converted.mp3`;

          const ffmpegProcess = cp.spawnSync(ffmpeg, [
            "-i",
            inputFilePath, // Input audio file
            "-c:a",
            "libmp3lame", // Output audio codec (MP3)
              "-preset",
          "ultrafast",
            "-y", // Overwrite output file if it exists
            outputFilePath, // Output file
          ]);

          // Check if the conversion was successful
          if (ffmpegProcess.status === 0) {
            console.log("Conversion successful.");
          } else {
            console.error(
              "Error converting file:",
              ffmpegProcess.stderr.toString()
            );
          }
          fs.unlinkSync(`music/${Link}.mp3`);

          const audio = fs.createReadStream(`music/${Link}converted.mp3`);
          const data = fs.statSync(`music/${Link}converted.mp3`);
          res.setHeader("content-type", "audio/mpeg");
          res.setHeader("Accept-Ranges", "bytes");
          res.setHeader("content-length", data.size);
          res.setHeader(
            "Content-Disposition",
            `attachment; filename"${File}.mp3"`
          );

          audio.pipe(res);
        });
      } catch (error) {
        console.log(error.message);
        res.json("error");
      }
    } else {
      res.status(200).json("url not provided");
    }
  });

  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
}
