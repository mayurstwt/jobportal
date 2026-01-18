const User = require("../users/user.model");
const { hashPassword, comparePassword } = require("../../utils/password");
const jwt = require("jsonwebtoken");


const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
}



const register = async (req,res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        

        const user = new User({
            name,
            email,
            password: await hashPassword(password),
            role
        });

        await user.save();
        console.log("User registered successfully:", user);


        res.status(201).json({
            token: generateToken(user),
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        })  


        

    } catch (error) {
        console.log("Error registering user", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.json({
            token: generateToken(user),
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            }
        })
    } catch (error) {
        console.log("Error logging in user", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    register,
    login
}