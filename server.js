const fs = require("fs");
const http = require("http");
const PORT =(process.env.PORT || 5000);
const time = Date().toString();// getting the current time
//using HTTP createServer
/*fs.writeFile('Date/date_time.txt',time,(err)=>{//writing the current time to the 
    if(err) throw err;
    console.log("Data saved Successfully");
});
fs.readFile('Date/date_time.txt',function(err,dt){
    if(err)
        throw err;
    http.createServer(function(req,res){
        res.writeHeader(200,{"Content-Type": "text/html"});
        res.write(dt);
        res.end();
    }).listen(PORT,()=>{console.log("Listening to port"+PORT);});
})*/

//process.env.PORT

//Using Express
const express = require("express");
const app =  express();
app.use(express.json());
app.get('/',function(req,res){// to read the content of the file and send it as response
    fs.readFile('Date/date.txt','UTF8',function(err,dt){
        if(err)
            throw err;
        else
        {
            res.json([{
                currentTime:dt
            }]);
        }
    })
})
app.post('/',function(req,res){//to get request from postman and write the body in file
    let data = req.body.time.toString();
    fs.writeFile('Date/date.txt',data,(err)=>{
        if(err) throw err;
        let arr = [
            {
                message:"Data saved Successfully",
                savedData:data
            }
        ]
        res.json(arr);//to show success message
    });
})
app.listen(PORT,()=>{console.log("Listening to "+PORT);});
