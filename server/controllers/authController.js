const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const { errorHandler } = require('../utils/error');
const Guide = require('../models/Guide');
const multer = require('multer');

const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
};

// Define storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/guidePhotos'); // Specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Specify the filename for the uploaded file
    },
});

// Create multer instance with the defined storage
const upload = multer({ storage: storage });


exports.postSignup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Username or email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User created successfully!' });
    } catch (error) {
        next(error);
    }
};

exports.postLogin = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '100000h',
        });

        const { password: pass, ...userData } = user._doc;

        res.cookie('access_token', token, { httpOnly: true }).status(200).json({
            success: true,
            message: 'Login successful',
            user: userData,
            token,
        });
    } catch (error) {
        next(error);
    }
};

exports.google = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            // User already exists, log in
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.cookie('access_token', token, { httpOnly: true }).status(200).json({
                success: true,
                message: 'Login successful',
                user: { ...existingUser._doc, password: undefined },
                token,
            });
        } else {
            // User does not exist, create a new user with a random password
            const generatePassword = generateRandomPassword();
            const hashedPassword = await bcrypt.hash(generatePassword, 10);

            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase() + generateRandomPassword(),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.cookie('access_token', token, { httpOnly: true }).status(200).json({
                success: true,
                message: 'User created successfully',
                user: { ...newUser._doc, password: undefined },
                token,
            });
        }
    } catch (err) {
        next(err);
    }
};

exports.guideSignup = async (req, res) => {
    try {
        const { guideName, guideEmail, guidePassword } = req.body;

        // Additional validation checks
        if (!guideName || !guideEmail || !guidePassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the guide with the provided email already exists
        const existingGuide = await Guide.findOne({ email: guideEmail });

        if (existingGuide) {
            return res.status(400).json({ error: 'Guide already exists with this email' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(guidePassword, 10);

        // Create a new guide with the file path
        const newGuide = new Guide({
            name: guideName,
            email: guideEmail,
            password: hashedPassword,
            blogs: [],
            guidePhoto: req.file ? req.file.path.replace(/\\/g, "/"): null, // Store the multer-generated file path
        });

        // Save the guide to the database
        const savedGuide = await newGuide.save();

        // Respond with the saved guide, including the multer-generated file path
        return res.status(201).json({
            _id: savedGuide._id,
            name: savedGuide.name,
            email: savedGuide.email,
            guidePhoto: savedGuide.guidePhoto,
            // Add any other fields you want to include in the response
        });
    } catch (error) {
        console.error('Error in guide signup:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.guideLogin = async (req, res, next) => {
    try {
        // const errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //     return res.status(422).json({ success: false, errors: errors.array() });
        // }
        // console.log(req.body);
        const { email, password } = req.body;

        // Find the guide by email
        const guide = await Guide.findOne({ email });

        if (!guide) {
            return res.status(404).json({ success: false, message: 'Guide not found' });
        }

        // Check if the provided password is valid
        const isPasswordValid = await bcrypt.compare(password, guide.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: guide._id }, process.env.JWT_SECRET, {
            expiresIn: '100000h',
        });

        // Omit the password field from the response
        const { password: _, ...guideData } = guide._doc;

        // Set the token in the cookie
        res.cookie('access_token', token, { httpOnly: true }).status(200).json({
            success: true,
            message: 'Login successful',
            guide: guideData,
            token,
        });
    } catch (error) {
        next(error);
    }
};


exports.getSignout = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out');
    } catch (error) {
        next(error);
    }
};
