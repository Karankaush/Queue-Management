const mongoose = require('mongoose')

const connectDB = async() =>{
    try{
        
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected");
        
    } catch(error){
        console.log("DB connection failed");
        console.error(`${error.message}`)
    }
}

module.exports = {connectDB}