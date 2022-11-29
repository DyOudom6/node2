const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname +"/signup.html");
})

app.post("/", function(req, res){
  const FirstName = req.body.FName;
  const LastName = req.body.LName;
  const Email = req.body.Email;

  var Data = {
    members : [{
      merge_fields: {
        FNAME : FirstName,
        LNAME : LastName,
      },

      status : "subscribed",
      email_address : Email,
    }
    ]
  }


  const JsonData = JSON.stringify(Data);
  const url = "https://us12.api.mailchimp.com/3.0/lists/7b7cb33390";
  const options = {
    method : "POST",
    auth: "oudom:8ab76ef6bf89cbae336a1e0157e37257-us12"
  }
  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      if(response.statusCode == 200){
        res.sendFile(__dirname +"/success.html");
      }else res.sendFile(__dirname +"fail.html");
    })
  }
)
  request.write(JsonData);
  request.end();
})

app.listen(process.env.PORT || 3000);
//8ab76ef6bf89cbae336a1e0157e37257-us12
