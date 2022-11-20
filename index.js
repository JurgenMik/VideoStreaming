const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', function(req, res) {
   res.sendFile(__dirname + '/index.html');
});

app.get('/stream', function(req, res) {
   const range = req.headers.range;

   if (!range) {
      res.status(400).send("Range header is required");
   }
   const videoPath = './mp4/sample-30s.mp4';
   const videoSize = fs.statSync('./mp4/sample-30s.mp4').size;
   const CHUNK_SIZE = 10 ** 6;
   const start = Number(range.replace(/\D/g, ""));
   const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
   const contentLength = end - start + 1;
   const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
   };
   res.writeHead(206, headers);
   const videoStream = fs.createReadStream(videoPath, {start, end});
   videoStream.pipe(res);
});

const PORT = 3003
app.listen(PORT, () => console.log(`Server started on ${PORT}`));