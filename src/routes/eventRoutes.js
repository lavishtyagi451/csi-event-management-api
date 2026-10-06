 const express = require('express');
 const Event = require('../models/eventModel'); 
const router = express.Router();

 //middleware to parse urlencoded data
router.use(express.urlencoded({ extended: true }));

 // routes

 // event routes
 router.get('/api',(req,res) =>{

     res.send("Welcome to the Event Management API");
 });

 router.post('/api/events',async(req,res) =>{

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

    const savedEvent = await Event.create(event);
    res.status(201).json({
        message: "event created successfully",
        event: savedEvent
    });
    
})

    




     



module.exports = router;