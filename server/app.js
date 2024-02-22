const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
var cookieParser = require('cookie-parser');
const errorHandler = require('./utils/error');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Create a writable stream for the logs
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'LOGS', 'access.log'), { flags: 'a' });

// Use morgan middleware for logging to a file
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['POST', 'GET', 'HEAD', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
dotenv.config();

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Database connected!'))
    .catch(err => console.error(err));

// Middleware
app.use(express.json());
app.use(cookieParser());

// // Routes
app.use('/api' , require('./routes/confirmation'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/get', require('./routes/travelRoutes'));
app.use('/api/payment' , require('./routes/paymentRoutes'));
app.use('/api/blog' , require('./routes/blogRoutes'));
app.use(errorHandler);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});
