const express = require('express');
const app = express()
const postRoutes = require('./routes/post.routes');
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);

module.exports = app;

