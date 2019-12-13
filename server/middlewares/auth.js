'use strict'
const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')
const Todo = require('../models/todo')
const Project = require('../models/project')

module.exports = {
    authenticate : (req, res, next) => {
        if (!req.headers.token) {
            next({
                status : 403,
                message : 'you must login first'
            })
        }
        try {    
            const user = verifyToken(req.headers.token)   
            User.findById(user.id)
                .then (user => {
                    if (user) {
                        req.user = user
                        next()
                    } else {
                        next({
                            message : 'user not Found',
                            status : 404
                        })
                    }
                })     
            
        } catch(err) {  
            next(err)    
        }
    },
    authorize : (req, res, next) => {
        Todo.findById(req.params.id)
            .then(todo => {
                if (todo) {   
                    if (String(todo.user) == req.user._id) {
                        next()
                    } else {
                        next({
                            status : 401,
                            message : 'Not Authorized'
                        })
                    }
                } else {
                    next({
                        status : 404,
                        message : 'todo not found'
                    })
                }
            })
            .catch(next)
    },
    projectAuth : (req, res, next) => {
        Project.find({
            _id : req.params.id,
            user : req.user.id,
        })
            .then(project => {
                if (project.length > 0) {
                    next()
                } else {
                    next({
                        status : 403,
                        message : 'not authorized'
                    })
                }
            })
            .catch(next)
    },
    projectTodoAuth : (req, res, next) => {
        Project.find({
            _id : req.params.id,
            $or : [
                {user : req.user.id},
                {members : req.user.id}
            ]
        })
        .then(project => {
            if (project.length > 0) {
                next()
            } else {
                next({
                    status : 403,
                    message : 'not authorized'
                })
            }
        })
        .catch(next)
    } 
} 