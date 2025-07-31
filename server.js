const app = require('./src/app');
require('dotenv').config();
const connectDB = require('./src/db/db');

// Connect To MongoDb
connectDB();

app.listen(3000,()=>{
    console.log("Sever is running on port 3000");
})

