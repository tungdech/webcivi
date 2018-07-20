const fs = require("fs");
const hostname = "0.0.0.0";
const port = 80;
// Set bodyparser for using body in request
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
app.use(express.static(__dirname + '/public'));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

var thanhtung = {
  name: 'thanhtung',
  // link: "/ha-thu-o-mat-ong-rung",
  link: ".online",
  filePath: __dirname + "/thanhtung123",
  count: 0,
}

var sontung = {
  name: 'sontung',
  // link: "/ha-thu-o-mat-ong-rung-chua-bac-toc",
  link: ".site",
  filePath: __dirname + "/tungts123",
  count: 0
}

app.get("", function (req, res) {
  var account = getAccount(req)
  if (account) account.count++;
  res.sendFile("./public/Vien-Ha-Thu-O-Mat-Ong-Rung1.html", {
    root: __dirname
  });
});

// app.get(thanhtung.link, function (req, res) {
//   thanhtung.count++;
//   res.sendFile("Vien-Ha-Thu-O-Mat-Ong-Rung1.html", { root: __dirname });
// });

// app.get(sontung.link, function (req, res) {
//   sontung.count++;
//   res.sendFile("Vien-Ha-Thu-O-Mat-Ong-Rung1.html", { root: __dirname });
// });

app.get("/tinh-dau-ngai-cuu", function(req, res){
  res.sendFile("./public/tinhdaungaicuu.html"),{
    root: __dirname
  }
})

router.post("/addInfo", function (req, res) {
  console.log(req.body);
  if (!req.body) {
    res.send("error");
    return;
  }
  var account = getAccount(req)
  console.log("Account: " + account.name)
  res.send(req.body.name);
  checkFile(account.filePath, function (isExist) {
    // console.log(isExist + " exitst");
    let date = new Date();
    let time = new Date(date.valueOf() + 7 * 3600 * 1000);
    let line = time.toLocaleString() + ", " +
      req.body.name + ", " + req.body.phone + ", " + req.body.address + "</br>\n ";
    if (!isExist) {
      fs.writeFile(account.filePath, "", "utf8", err => {
        if (err) {
          console.log(err);
          return;
        }
        fs.appendFileSync(account.filePath, line, "utf8");
      });
    } else {
      fs.appendFileSync(account.filePath, line, "utf8");
    }
  });
});

function getAccount(req) {
  //console.log(req.headers)
  try {
    if (req.headers.host.includes(thanhtung.link)) {
      return thanhtung;
    } else return sontung;
  } catch (err) {
    console.log('Loi');
    return sontung
  }
}

function checkFile(path, callback) {
  callback(fs.existsSync(path));
}

router.get("/get123key", function (req, res) {
  // console.log(req.query);
  let text = 'Khong co du lieu'
  let Account = getAccount(req)
  console.log(Account.name);
  // if (req.query.key == myKey) {
  try {
    text = fs.readFileSync(Account.filePath, 'utf8').toString();
    res.send(text + '</br> Truy cap: ' + Account.count);
  } catch (err) {
    res.send('Khong co du lieu')
  }
  // } else {
  //   res.send("Sorry");
  // }
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
});
