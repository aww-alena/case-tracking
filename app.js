const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const authRoutes = require('./routes/auth')
const habitRoutes = require('./routes/habit')
const taskRoutes = require('./routes/task')
const goalRoutes = require('./routes/goal')
const statisticsRoutes = require('./routes/statistics')
const journalRoutes = require('./routes/journal')
const keys = require('./config/keys')
const app = express();

mongoose.set('useFindAndModify', false);
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
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/habit', habitRoutes)
app.use('/api/task', taskRoutes)
app.use('/api/goal', goalRoutes)
app.use('/api/statistics', statisticsRoutes)
app.use('/api/journal', journalRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'));

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        )
    })
}

module.exports = app