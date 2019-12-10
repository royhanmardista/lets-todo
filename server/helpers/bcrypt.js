`use strict`
const bcrypt = require('bcryptjs')

module.exports = {
    hashPassword : (password) => {
        // this function will hash the password before being saved in server
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        return hash
    },
    comparePassword : (password, passwordHash) => {
        // this function will compare password(input) with hashPassword(database)
        return bcrypt.compareSync(password, passwordHash)
    }
}