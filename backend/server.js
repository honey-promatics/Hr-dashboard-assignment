require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const authRoutes = require('./src/routes/Auth');
const candidateRoutes = require('./src/routes/Candidate');
const employeeRoutes = require('./src/routes/Employee');
const attendanceRoutes = require('./src/routes/Attendence');
const leaveRoutes = require('./src/routes/Leave');
const { uploadMedia } = require("./src/middleware/Upload")

const { errorHandler } = require('./src/middleware/Error');
const { connectDB } = require("./src/config/mongo");

const app = express();

// const corsOptions = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: "Content-Type, Authorization",
// };

app.use(cookieParser());
// app.use(cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
// }));
app.use(cors({
    // origin: "https://hr-dashboard-88164.web.app/",
    origin: "*",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }
}));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.post('/api/upload', uploadMedia)

app.get("/", (req, res) => {
    return res.send("Welcome to HR Dashboard");
});

app.use((req, res, next) => {
    const error = {
        message: "Route not found",
        status: 404,
        timestamp: new Date(),
    };
    res.status(404).json({ error });
});


app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
    console.log("****************************");
    console.log(
        `*    Starting ${process.env.ENV === "local" ? "HTTP" : "HTTPS"} Server`
    );
    console.log(`*    Port: ${process.env.PORT || 5000}`);
    console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`*    Database: MongoDB`);
    console.log(`*    DB Connection: OK\n****************************\n`);
});
connectDB()
