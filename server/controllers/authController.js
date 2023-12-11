const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const { errorHandler } = require('../utils/error');

const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
};

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


exports.getSignout = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out');
    } catch (error) {
        next(error);
    }
};
