// const express = require("express");
// const StreamAudio = require("ytdl-core");
// const app = express();
// const port = process.env.PORT || 4000;
// const cors = require("cors");
// const fs = require("fs");

// app.use(cors());
// app.use(express.static("./"));

// app.get("/", async (req, res) => {
//   const Link = req.query.url;
//   if (Link) {
//     try {
//       const id = StreamAudio.getVideoID(
//         `https://www.youtube.com/watch?v=${Link}`
//       );
  
//       if (fs.existsSync(`music/${Link}.mp3`)) {
//         const audio = fs.createReadStream(`music/${Link}.mp3`);
//         const data = fs.statSync(`music/${Link}.mp3`);
//         res.setHeader("content-type", "audio/mpeg");
//         res.setHeader("content-length", data.size);
//         res.setHeader("Accept-Ranges", "bytes");
//         audio.pipe(res);
//         return;
//       }

//       const Download = StreamAudio(Link, {
//         filter: "videoandaudio",
//         quality: "highestvideo",
//       }).pipe(fs.createWriteStream(`music/${Link}.mp3`));

//       Download.on("finish", () => {
//             console.log(Link);
//         const audio = fs.createReadStream(`music/${Link}.mp3`);
//         const data = fs.statSync(`music/${Link}.mp3`);
//         res.setHeader("content-type", "audio/mpeg");
//         res.setHeader("content-length", data.size);
//         res.setHeader("Accept-Ranges", "bytes");
//         audio.pipe(res);
        
//       });
//     } catch (error) {
//       console.log(error.message)
//       res.json(error.message);
//     }
//   } else {
//     res.status(200).json("url not provided");
//   }
// });

// app.listen(port, () => {
//   console.log(`http://localhost:${port}`);
// });

// module.exports = app;



// const express = require("express");
// const StreamAudio = require("ytdl-core");
// const app = express();
// const port = process.env.PORT || 4000;
// const cors = require("cors");
// const fs = require("fs");
// const cluster = require("node:cluster");
// const os = require("os");
// const totalCpu = os.cpus().length;

// if (cluster.isPrimary) {
//   for (let i = 0; i < totalCpu; i++) {
//     cluster.fork();
//   }
// } else {
//   app.use(cors());
//   app.use(express.static("./"));

//   app.get("/", async (req, res) => {
//     const Link = req.query.url;
//     if (Link) {
//       try {
        

//         if (fs.existsSync(`music/${Link}.mp3`)) {
//           const audio = fs.createReadStream(`music/${Link}.mp3`);
//           const data = fs.statSync(`music/${Link}.mp3`);
//           res.setHeader("content-type", "audio/mpeg");
//           res.setHeader("content-length", data.size);
          
//           audio.pipe(res);
//           return;
//         }

//         const Download = StreamAudio(Link, {
//           filter: "videoandaudio",
//           quality: "highestvideo",
//         }).pipe(fs.createWriteStream(`music/${Link}.mp3`));

//         Download.on("finish", () => {
//           console.log(Link);
//           const audio = fs.createReadStream(`music/${Link}.mp3`);
//           const data = fs.statSync(`music/${Link}.mp3`);
//           res.setHeader("content-type", "audio/mpeg");
//           res.setHeader("content-length", data.size);
          
//           audio.pipe(res);
//         });
//       } catch (error) {
//         console.log(error);
//        res.status(500).json("internal error");
//       }
//     } else {
//       res.status(200).json("url not provided");
//     }
//   });

//   app.listen(port, () => {
//     console.log(`http://localhost:${port}`);
//   });
// }


// const express = require("express");
// const StreamAudio = require("ytdl-core");
// const app = express();
// const port = process.env.PORT || 4000;
// const cors = require("cors");
// const fs = require("fs");
// const cluster = require("node:cluster");
// const os = require("os");
// const totalCpu = os.cpus().length;

// if (cluster.isPrimary) {
//   for (let i = 0; i < totalCpu; i++) {
//     cluster.fork();
//   }
// } else {
//   app.use(cors());
//   app.use(express.static("./"));

