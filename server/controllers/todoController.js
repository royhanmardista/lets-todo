`use strict`
const Todo = require('../models/todo')
const moment = require('moment')

class todoController{
    
    static create(req, res, next) {
        let { title, dueDate, description } = req.body        
        Todo.
            create({
                title : title,
                dueDate : dueDate,
                user : req.user._id,
                description : description
            })                   
            .then( todo => {
                res.status(201).json({
                    todo : todo,
                    message : 'todo succesfully added'
                })
            })
            .catch(next)
    }

    static findAllToday(req, res, next) {
        Todo.
            find({
                user : req.user._id
            }).populate('user',"-password").sort({dueDate : 1})
            .then(todos => {
                let data = todos.filter(todo => {
                    return moment(new Date()).isSame(todo.dueDate, 'day')
                })     
                res.json(data)      
            })
            .catch(next)
    }

    static findAll(req, res, next) {     
        Todo.
            find({
                user : req.user.id
            }).populate('user',"-password").sort({dueDate : 1})
            .then(todos => {  
                res.json(todos)                
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        Todo.
            findById(req.params.id).populate('user',"-password")
            .then(todo => {      
                if (todo) {
                    res.json(todo)
                } else {
                    next({
                        status : 404,
                        message : 'todo not found'
                    })
                }          
            })
            .catch(next)
    }

    static destroy(req, res, next) {
        Todo.
            findByIdAndDelete(req.params.id)
            .then( todo => {
                if (todo) {
                    res.json({
                        todo : todo,
                        message : "todo succesfully deleted"
                    })
                } else {
                    next({
                        status : 404,
                        message : 'todo not found'
                    })
                }
                
            })
            .catch(next)

    }   

    static update(req, res, next) {
        let { title, dueDate, description } = req.body        
        Todo.findOneAndUpdate({ _id : req.params.id}, {title, dueDate, description}, {new : true, runValidators: true})
            .then(todo => {
                if (todo) {
                    res.json({
                        todo : todo,
                        message : 'todo succesfully updated'
                    })
                } else {
                    next({
                        status : 404,
                        message : 'todo not found'
                    })
                }
            })
            .catch(next)
    }

    static updateStatus(req, res, next) {                
        let status = req.body.status || false
        let doneDate = null
        console.log(status)
        if (status == true) {
            doneDate = new Date()
        }        
        Todo.findOneAndUpdate({ _id : req.params.id}, {status, doneDate}, {new : true, runValidators: true})
            .then(todo => {
                if (todo) {
                    res.json({
                        todo : todo,
                        message : 'todo succesfully updated'
                    })
                } else {
                    next({
                        status : 404,
                        message : 'todo not found'
                    })
                }
            })
            .catch(next)
    }
    
}

module.exports = todoController