const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');

require('dotenv').config();

const app = express();
const initRoutes = require('./routes');

const uploadDir = process.env.UPLOAD_DIR || 'uploads/';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    credentials: true,
    origin: '*',
}));

app.use('/uploads', express.static(path.join(__dirname, uploadDir)));

initRoutes(app);

app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({
        message: err.message || 'Server error'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`ASSURMOI RUNNING ON PORT ${PORT}`);
});

module.exports = app;