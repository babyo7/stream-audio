const express = require("express");
const StreamAudio = require("ytdl-core");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.static('./'))

app.get("/", async (req, res) => {
    try {
        const link = req.query.url;
        if (link) {
          const id = StreamAudio.getVideoID(link);
         if(fs.existsSync(`./music/${id}.mp4`)){
             res.send(`/music/${id}.mp4`)
             return
         } 
          const url = StreamAudio(link,{filter:'videoandaudio',quality:'highestvideo'}).pipe(fs.createWriteStream(`./music/${id}.mp4`))
          url.on('finish',()=>{
              res.send(`/music/${id}.mp4`);
          })
        } else {
          res.json({ message: "url not provided" });
        }
    } catch (error) {
        res.json({error: error.message});
    }

});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;
