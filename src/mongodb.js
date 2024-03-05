const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/users")
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});

const UserSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        unique: true // Assuming userid is unique
    },
    password_hash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

const collections = mongoose.model('collections', UserSchema);

module.exports = collections;

