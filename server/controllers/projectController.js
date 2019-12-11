'use strict'
const Project = require('../models/project')
const User = require('../models/user')
const Todo = require('../models/todo')

class projectController { 

    static update(req, res, next) {
        let { title, dueDate, description } = req.body        
        Project.findOneAndUpdate({ _id : req.params.id}, {title, dueDate, description}, {new : true, runValidators: true})
            .then(project => {
                if (project) {
                    res.json({
                        project : project,
                        message : 'todo succesfully updated'
                    })
                } else {
                    next({
                        status : 404,
                        message : 'project not found'
                    })
                }
            })
            .catch(next)
    }

    static updateTodoStatus(req, res, next) {
        let status = req.body.status || false
        let doneDate = null
        if (status == 'true') {
            doneDate = new Date()
        }
        Todo.findOneAndUpdate({ _id : req.params.todoId}, {status, doneDate}, {new : true, runValidators: true})
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
    
    static updateTodo(req, res, next) {
        let { title, dueDate, description } = req.body        
        Todo.findOneAndUpdate({
                _id : req.params.todoId
            }, 
            {
                title,
                description,
                dueDate
            },{new : true, runValidators: true})
            .then(todo => {
                if (todo) {
                    res.json({
                        message : 'todo has been updated',
                        todo,
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
    
    static deleteTodo(req, res, next) {     
        let projectData = {}   
        Project.findOneAndUpdate({
            _id : req.params.id,
            todos : {$in : req.params.todoId}
            }, 
            {
                $pull : {todos : req.params.todoId}
            }, {new : true, runValidators : true})
            .then(project => {
                if (project) {
                    projectData = project
                    return Todo.findOneAndDelete({
                            _id : req.params.todoId
                        })
                } else {
                    throw({
                        status : 404,
                        message : 'project or todo not found'
                    })
                }
            })
            .then(todo => {
                if (todo) {
                    res.json({
                        message : 'todo succesfully deleted',
                        project : projectData,
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

    static addTodo(req, res, next) {
        let { title, dueDate, description } = req.body    
        console.log('masuk addTodo', title, dueDate, description)    
        Todo.
            create({
                title : title,
                dueDate : dueDate,
                projectId : req.params.id,
                description : description
            })                   
            .then( todo => {
                return Project.findOneAndUpdate(
                        {
                            _id : req.params.id
                        }, 
                        {
                            $push : {todos : todo}
                        },{new : true, runValidators : true})            
            })
            .then(project => {
                if (project) {
                    res.json({
                        message : 'adding todo success',
                        project,
                    })                    
                } else {
                    next({
                        status : 400,
                        message : 'adding todo fail'
                    })
                }
            })
            .catch(next)
    }

    static create(req, res, next) {
        let { title, description, dueDate } = req.body        
        Project
            .create({
                title,
                description,
                user : req.user._id,
                members : req.user._id,
                dueDate
            })
            .then(project => {
                res.status(201).json({
                    project,
                    message : 'project successfully created'
                })
            })
            .catch(next)
    }

    static destroy(req, res, next) {
        Project.findOneAndDelete({
                _id : req.params.id
            })
            .then(project => {
                if (project) {                    
                    res.json({
                        project,
                        message : 'project succesfully deleted'
                    })
                }else {
                    next({
                        status : 404,
                        message : 'project not found'
                    })
                }
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        Project.findById(req.params.id)
            .populate('members', "-password")  
            .populate('todos')   
            .populate('user',"-password")       
            .then(project => {
                if (project) {
                    res.json(project)
                } else {
                    next({
                        status : 404,
                        message : 'project not found'
                    })
                }
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        Project
            .find({
                $or : [
                    {user : req.user.id},
                    {members : req.user.id}
                ]    
            })
            .populate('todos')
            .populate('members')
            .populate('user',"-password")
            .sort({updatedAt : 1})
            .then(projects => { 
                res.json(projects)                
            })
            .catch(next)
    }

    static addMember(req, res, next) {        
        let { newMember } = req.body
        User.findById(newMember)
            .then(user => {
                if (user) {
                    return Project.findOneAndUpdate({
                                _id : req.params.id, 
                                members : {$nin : newMember}
                            }, 
                            {
                                $push : {members : newMember}
                            }, {new : true, runValidators : true})
                } else {
                    throw({
                        status : 404,
                        message : 'we cannot find the new member in our database'
                    })
                }
            })
            .then( project => {
                if (project) {                    
                    res.json({
                        message : 'add member success',
                        project
                    })
                } else {
                    next({
                        status : 400,
                        message : 'the new member has already been added before'
                    })
                }
            })
            .catch(next)
    }

    static removeMember(req, res, next) {        
        let newMember  = req.params.memberId
        User.findById(newMember)
            .then(user => {
                if (user) {                    
                    return Project.findOneAndUpdate({
                                _id : req.params.id, 
                                members : {$in : newMember},
                                user : {$ne : newMember}
                            }, 
                            {
                                $pull : {members : newMember}
                            }, {new : true, runValidators : true})
                } else {
                    throw({
                        status : 404,
                        message : 'we cannot find the member in our database'
                    })
                }
            })
            .then( project => {
                if (project) {                    
                    res.json({
                        message : 'remove member success',
                        project
                    })
                } else {
                    next({
                        status : 400,
                        message : 'you cannot delete the admin of this project'
                    })
                }
            })
            .catch(next)
    }
}

module.exports = projectController