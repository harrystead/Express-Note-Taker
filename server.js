const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.use("/client", express.static(__dirname + "/client"));

const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

fs.readFile("bd.json", "utf8", (err, data) => {
  if (err) {
    throw err;
  }

  var notes = JSON.parse(data);

  app.get("/api/notes", function (req, res) {
    // Read the db.json file and return all saved notes as JSON.
    res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    notes.push(newNote);
    updateNotes();
  });


  function updateNotes() {
    fs.writeFile("bd.json", JSON.stringify(notes, null, 2), "utf8", (err) => {
      if (err) {
        return console.log(err);
      }
    });
  }

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
});


//------------------------------------------------\\

// app.delete("/api/notes/:id", function (req, res) {
//     readFile((data) => {
//       // add the new user
//       const userId = req.params["id"];
//       delete data[userId];

//       writeFile(JSON.stringify(data, null, 2), () => {
//         res.status(200).send(`users id:${userId} removed`);
//       });
//     }, true);
//   });

//-------------------------------------------------\\

app.listen(port, function () {
  console.log("App listening on PORT " + port);
});
