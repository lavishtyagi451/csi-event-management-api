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


    if (!event.name || !event.date ){
    return res.status(400).json({
        message: "Name and date are required"
    });
}

    else if (event.capacity < 0 ) {
    return res.status(400).json({
        message: "capacity cannot be negative"
    });
}


    else if (event.date < new Date().toISOString().split('T')[0]) {
    return res.status(400).json({
        message: "date cannot be in the past"
    });
}

    else{
    res.status(201).json({
        message: "event created successfully",
        event: event
    });
}


 });

 


 app.listen(5000, () =>{
    console.log('server running on port 5000');
 });