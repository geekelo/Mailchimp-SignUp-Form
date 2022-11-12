const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require('path');
//const { keys } = require("@material-ui/core/styles/createBreakpoints");
const https = require("https");

const app = express();

app.use( express.static('public'))
app.use( bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){

res.sendFile(__dirname +"/signup.html")

})


app.get("/success", function(req, res){
res.sendFile(__dirname + "/success.html")

})


app.get("/failure", function(req, res){
    res.sendFile(__dirname + "/failure.html")
    
    })

app.post( "/", function(req, res){
let first = req.body.fName;
let last = req.body.lName;
let mail = req.body.email;

// res.write(first)
// res.write(last)
// res.write(mail)
// res.send()

const data = {
 members:[
{
    email_address: mail,
    status: "subscribed",
    merge_fields: {
      FNAME: first,
      LNAME: last
}
}

 ]
}

let membData = JSON.stringify(data);
let url="https://us4.api.mailchimp.com/3.0/lists/7ae0617a6d";
let options={
    method:"POST",
    auth:"erica:96887f3511fe94436e86049fe781f89e-us4"
}
const request = https.request(url, options, function(response){
    response.on('data', function(data){
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")

        }
        console.log (JSON.parse(data));
   

    })
})
 request.write(membData);
 request.end();

})

app.post("/success", function(req, res){
    res.redirect("/")
    
})

app.listen(process.env.PORT || 2000, function(){
    console.log("Server is running at port 2000")
})

// api keys
// 4b96aad4d55b397b1150c821450f8312-us4

// list id
// 7ae0617a6d