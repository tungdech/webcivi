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

var tieuduong = {
  name: 'tieuduong',
  link: "suckhoevadoisong.online",
  filePath: __dirname + "/tieuduong123",
  count: 0,
}

var bactocharuShop = {
  name: 'bactocharushop',
  link: 'bactocharu.shop',
  filePath: __dirname + "/hto-haru_file",
  count: 0,
}

var phukienhay = {
  name: "phukienhay",
  link: "phukienhay"
}

var sontung = {
  name: 'sontung',
  // link: "/ha-thu-o-mat-ong-rung-chua-bac-toc",
  link: "suckhoevadoisong.site",
  filePath: __dirname + "/tungts123",
  count: 0
}

app.get("", function (req, res) {
  var account = getAccount(req)
  if (account) account.count++;
  if (account && account.name == "tieuduong") {
    res.sendFile("./public/tieuduonghvqy2.html", {
      root: __dirname
    });
  } else if (account.name == "phukienhay") {
    res.sendFile("./public/vongco.html", {
      root: __dirname
    });
  } else {//(account.name == "bactocharushop")
    res.sendFile("./public/hto-haru.html", {
      root: __dirname
    });
  }
  // else {
  //   res.sendFile("./public/Vien-Ha-Thu-O-Mat-Ong-Rung1.html", {
  //     root: __dirname
  //   });
  // }
});

// app.get(sontung.link, function (req, res) {
//   sontung.count++;
//   res.sendFile("Vien-Ha-Thu-O-Mat-Ong-Rung1.html", { root: __dirname });
// });

app.get("/tinh-dau-ngai-cuu", function (req, res) {
  res.sendFile("./public/tinhdaungaicuu.html", {
    root: __dirname
  })
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
  try {
    // return bactocharuShop;
    if (req.headers.host.includes(tieuduong.link)) {
      return tieuduong;
    } else if (req.headers.host.includes(phukienhay.link)) {
      return phukienhay;
    } else if (req.headers.host.includes(bactocharuShop.link)){
      return bactocharuShop;
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
