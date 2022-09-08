let express = require("express");
let app = express();
let cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//array of objects
let webprojects = [
  {
    id: 1,
    title: "Card Flip Game",
    description: "Card Flip Memory game created with React app.",
    URL: "http://go/my/online",
  },
  {
    id: 2,
    title: "Online store",
    description: "Online store created with HTML, CSS and JavaScript.",
    URL: "https://git.com/myrepos/shop/index",
  },
];

//get request
app.get("/api/getInformation", function (req, res) {
  res.send(webprojects);
});

//post request
app.post("/api/addNewInfo/", (req, res) => {
  let id = webprojects.length + 1;
  let newProject = {
    id: id,
    title: req.body.title,
    description: req.body.description,
    URL: req.body.URL,
  };

  webprojects.push(newProject);
  res.send(webprojects);
});

//delete request
app.delete("/api/:deleteItem", function (req, res) {
  webprojects = webprojects.filter((data) => {
    return data.id != req.params.deleteItem;
  });
  res.send(webprojects);
});

//update information request
app.put("/api/updateProject/:id", (req, res) => {
  let checkID = webprojects.filter((data) => {
    return data.id == req.params.id;
  });
  if (checkID.length != 0) {
    webprojects.map((data) => {
      if (data.id == req.params.id) {
        if (req.body.title) {
          data.title = req.body.title;
        }
        if (req.body.description) {
          data.description = req.body.description;
        }
        if (req.body.URL) {
          data.URL = req.body.URL;
        }
      }
    });
    res.send(webprojects);
  } else {
    res.send({ message: "Project not found" });
  }
});

//error thrown message
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
