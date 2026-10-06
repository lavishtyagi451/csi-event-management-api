

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/csi-events");

        console.log("MongoDB connected")
    } catch (error) {
        console.log("MongoDB connection failed");
    }
};


module.exports = connectDB;