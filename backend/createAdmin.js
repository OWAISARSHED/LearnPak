const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); // Adjust path if needed
const bcrypt = require('bcryptjs');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const adminExists = await User.findOne({ email: 'admin@learnpak.com' });

        if (adminExists) {
            console.log('Admin user already exists. RESETTING PASSWORD...');
            // Force reset to fix double-hashing issue
            adminExists.password = 'admin123';
            await adminExists.save(); // Model will hash this
            console.log('Password reset to: admin123');
        } else {
            console.log('Creating new Admin user...');
            const adminUser = await User.create({
                name: 'System Admin',
                email: 'admin@learnpak.com',
                password: 'admin123', // Pass PLAIN TEXT, model pre-save hook will hash it
                role: 'admin',
                isVerified: true
            });

            console.log('Admin Created Successfully');
            console.log('Email: admin@learnpak.com');
            console.log('Password: admin123');
        }

        process.exit();
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
