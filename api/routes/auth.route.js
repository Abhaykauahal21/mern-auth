import express from "express";
import { Login, Logout, Register } from "../controllers/AuthController.js";
import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();

router.post("/register", Register)
router.post("/login", Login)
router.post("/logout", Logout)
router.get("/get-user", authenticate, (req, res) => {
    // req.user is set by the authenticate middleware
    res.status(200).json({
        status: true,
        user: req.user
    });
});


export const AuthRoutes = router;