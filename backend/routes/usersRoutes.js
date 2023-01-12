const Users = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const withAuth = require('../middlewares/withAuth')
const saltRounds = 10

const usersRoutes = (app) => {
    // Ces headers permettent :
// d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
// d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
// d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
        next();
      });

    app.get('/users', async (req,res) => {
        const users = await Users.find({})
        res.json({status:200, users:users})
    })

    app.get('/users/:id', async (req,res)=> {
            const id = req.params.id
            const user = await Users.find({_id: id})
            res.json({status:200, user:user})
    })

    app.post('/users/add', async (req,res) => {
        bcrypt.genSalt(saltRounds, async function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                const user = new Users({
                    ...req.body,
                    password: hash
                })
                const result = await user.save()
                res.json({status:200, result:result})
            })
        })
    })

    app.post('/login', async (req, res) => {
        const user = await Users.find({email: req.body.email})
        if(user.length === 0) {
            res.json({status:404, msg: "email doesn't exist"})
        } else {
            const matchPassword = await bcrypt.compare(req.body.password, user[0].password)
            if(matchPassword) {
                const token = jwt.sign({_id:user[0]._id}, process.env.SECRETTOKEN , {expiresIn: '1h'})
                res.json({status:200, token, user:user})
            }
            else {
                res.json({status: 401, msg:'bad password'})
            }
        }
    })

    app.get('/checkToken', withAuth, async(req, res) => {
        const user = await Users.find({_id: req.body._id})
        res.json({status: 200, msg: "token ok", user:user[0]})
    })
}

module.exports = usersRoutes