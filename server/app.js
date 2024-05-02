const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
var cookieParser = require('cookie-parser');
const errorHandler = require('./utils/error');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["https://globe-trotter-private.vercel.app/"],
    methods: ['POST', 'GET', 'HEAD', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
dotenv.config();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "GlobeTrotter API",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:5000/",
            },
            {
                url: "https://globe-trotter-private.onrender.com/"
            }
        ],
    },
    apis: ["./routes/adminRoutes.js", "./routes/authRoutes.js", "./routes/blogRoutes.js", "./routes/confirmation.js",
    "./routes/paymentRoutes.js", "./routes/travelRoutes.js", "./routes/userRoutes.js"],
};
const swaggerSpec = swaggerJsDoc(swaggerOptions);

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

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
