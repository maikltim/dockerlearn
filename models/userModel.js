const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        require: [true,  "Post must have username"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "Post must have password"],
        unique: true,
    }
})


const User = mongoose.model('Post', userSchema);
module.exports = User;