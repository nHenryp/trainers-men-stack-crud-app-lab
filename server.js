require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require("method-override");
const { Console } = require('console')

//Models
const Trainer = require('./models/trainer.js')
//const
const app = express()


//middleware
app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

//Routes
app.get('/', (req, res) => {
    return res.render('index')
})

//trainers/new making a form page
app.get('/trainers/new', (req, res) => {
    res.render('trainers/new')
})

//posting from the form page/ creating
app.post('/trainers', async (req, res) => {
    const createdTrainer = await Trainer.create(req.body)
    console.log(createdTrainer)
    res.redirect('/trainers')

})
//displaying index
app.get('/trainers', async (req, res) => {
    const trainers = await Trainer.find()
    console.log(trainers)
    res.render('trainers/index', { trainers })

})

//show route
app.get('/trainers/:trainerId', async (req, res) => {
    const trainerId = (req.params.trainerId)
    const foundTrainer = await Trainer.findById(trainerId)
    res.render('trainers/show', { trainer: foundTrainer })
})

app.delete('/trainers/:trainerId', async (req, res) => {
    const trainerId = req.params.trainerId
    await Trainer.findByIdAndDelete(trainerId)
    res.redirect('/trainers')
})

//edit
app.get('/trainers/:trainerId/edit', async (req, res) => {
    const trainerId = req.params.trainerId
    const foundTrainer = await Trainer.findById(trainerId)
    res.render('trainers/edit', { trainer: foundTrainer })
})


app.put('/trainers/:trainerId', async (req, res) => {
    const trainerId = req.params.trainerId
    await Trainer.findByIdAndUpdate(trainerId, req.body)
    res.redirect(`/trainers/${trainerId}`)
})



const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('database connection made')
        app.listen(process.env.PORT, () => {
            console.log(`server running at ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)

    }
}
connect()