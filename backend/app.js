const express = require('express');
const app = express();
const {connectDB} = require("./config/db")
const dotenv = require("dotenv")
const userRoutes = require('./routes/userRoutes')
const queueRoutes = require('./routes/queueRoutes')
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB()


// ✅ Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // frontend ka URL
    credentials: true,               // cookies / tokens allow karega
  })
);


app.get('/', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }
    return res.send("API is running")
})

app.use('/user', userRoutes)
app.use('/queue', queueRoutes)

const PORT = 3000;
app.listen(PORT, () =>{
    console.log("Server is running")
})