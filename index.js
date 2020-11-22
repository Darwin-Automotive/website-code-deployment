// const { Router } = require('@material-ui/icons');
let express = require("express");
let app = express();
let nodemailer = require("nodemailer");

// const path = require('path');

// app.use('/public', express.static(path.join(__dirname, 'public')));

var transporter = nodemailer.createTransport({
  host: "smtp.hostinger.in",
  port: 587,
  secure: false,
  auth: {
    user: "sales@darwinautomotive.in",
    pass: "zs$jg1?4",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to receive our messages");
  }
});

app.use(express.json());
app.post("/send", (req, res, next) => {
  console.log(req.body.params);
  console.log(req.body.params.district);
  // console.log(JSON.stringify(req.body.params))
  // console.log(express.json())
  var username = req.body.params.username;
  var email = req.body.params.email;
  var contactNum = req.body.params.contactNum;
  var areaArray = req.body.params.area;
  var districtName = req.body.params.district;
  var Zipcode = req.body.params.Zipcode;
  // console.log(email)
  var content = ` 
    <p>Username: ${username}</p> \n <p>Email: ${email}</p> \n <p>Contact Number: ${contactNum}</p> \n <p>Area: ${areaArray}</p> \n <p>District Name: ${districtName}</p> \n <p>Zipcode: ${Zipcode}</p>`;

  console.log(content);
  var mail = {
    from: email.json,
    to: "sales@darwinautomotive.in, ayush@darwinautomotive.in",
    subject: "Preorder Query",
    html: content,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});

app.post("/sendEmail", (req, res, next) => {
  console.log(req.body.params);
  var email = req.body.params.email;
  var content = `<h4>Email: ${email}</h4>`;

  var mail = {
    from: email.json,
    to: "sales@darwinautomotive.in, ayush@darwinautomotive.in",
    subject: "Marketing mail signup",
    html: content,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});

// const PORT = process.env.PORT || 8080
app.listen(3000, () => console.info(`Server has started on 3000`));
