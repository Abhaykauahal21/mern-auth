import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.access_token;
        
        // Check if token exists
        if (!token) {
            return res.status(401).json({ 
                status: false,
                message: "Access denied. No token provided."
            });
        }
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ 
                status: false,
                message: "Invalid token."
            });
        }
        
        // Find user by id
        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(404).json({ 
                status: false,
                message: "User not found."
            });
        }
        
        // Attach user to request object
        req.user = user;
        
        // Proceed to the next middleware/route handler
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ 
                status: false,
                message: "Invalid token format."
            });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ 
                status: false,
                message: "Token expired."
            });
        }
        
        res.status(403).json({ 
            status: false,
            message: "Unauthorized access."
        });
    }
};