const user = require('../models/userModel') 
const bcrypt = require("bcryptjs")

exports.signUp = async (req, res) => {
    const {username, password} = req.body
    
    try {
       const hashpassword = await bcrypt.hash(password, 12)
       const newUser = User.create({
           username,
           password: hashpassword
       })
       res.status(200).json({
           status: 'success',
           data: {
               user: newUser
           }
       })
    } catch(e) {
        res.status(400).json({
            status: false
        })
    }
} 


exports.login = async (req, res) => {
    const {username, password} = req.body
    
    try {
        const user = await User.findOne({username: username})
       if(!user) {
           res.status(404).json({
               status: 'fail',
               message: 'User not found'
           })
       }

       const isCorrect = await bcrypt.compare(password, user.password) 
       if(isCorrect) {
           req.session.user = user;
           res.status(200).json({
               status: 'success'
           })
       } else {
           res.status(400).json({
               status: 'fail'
           })
       }
    } catch(e) {
        res.status(400).json({
            status: false
        })
    }
}