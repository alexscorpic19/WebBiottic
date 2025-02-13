import { Request, Response, NextFunction } from 'express';
import mongoose, { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import Joi from 'joi';

// User Interface
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

// User Schema
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov)$/i, 'Invalid email format']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    }
}, {
    timestamps: true,
    optimisticConcurrency: true
});

// Password validation middleware
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(12);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            return next(error as Error);
        }
    }
    next();
});

// Create User Model
export const User = model<IUser>('User', userSchema);

// Joi Validation Schema
const userValidationSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[a-zA-Z0-9_]+$/)
        .messages({
            'string.pattern.base': 'Username can only contain letters, numbers, and underscores'
        }),
    email: Joi.string()
        .email({ tlds: { allow: ['com', 'net', 'org', 'edu', 'gov'] } })
        .required()
        .lowercase(),
    password: Joi.string()
        .min(8)
        .required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .messages({
            'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character'
        })
});

// User Creation Controller
export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate request body
        const { error, value } = userValidationSchema.validate(req.body, { abortEarly: false });
        
        if (error) {
            return res.status(400).json({
                message: 'Validation Error',
                errors: error.details.map(detail => detail.message)
            });
        }

        const { username, email, password } = value;

        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists',
                details: existingUser.email === email 
                    ? 'Email is already registered' 
                    : 'Username is already taken'
            });
        }

        // Create new user
        const user = new User({ username, email, password });
        const savedUser = await user.save();

        // Return response without sensitive data
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        });
    } catch (error) {
        // Comprehensive error handling
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({
                message: 'Mongoose Validation Error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        // Pass other errors to error handling middleware
        next(error);
    }
};

export default { createUserController };