//   app.get("/", async (req, res) => {
//     const Link = req.query.url;
//     const file = req.query.file;
//     if (Link) {
//       try {
//         if (fs.existsSync(`music/${Link}.mp3`)) {
//           const audio = fs.createReadStream(`music/${Link}.mp3`);
//           const data = fs.statSync(`music/${Link}.mp3`);
//           res.setHeader("content-type", "audio/mpeg");
//           res.setHeader("content-length", data.size);
//           res.setHeader(
//             "Content-Disposition",
//             `attachment; filename=${file}.mp3`
//           );
//           audio.pipe(res);
//           return;
//         }

//         const Download = StreamAudio(Link, {
//           filter: "videoandaudio",
//           quality: "highestvideo",
//         }).pipe(fs.createWriteStream(`music/${Link}.mp3`));

//         Download.on("error", () => console.error("error"));
//         Download.on("finish", () => {
//           console.log(Link);
//           const audio = fs.createReadStream(`music/${Link}.mp3`);
//           const data = fs.statSync(`music/${Link}.mp3`);
//           res.setHeader("content-type", "audio/mpeg");
//           res.setHeader("content-length", data.size);
//           res.setHeader(
//             "Content-Disposition",
//             `attachment; filename=${file}.mp3`
//           );
//           audio.pipe(res);
//         });
//       } catch (error) {
//         console.log("error");
//         res.json("error");
//       }
//     } else {
//       res.status(200).json("url not provided");
//     }
//   });

//   app.listen(port, () => {
//     console.log(`http://localhost:${port}`);
//   });
// }


// const express = require("express");
// const StreamAudio = require("ytdl-core");
// const app = express();
// const port = process.env.PORT || 4000;
// const cors = require("cors");
// const fs = require("fs");
// const cluster = require("node:cluster");
// const os = require("os");
// const totalCpu = os.cpus().length;

// if (cluster.isPrimary) {
//   for (let i = 0; i < totalCpu; i++) {
//     cluster.fork();
//   }
// } else {
//   app.use(cors());
//   app.use(express.static("./"));

//   app.get("/", async (req, res) => {
//     const Link = req.query.url;
//     if (Link) {
//       try {
//         if (fs.existsSync(`music/${Link}.mp3`)) {
//           const audio = fs.createReadStream(`music/${Link}.mp3`);
//           const data = fs.statSync(`music/${Link}.mp3`);
//           res.setHeader("content-type", "audio/mpeg");
//           res.setHeader("Accept-Ranges", "bytes");

//           res.setHeader("content-length", data.size);
//           audio.pipe(res);
//           return;
//         }

//         const Download = StreamAudio(Link, {
//           filter: "videoandaudio",
//           quality: "highestvideo",
//         }).pipe(fs.createWriteStream(`music/${Link}.mp3`));

//         Download.on("error", () => console.error("error"));
//         Download.on("finish", () => {
//           console.log(Link);
//           const audio = fs.createReadStream(`music/${Link}.mp3`);
//           const data = fs.statSync(`music/${Link}.mp3`);
//           res.setHeader("content-type", "audio/mpeg");
//           res.setHeader("Accept-Ranges", "bytes");
//           res.setHeader("content-length", data.size);
//           audio.pipe(res);
//         });
//       } catch (error) {
//         console.log("error");
//         res.json("error");
//       }
//     } else {
//       res.status(200).json("url not provided");
//     }
//   });
//   app.get("/download/", async (req, res) => {
//     const Link = req.query.url;
//     const file = req.query.file;
//     if (Link) {
//       try {
//         if (fs.existsSync(`music/${Link}.mp3`)) {
//           const audio = fs.createReadStream(`music/${Link}.mp3`);
//           const data = fs.statSync(`music/${Link}.mp3`);
//           res.setHeader("content-type", "audio/mpeg");
//           res.setHeader("content-length", data.size);
//           res.setHeader("Accept-Ranges", "bytes");
//           res.setHeader(
//             "Content-Disposition",
//             `attachment; filename=${file}.mp3`
//           );
//           audio.pipe(res);
//           return;
//         }

//         const Download = StreamAudio(Link, {
//           filter: "videoandaudio",
//           quality: "highestvideo",
//         }).pipe(fs.createWriteStream(`music/${Link}.mp3`));

