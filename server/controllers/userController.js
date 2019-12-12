const User = require('../models/user')
const {
    comparePassword
} = require('../helpers/bcrypt')
const {
    generateToken
} = require('../helpers/jwt')

class userController {

    static findByEmail(req, res, next) {
        User.find({
                $or: [{
                    email: req.params.email
                }, {
                    username: req.params.email
                }]

            })
            .then(users => {
                res.json(users)
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        let {
            username,
            email,
            _id
        } = req.user
        res.json({
            message: 'user found',
            user: {
                username,
                email,
                _id
            }
        })
    }

    static register(req, res, next) {
        const {
            email,
            username,
            password
        } = req.body
        User.
        create({
                email,
                username,
                password,
            })
            .then(user => {
                res.status(201).json({
                    message: `user succesfully created`
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    let valid = comparePassword(req.body.password, user.password)
                    if (valid) {
                        let token = generateToken(user)
                        let {
                            username,
                            email,
                            _id
                        } = user
                        res.json({
                            message: 'login succes',
                            token: token,
                            user: {
                                username,
                                email,
                                _id
                            }
                        })
                    } else {
                        next({
                            status: 403,
                            message: 'Wrong Password'
                        })
                    }
                } else {
                    next({
                        status: 404,
                        message: 'User not found'
                    })
                }
            })
            .catch(next)
    }

    static loginGoogle(req, res, next) {
        let {
            email,
            name
        } = req.decoded
        User.findOne({
                email: email
            })
            .then(user => {
                let password = email
                if (!user) {
                    return User.create({
                        email,
                        password,
                        username: name,
                    })
                } else {
                    return user
                }
            })
            .then(user => {
                let {
                    username,
                    email,
                    _id
                } = user
                let token = generateToken(user)
                res.json({
                    status: 200,
                    message: 'login success',
                    token: token,
                    user: {
                        username,
                        email,
                        _id
                    }
                })
            })
            .catch(next)
    }
}

module.exports = userController