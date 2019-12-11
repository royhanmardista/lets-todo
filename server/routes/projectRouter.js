'use strict'
const router = require('express').Router()
const projectController = require('../controllers/projectController.js')
const { authenticate, projectAuth , projectTodoAuth} = require('../middlewares/auth')

router.use(authenticate)
router.post('/', projectController.create)
router.get('/', projectController.findAll)
router.get('/:id', projectController.findOne)
router.delete('/:id', projectAuth, projectController.destroy)
router.put('/:id', projectAuth, projectController.update)
router.put('/:id/member', projectAuth, projectController.addMember)
router.put('/:id/todo', projectTodoAuth, projectController.addTodo)
router.put('/:id/todo/:todoId', projectTodoAuth, projectController.updateTodo)
router.put('/:id/delete/todo/:todoId', projectTodoAuth, projectController.deleteTodo)
router.patch('/:id/status/:todoId', projectTodoAuth, projectController.updateTodoStatus)
router.put('/:id/remove/member/:memberId', projectAuth, projectController.removeMember)

module.exports = router