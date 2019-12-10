`use strict`
const { Schema, model } = require('mongoose')
const Todo = require('../models/todo')
const moment = require('moment')

const projectSchema = new Schema({
    title : {
        type : String,
        required : [true , 'please fill the title']
    },
    description : {
        type : String,
        required : [true, 'please fill the description']
    },
    dueDate : {
        type : Date,
        required : [true, 'please fill the due date'],
        min :[new Date,`you can't pick time earlier than ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}`]
    },
    members : [{
        type : Schema.Types.ObjectId,
        ref : "User"
    }],
    todos : [{
        type : Schema.Types.ObjectId,
        ref : 'Todo'
    }],
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

projectSchema.post('findOneAndDelete', async function(doc, next) {
    console.log('ketrigger', doc._id)
    await Todo.deleteMany({ projectId : doc._id}) 
    next()
})

const Project = new model('Project', projectSchema)

module.exports = Project