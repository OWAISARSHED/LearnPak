const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();

// Configure Cloudinary with credentials from .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Storage Engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'learnpak_uploads', // Folder in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'pdf', 'doc', 'docx'],
        resource_type: 'auto', // Auto-detect (image/video/raw)
    },
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

// @desc    Upload file to Cloudinary
// @route   POST /api/upload
// @access  Public
router.post('/', upload.single('file'), (req, res) => {
    console.log('Upload route hit');
    try {
        if (req.file) {
            console.log('File uploaded to Cloudinary:', req.file.path);
            res.send(req.file.path); // Send the full Cloudinary URL
        } else {
            console.error('No file uploaded');
            res.status(400).send('No file uploaded');
        }
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).send('Upload failed');
    }
});

module.exports = router;
