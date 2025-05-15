require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

// const authRoutes = require('./routes/auth.routes');
// const candidateRoutes = require('./routes/candidate.routes');
// const employeeRoutes = require('./routes/employee.routes');
// const attendanceRoutes = require('./routes/attendance.routes');
// const leaveRoutes = require('./routes/leave.routes');

const { errorHandler } = require('./src/middleware/Error');
const { connectDB } = require("./src/config/mongo");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/api/auth', authRoutes);
// app.use('/api/candidates', candidateRoutes);
// app.use('/api/employees', employeeRoutes);
// app.use('/api/attendance', attendanceRoutes);
// app.use('/api/leaves', leaveRoutes);

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