//         Download.on("error", () => console.error("error"));
//         Download.on("finish", () => {
//           console.log(Link);
//           const audio = fs.createReadStream(`music/${Link}.mp3`);
//           const data = fs.statSync(`music/${Link}.mp3`);
//           res.setHeader("content-type", "audio/mpeg");
//           res.setHeader("content-length", data.size);
//           res.setHeader("Accept-Ranges", "bytes");
//           res.setHeader(
//             "Content-Disposition",
//             `attachment; filename=${file}.mp3`
//           );
//           audio.pipe(res);
//         });
//       } catch (error) {
//         console.log("error");
//         res.json("error");
//       }
//     } else {
//       res.status(200).json("url not provided");
//     }
//   });

//   app.listen(port, () => {
//     console.log(`http://localhost:${port}`);
//   });
// }

const express = require("express");
const StreamAudio = require("ytdl-core");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const fs = require("fs");
const cluster = require("node:cluster");
const os = require("os");
const totalCpu = os.cpus().length;
const cp = require("child_process");
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
    if (Link == "adrGakL11Ss") return res.json("error");
    if (Link) {
      try {
        if (fs.existsSync(`music/${Link}converted.aac`)) {
          const audio = fs.createReadStream(`music/${Link}converted.aac`);
          const data = fs.statSync(`music/${Link}.mp3`);
          res.setHeader("content-type", "audio/mpeg");
          res.setHeader("Accept-Ranges", "bytes");
          res.setHeader("content-length", data.size);

          audio.pipe(res);
          return;
        }

        const Download = StreamAudio(Link, {
          filter: "audioonly",
          quality: "highestaudio",
        }).pipe(fs.createWriteStream(`music/${Link}.mp3`));

        Download.on("error", () => console.error("error"));
        Download.on("finish", () => {
          console.log(Link);

          const inputFilePath = `music/${Link}.mp3`;

          const outputFilePath = `music/${Link}converted.aac`;

          const ffmpegProcess = cp.spawnSync(ffmpeg, [
            "-i",
            inputFilePath, // Input audio file
            "-c:a",
            "aac", // Output audio codec (AAC)
            "-b:a",
            "320k", // Set the bitrate to 384 kbps (adjust as needed)
            "-ar",
            "48000", // Set the audio sampling rate to 44.1 kHz (adjust as needed)
            "-q:a",
            "0", // Set the audio quality (adjust as needed, 0 is the best)
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
      
          const audio = fs.createReadStream(`music/${Link}converted.aac`);
          const data = fs.statSync(`music/${Link}.mp3`);
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
    const file = req.query.file;
    if (Link) {
      try {
        if (fs.existsSync(`music/${Link}converted.aac`)) {
          const audio = fs.createReadStream(`music/${Link}converted.aac`);
          const data = fs.statSync(`music/${Link}.mp3`);
          res.setHeader("content-type", "audio/mpeg");
          res.setHeader("content-length", data.size);
          res.setHeader("Accept-Ranges", "bytes");
          res.setHeader(
            "Content-Disposition",
            `attachment; filename=${file}.mp3`
          );
          audio.pipe(res);
          return;
        }

        const Download = StreamAudio(Link, {
          filter: "audioonly",
          quality: "highestaudio",
        }).pipe(fs.createWriteStream(`music/${Link}.mp3`));

        Download.on("error", () => console.error("error"));
        Download.on("finish", () => {
          console.log(Link);
          const inputFilePath = `music/${Link}.mp3`;

          const outputFilePath = `music/${Link}converted.aac`;

          const ffmpegProcess = cp.spawnSync(ffmpeg, [
            "-i",
            inputFilePath, // Input audio file
            "-c:a",
            "aac", // Output audio codec (AAC)
            "-b:a",
            "320k", // Set the bitrate to 384 kbps (adjust as needed)
            "-ar",
            "48000", // Set the audio sampling rate to 44.1 kHz (adjust as needed)
            "-q:a",
            "0", // Set the audio quality (adjust as needed, 0 is the best)
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
        
          const audio = fs.createReadStream(`music/${Link}converted.aac`);
          const data = fs.statSync(`music/${Link}.mp3`);
          res.setHeader("content-type", "audio/mpeg");
          res.setHeader("content-length", data.size);
          res.setHeader("Accept-Ranges", "bytes");
          res.setHeader(
            "Content-Disposition",
            `attachment; filename=${file}.mp3`
          );
          audio.pipe(res);
        });
      } catch (error) {
        console.log("error");
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
