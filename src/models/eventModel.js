const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    
    eventId: {
    type: Number,
    required: true,
    unique: true
},
    
    
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
     venue: {
        type: String,
        required: true,
     },
     capacity: {
        type: Number,
        required: true,
     },
     status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'],
        default: 'upcoming',
     }
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;