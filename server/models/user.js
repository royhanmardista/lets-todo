`use strict`
const { hashPassword } = require('../helpers/bcrypt')
const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = Schema({
    username : {
        type : String,
        required : [true, 'you must input username']
    },
    email : {
        type : String,
        required : [true, 'you must enter your email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'please enter a valid email'],
        unique: true
    },
    password : {
        type : String,
        minlength : [6, "minimum password length is 6 characters"],
        required : [true, 'you must enter your password'],
    },    
}, {timestamps : true})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})
userSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator',
    message: '{PATH} has already been used before, please use other'
});



const User = model('User', userSchema)
module.exports = User
