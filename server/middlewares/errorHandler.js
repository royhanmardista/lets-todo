`use stict`
module.exports = (err, req, res, next) => {
    console.log(err)
    if (err.status && err.message ) {
        return res.status(err.status).json({
            message : err.message
        })
    }
    switch (err.name) {
        case 'ValidationError':
            let messages = []
            if (err.errors) {
                for (let index in err.errors) {
                    messages.push(err.errors[index].message)
                }
            } else {
                messages = err.message
            }
            return res.status(400).send({
                message: messages
            })   
        case 'CastError':
            return res.status(400).send({
                message: `id invalid`
            })  
        case 'JsonWebTokenError' : {
            return res.status(400).send({
                message : "invalid token, please don't change the token in your local storage"
            })
        }                 
        default:            
            return res.status(500).send({
                message: 'Internal Server Error'
            })
    }

}


