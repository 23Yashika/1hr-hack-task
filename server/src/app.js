import express from 'express';
const app = express();
app.get("/",(res,req)=>{
    res.status(200).send("sb chal rha h");
})
app.listen(5000);