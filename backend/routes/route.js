//backend/routes/route.js
import express from "express";
import User from "../models/userModel.js";
import protect from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  const {name, email, password} = req.body;
  if (!name || !email || !password){
    return res.status(400).json({message: "All fields are required"})
  }

  try {
    const userExist = await User.findOne({email});
    if (userExist) {
        return res.status(400).json({message: "User already exist"})
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      // token,
    });
  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     try{
//         if (!email || !password){
//             return res.status(400).json({message: "Please fill the blank"});
//         }
//         const user = await User.findOne({email});
//         if(!user){
//             return res.status(404).json({message: "User not found"});
//         }
//         const isMatch = await bcrypt.compare(password , user.password);
//         if (!isMatch) {
//             return res.status(401).json({message: "Invalid credentials"});
//         }
        
//         const token = generateToken(user._id);
//         res.status(200).json({message: "Login successful",
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             token,
//         });
//     } catch(error){
//         return res.status(401).json({error})
//     }
// })

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill the blank" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);


    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "Lax",
    });

    res.status(200).json({
      message: "Login successful",
      id: user._id,
      name: user.name,
      email: user.email,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/api/users/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({ message: "Logged out successfully" });
});
  
router.get('/me', protect ,async (req, res) => {
  res.status(200).json(req.user);
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });
};

export default router;