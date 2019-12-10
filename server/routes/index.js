const router = require('express').Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')
const projectRouter = require('./projectRouter')

router.use('/',userRouter)
router.use('/todo',todoRouter)
router.use('/project', projectRouter)

module.exports = router