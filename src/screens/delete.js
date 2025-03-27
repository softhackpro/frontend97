const express = require("express");
const axios = require("axios");
const cors = require("cors");
const http = require("http");
const { initializeSocket } = require("./socket");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const BASE_URL = "https://api.cricketid.xyz"; // Defined the BASE_URL

// Fetch match details (GET)
app.get("/get-matchdetails", async (req, res) => {
  const { gmid, sid } = req.query; // Changed from req.body to req.query for GET requests
  try {
    const response = await axios.get(`${BASE_URL}/getDetailsData?gmid=${gmid}&sid=${sid}`);
    console.log("GET request for match details");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching matchlist:", error.message);
    res.status(500).send("Error fetching matchlist");
  }
});

app.post("/get-matchdetails", async (req, res) => {
  const { gmid, sid } = req.body;
  try {
    const response = await axios.get(`${BASE_URL}/getDetailsData?gmid=${gmid}&sid=${sid}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching matchdetail:", error.message);
    res.status(500).send("Error fetching matchdetail");
  }
});

app.get("/stream", async (req, res) => {
  const videoUrl = "https://res.cloudinary.com/dowylsrxx/video/upload/v1737595751/o2office/y6rbvqutyzaginziylvc.mp4";

  try {
    const response = await axios({
      method: "get",
      url: videoUrl,
      responseType: "stream",
    });

    res.setHeader("Content-Type", "video/mp4");
    response.data.pipe(res);
  } catch (error) {
    console.error("Error fetching video:", error.message);
    res.status(500).send("Error fetching video");
  }
});

app.get("/get-video/:id", async (req, res) => {
  try {
    const videoId = req.params.id;
    console.log(videoId, "kya hai video id");
    const response = await axios.get(`${BASE_URL}/casino/tv_url?type=${videoId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data, "from get-video")
    const videoUrl = response.data.tv_url;

    res.send(`
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Player</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }
        iframe {
            width: 100vw;
            height: 100vh;
            border: none;
        }
    </style>
</head>
<body>
    <iframe src="${videoUrl}" allowfullscreen></iframe>
</body>
</html>
    `);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).send("Error fetching video");
  }
});

app.get("/get-allsports", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/allSportid`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching allsports:", error.message);
    res.status(500).send("Error fetching allsports");
  }
});

app.get("/get-matchlist/:id", async (req, res) => {
  const matchid = req.params.id;
  try {
    const response = await axios.get(`${BASE_URL}/esid?sid=${matchid}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching matchlist:", error.message);
    res.status(500).send("Error fetching matchlist");
  }
});

app.get("/get-allsportsmatchlist", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/tree`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching matchlist:", error.message);
    res.status(500).send("Error fetching matchlist");
  }
});

app.post("/get-bookmaker", async (req, res) => {
  const { gmid, sid } = req.body;
  try {
    const response = await axios.get(`${BASE_URL}/getPriveteData?gmid=${gmid}&sid=${sid}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching bookmaker:", error.message);
    res.status(500).send("Error fetching bookmaker");
  }
});

app.get("/get-livesports", async (req, res) => {
  const { gmid, sid } = req.query;
  try {
    const response = await axios.get(`${BASE_URL}/tv_url?gmid=${gmid}&sid=${sid}`);
    const videoUrl = response.data.tv_url;
   console.log(videoUrl)
    res.send(`
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Player</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }
        iframe {
            width: 100vw;
            height: 100vh;
            border: none;
        }
    </style>
</head>
<body>
    <iframe src="${videoUrl}" allowfullscreen></iframe>
</body>
</html>

    `);
  } catch (error) {
    console.error("Error fetching livesports:", error);
    res.status(500).send("Error fetching livesports");
  }
});
app.get("/get-score", async (req, res) => {
    const { gtv, sid } = req.query;
    try {
      const response = await axios.get(`${BASE_URL}/score?gtv=${gtv}&sid=${sid}`);
      const videoUrl = response.data.tv_url;
     console.log(videoUrl)
      res.send(`
        <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Video Player</title>
      <style>
          body, html {
              margin: 0;
              padding: 0;
              width: 100vw;
              height: 100vh;
              overflow: hidden;
          }
          iframe {
              width: 100vw;
              height: 100vh;
              border: none;
          }
      </style>
  </head>
  <body>
      <iframe src="${videoUrl}" allowfullscreen></iframe>
  </body>
  </html>
  
      `);
    } catch (error) {
      console.error("Error fetching score:", error);
      res.status(500).send("Error fetching score");
    }
  });
app.get("/get-casinotable", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/casino/tableid`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching casinotable:", error.message);
    res.status(500).send("Error fetching casinotable");
  }
});

app.get("/get-allcasino/:id", async (req, res) => {
  const matchid = req.params.id;
  try {
    const response = await axios.get(`${BASE_URL}/casino/data?type=${matchid}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching allcasino:", error.message);
    res.status(500).send("Error fetching allcasino");
  }
});

app.post("/get-casinoresult", async (req, res) => {
  const { type, mid } = req.body;
  try {
    const response = await axios.get(`${BASE_URL}/casino/detail_result?type=${type}&mid=${mid}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching casinoresult:", error);
    res.status(500).send("Error fetching casinoresult");
  }
});

app.get("/cross-video", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3000/get-video");
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching:", error.message);
    res.status(500).send("Error fetching");
  }
});

initializeSocket(server);

// Start server
const PORT = process.env.PORT || 4004;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
