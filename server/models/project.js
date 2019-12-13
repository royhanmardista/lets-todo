`use strict`
const { Schema, model } = require('mongoose')
const Todo = require('../models/todo')

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
        min :[new Date,`you can't pick time earlier than today`]
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
    await Todo.deleteMany({ projectId : doc._id}) 
    next()
})

const Project = new model('Project', projectSchema)

module.exports = Project