import express from "express"

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("I am in")
})

app.listen(3000);
