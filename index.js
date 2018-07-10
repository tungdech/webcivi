const http = require("http");
const fs = require("fs");
const hostname = "0.0.0.0";
const port = 80;
const filePath = __dirname + "/accList";
const myKey = "tung";
// Set bodyparser for using body in request
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
app.use(express.static(__dirname));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.get("", function(req, res) {
  res.sendFile("Vien-Ha-Thu-O-Mat-Ong-Rung1.html", { root: __dirname });
});
router.post("/addInfo", function(req, res) {
  var res = res;
  var req = req;
  console.log(req.body);
  if (!req.body) {
    res.send("error");
    return;
  }
  res.send(req.body.name);
  checkFile(filePath, function(isExist) {
    console.log(isExist + " exitst");
    let line =
      req.body.name + ", " + req.body.phone + ", " + req.body.address + "\n";
    if (!isExist) {
      fs.writeFile(filePath, "", "utf8", err => {
        if (err) {
          console.log(err);
          return;
        }
        fs.appendFileSync(filePath, line, "utf8");
      });
    } else {
      fs.appendFileSync(filePath, line, "utf8");
    }
  });
});

function checkFile(path, callback) {
  callback(fs.existsSync(path));
}

router.get("/get", function(req, res) {
  console.log(req.params.key);
  if (req.params.key == myKey) {
    let text = fs.readFileSync(filePath);
    res.send(test);
  } else {
    res.send("Sorry");
  }
});

app.use("/", router);

app.listen(port, () => {
   console.log(`Server running at http://${hostname}:${port}/`)
});
