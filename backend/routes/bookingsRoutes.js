const  withAuth = require('../middlewares/withAuth');
const Bookings = require('../models/bookings')

const jwt = require('jsonwebtoken')

const bookingsRoutes = (app) => {

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.setHeader('Access-Control-Allow-Headers', 'Origin, userId, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
        next();
      });

    app.get('/bookings', async (req,res) => {
        const bookings = await Bookings.find({})
        res.json({status:200, bookings:bookings})
    })
    
    app.get('/bookings/:id', async (req,res)=> {
            const id = req.params.id
            const bookings = await Bookings.find({_id: id})
            res.json({status:200, bookings:bookings})      
    })

    app.get('/bookings/sort/user', async (req,res)=> {
        // const userId = req.body.userId
        const bookings = await Bookings.find({userId: req.headers.authorization})
        res.json({status:200, bookings:bookings})      
})

    app.post('/bookings/add', async (req,res) => {
        if(!req.body.userId) res.json({status: 401, msg: 'No user ID'})
        const data = {
            userId : req.body.userId,
            roomId: req.body.roomId,
            time: req.body.time,
            date: req.body.date
        }
        const bookings = new Bookings(data)
        const result = await bookings.save()   
        res.json({status:200,result:result})    
    })
    
}

module.exports = bookingsRoutes


