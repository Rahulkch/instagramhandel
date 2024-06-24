const express=require("express");
const app=express();
const port=process.env.PORT||8000;
require("dotenv").config();
app.use(express.json());
const path = require("path")
// default database
const db=require("./components/db");
db();
const cors=require("cors")
app.use(cors());

// const cors = require('cors')
// const corsOption = {
//     origin: ['http://localhost:3000'],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
// }
// app.use(cors(corsOption));
// routes to all detail 
const x=require("./route/route");
app.use("/route",x)




// serving the page 


app.use(express.static(path.join(__dirname, "./frontendd/build")))

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./frontendd/build/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})
app.listen(port,() => {
    console.log("listen  or ye terminal m chale ga ",port)
})

app.get("/" ,(req,res) => {
   res.send("this is  is edited home page")
})