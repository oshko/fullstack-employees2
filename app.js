import router from "#api/employees";
import express, { json } from "express";
const app = express();
export default app;

// body parser
app.use(express.json());

//logger
app.use((req, res, next)=>{
    console.log(req.method, req.originalUrl);
    next();
});

app.get("/", (req, res)=>{
    res.send("Welcome to the Fullstack Employees API.");
})

//Employee route
app.use('/employees', router);


// error handle

app.use((err, req, res, next)=>{
    if(err) console.log(err);
    res.status(500).send("Your request have some issue!");
    
});