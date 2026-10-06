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
//get route to get all events
 router.get('/api/events', async(req,res) =>{
    try{
        const events = await Event.find();
        res.status(200).json({
            message: "events fetched succesfully",
            events: events
        });
    }

    catch (error) {

        res.status(500).json({
            message: "Failed to retrieve events"
        });

    }
 });


 //get route to get an event by id
    router.get('/api/events/:id', async (req, res) => {
    try {
        const event = await Event.findOne({
        eventId: Number(req.params.id)
});
        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event retrieved successfully",
            event: event
        });

    } catch (error) {
        res.status(400).json({
            message: "Invalid event ID"
        });
    }
});
 
//post route to create an event
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

//put route to update an event
router.put('/api/events/:id', async (req, res) => {

    try {

        const updatedEvent = await Event.findOneAndUpdate(
            { eventId: Number(req.params.id) },
            req.body,
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to update event"
        });

    }

});
//delete route to delete an event
router.delete('/api/events/:id', async (req, res) => {

    try {

        const deletedEvent = await Event.findOneAndDelete({
            eventId: Number(req.params.id)
        });

        if (!deletedEvent) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event deleted successfully",
            event: deletedEvent
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to delete event"
        });

    }

});



    




     



module.exports = router;