const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

module.exports = (req, res, next) => {
    client.verifyIdToken({
        idToken: req.body.google_token,
        audience: process.env.CLIENT_ID,      
    })
    .then( ticket => {
        const payload = ticket.getPayload();
        req.decoded = payload  
        next()  
    })
    .catch(next)   
}