const router = require('express').Router()
const todoController = require('../controllers/todoController')
const { authenticate, authorize }  = require('../middlewares/auth.js')

router.use(authenticate)
router.post('/',todoController.create)
router.get('/',todoController.findAllToday)
router.get('/all',todoController.findAll)
router.get('/:id',todoController.findOne)
router.delete('/:id',authorize,todoController.destroy)
router.put('/:id',authorize, todoController.update)
router.patch('/:id/status', authorize, todoController.updateStatus)

module.exports = router