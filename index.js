require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const {env: {PORT, MONGODB_URL}} = process;

const mongoose = require('mongoose');
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true
})
.then(() => {
    console.log("DB connected")
})

.catch((error) => {
    console.log(error);
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use(cors()); 

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const apiRouter = require('./routes/apiRouter');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "client", "build")))
 
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/api', apiRouter);

// app.use('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"))
// });


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));