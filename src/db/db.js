const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MOngo Db CConnected");
    })
}

module.exports = connectDB;
