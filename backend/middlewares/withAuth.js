const jwt = require('jsonwebtoken')

function withAuth(req, res, next) {
    const secretToken = process.env.SECRETTOKEN
    const token = req.headers['authorization']
    if(token === null) {
        res.json({status: 401, msg: "no token"})
    }
    jwt.verify(token, secretToken, function(err, decoded) {
        if(err) {
            res.json({status: 401, msg: `bad token: ${err}`})
        }
        req.body._id = decoded._id
        next()
    })
}

module.exports = withAuth