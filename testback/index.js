const express = require("express");

const app = express();

// const port = 3000;

// app.get('/', (req, res) => res.send('Hello World!'));

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
const port = 8000;

const admin = (req,res)=>{
    return res.send("This is admin");
}


app.get("/", (req,res)=>{
    return res.send("Home page");
});
app.get("/login", (req,res)=>{
    return res.send("You are visiting login page");
});
app.get("/signup", (req,res)=>{
    return res.send("THis is a signup page");
});
app.get('/admin',admin)
app.listen(port,()=>{
    console.log("Server is running...");
})
