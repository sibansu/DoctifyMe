const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI)
        if(conn){
            console.log(`Connected with host ${mongoose.connection.collections[0]}`);
        }
    } catch (error) {
        console.log(`monog error ${error.message}`);
    }
}

module.exports = connectDB;