const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use("/client", express.static(__dirname + "/client"));

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//------------------------------------------------\\

const notesData = [
  {
    title: "hello",
    text: "foejdjoejd",
  },
];

//---------------------------------------------------\\

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("bd.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(data));
  });
});

//-------------------------------------------------\\

app.post("/api/notes", function (req, res) {
  const newNote = req.body;
  notesData.push(newNote);
  const noteDataString = JSON.stringify(notesData, null, 2);
  console.log(noteDataString);

  fs.writeFile("bd.json", noteDataString, (err) => {
    if (err) return console.log(err);
  });
});

//------------------------------------------------\\

app.listen(port, function () {
  console.log("App listening on PORT " + port);
});
