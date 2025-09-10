const express = require('express');
const app = express();
const {connectDB} = require("./config/db")
const dotenv = require("dotenv")
const userRoutes = require('./routes/userRoutes')
const queueRoutes = require('./routes/queueRoutes')

dotenv.config();

app.use(express.json());
connectDB()

app.get('/', (req, res) => {
    return res.send("API is running")
})

app.use('/user', userRoutes)
app.use('/queue', queueRoutes)

const PORT = 3000;
app.listen(PORT, () =>{
    console.log("Server is running")
})