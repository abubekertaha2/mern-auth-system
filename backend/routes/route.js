//backend/routes/route.js
import express from "express";
import User from "../models/user.model.js";
import protect from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

console.log("✅ Routes file loaded");
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

router.get('/test', (req, res) => {
  res.send("Route working");
});

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       return res.status(400).json({ message: "Please fill the blank" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = generateToken(user._id);


//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false, 
//       sameSite: "Lax",
//     });

//     res.status(200).json({
//       message: "Login successful",
//       id: user._id,
//       name: user.name,
//       email: user.email,
//     });

//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// router.post("/logout", (req, res) => {
//   res.clearCookie("token", {
//     httpOnly: true,
//     sameSite: "lax",
//     secure: false,
//   });

//   res.status(200).json({ message: "Logged out successfully" });
// });
  
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1. Find user and include password (if your schema hides it by default)
    const user = await User.findOne({ email });
    
    // 2. Security: Use the same generic message for "not found" and "wrong password"
    // to prevent "User Enumeration" attacks.
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    // 3. Set Cookie with security flags
    res.cookie("token", token, {
      httpOnly: true, // Prevents XSS
      secure: process.env.NODE_ENV === "production",
      sameSite: "None", 
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // 4. Return only necessary info
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login Error:", error); // Log for developer
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

router.get('/me', protect ,async (req, res) => {
  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });
};

export default router;

