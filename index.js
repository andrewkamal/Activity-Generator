import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  var type = req.body.type;
  var participants = req.body.participants;
  await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`).then((response) => {
    console.log(response.data);
    var random = Math.floor(Math.random()*response.data.length);
    console.log(response.data[random]);
    res.render("index.ejs", { result: response.data[random] });
  }).catch((error) => {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
