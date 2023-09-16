require('dotenv').config();
require('./mongo')
const loginRouter = require('./controllers/login')

const express = require('express');
const cors = require('cors');
const userRouter = require('./controllers/user');
const routineRouter = require('./controllers/routine');
const bodyRouter = require('./controllers/bodyTarget');
const app = express();


app.use(cors({
    origin: "*"
  }));
app.use(express.json());


app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);

app.use('/api/routine', routineRouter)

app.use('/api/body',bodyRouter )


app.use((request, response) => {
    response.status(404).json({
        error: 'Not found'
    })
});

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
    console.log(`Server runnig on port ${PORT}`);
});

module.exports = { app, server }
