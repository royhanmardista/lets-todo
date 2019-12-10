`use strict`
const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'you must fill the title'],
    },    
    dueDate : {
        type : Date,
        required : [true, 'you must fill the due date'],
        min :[new Date, `you can't pick time earlier than today`]
    },
    status : {
        type : Boolean,
        default : false
    },
    doneDate : {
        type : Date,
        default : null
    },
    description : {
        type : String,
        required : [true, 'you must fill the description']
    },
    user : {type : Schema.Types.ObjectId, ref: 'User' },
    projectId : {type : Schema.Types.ObjectId, ref : 'Project'}    
})

const Todo = model('Todo', todoSchema)
module.exports = Todo