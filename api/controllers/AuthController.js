import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const Register = async (req, res) => {
    try {
        const {name , email, password} = req.body;
        
        //check if user not registered
        const checkRegistrationStatus = await User.findOne({
            email
        })
        if (checkRegistrationStatus) {
            return res.status(400).json({ message: "User already registered" });
        }

        //create new user

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newregistration = new User ({
            name,
            email,
            password : hashedPassword
        })

        const savedUser = await newregistration.save();

        if (savedUser) {
            return res.status(201).json({
            status: true,
            message: "User registered successfully"
         });
}


        if (!savedUser) {
            return res.status(500).json({ message: "Error saving user" });
        }

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if user is registered
        const user = await User.findOne({ email }).lean().exec();
        if (!user) {
            return res.status(400).json({ message: "User not registered please Create an account" });
        }

        //check password

        const isPasswordValid = await bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        //generate JWT token

        delete user.password; // Remove password from user object before sending

       
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.cookie("access_token", token,{
            httpOnly: true,
            
        })
        res.status(200).json({
            status: true,
            message: "User logged in successfully",
            

        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const Logout = async (req, res) => {
    try {
        // Clear the access_token cookie
        res.clearCookie("access_token");
        
        return res.status(200).json({
            status: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
