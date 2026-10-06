 const express = require('express');

 const app =  express();

 app.use(express.json());
 //middleware to parse urlencoded data
app.use(express.urlencoded({ extended: true }));

 // routes

 // event routes
 app.post('/api/events',(req,res) =>{

    const event = req.body;

    console.log(event);

    res.status(201).json({
        message: "event created successfully",
        event: event
    });


 });


 app.listen(5000, () =>{
    console.log('server running on port 5000');
 });