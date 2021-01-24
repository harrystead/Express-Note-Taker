const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { json } = require("body-parser");

const app = express();
// app.use("/client", express.static(__dirname + "/client"));
app.use(express.static(__dirname));

const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const writeFileAsync = util.promisify(fs.writeFile)
const readFileAsync = util.promisify(fs.readFile)



  app.get("/api/notes", function (req, res) {
    readFileAsync("bd.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      }
    
    var notes = JSON.parse(data);
    res.json(notes);
  });
})

  app.post("/api/notes", function (req, res) {

    readFileAsync("bd.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      }
    
    var notes = JSON.parse(data);
    let newNote = req.body;
    notes.push(newNote);

    //add id to notes.
    let i = 0,
      ln = notes.length;
    for (i; i < ln; i++) {
      notes[i].id = i + 1;
    }

    //-------------\\
    writeFileAsync("bd.json", JSON.stringify(notes, null, 2), "utf8", (err) => {
      if (err) {
        return console.log(err);
      } else {
        return true;
      }
    });
    return console.log("Added new note: " + newNote.title);
  });
});

  //------------------------------------------------\\
  //delete
  app.delete("/api/notes/:id", function (req, res) {

    readFileAsync("bd.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      }
    
    var notes = JSON.parse(data);
    const id = parseInt(req.params.id);
    console.log(id);
    console.log(notes)
    const filNotes = notes.filter(note => note.id !== id)
    console.log(filNotes);

    writeFileAsync("bd.json", JSON.stringify(filNotes, null, 2), (err) => {
      if(err) throw err
    })
    // res.status(200).send(json.parse(filNotes))
  });
});

  //-----------------------------------------------\\

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });

//-------------------------------------------------\\

app.listen(port, function () {
  console.log("App listening on PORT " + port);
});
