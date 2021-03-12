const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const authRoutes = require('./routes/auth')
const affairRoutes = require('./routes/affair')
const goalRoutes = require('./routes/goal')
const statisticsRoutes = require('./routes/statistics')
const journalRoutes = require('./routes/journal')
const keys = require('./config/keys')
const app = express();

mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('MONGO Connected'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/affair', affairRoutes)
app.use('/api/goal', goalRoutes)
app.use('/api/statistics', statisticsRoutes)
app.use('/api/journal', journalRoutes)

module.exports = app