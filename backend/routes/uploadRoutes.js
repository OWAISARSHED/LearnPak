const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }, // 100MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// Check file type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|mp4|mp3|pdf|doc|docx/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Videos, Audios, PDFs, and Images Only!');
    }
}

// @desc    Upload file
// @route   POST /api/upload
// @access  Public
router.post('/', upload.single('file'), (req, res) => {
    console.log('Upload route hit');
    if (req.file) {
        console.log('File uploaded:', req.file.path);
        res.send(`/${req.file.path.replace(/\\/g, "/")}`);
    } else {
        console.error('No file uploaded');
        res.status(400).send('No file uploaded');
    }
});

module.exports = router;
