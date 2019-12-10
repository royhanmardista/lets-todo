`use strict`
const router = require('express').Router()
const userController = require('../controllers/userController')
const loginGoogle = require('../middlewares/googleLogin')
const { authenticate } = require('../middlewares/auth')

router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/login-google', loginGoogle, userController.loginGoogle)
router.get('/user', authenticate, userController.findOne)
router.get('/search/:email', userController.findByEmail)

module.exports = router