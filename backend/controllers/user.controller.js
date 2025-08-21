import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";




export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "Something is missing", success: false });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "File is missing", success: false });
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists with this email.", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto: cloudResponse.secure_url },
    });

    return res.status(201).json({ message: "Account created successfully.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An internal server error occurred.", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Something is missing", success: false });
    }
    let user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)) || role !== user.role) {
      return res.status(400).json({ message: "Incorrect email, password, or role.", success: false });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
    return res.status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
         secure: true,               // ✅ required for cross-origin
         sameSite: "None", 
      })
      .json({ message: `Welcome back ${user.fullname}`, user, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An internal server error occurred.", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "Logged out successfully.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An internal server error occurred.", success: false });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    if (!fullname || !email || !phoneNumber || !bio || !skills || !file) {
      return res.status(400).json({ message: "Something is missing", success: false });
    }

    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDF files are allowed", success: false });
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, { resource_type: "raw" });

    const skillsArray = skills ? skills.split(",").map(skill => skill.trim()) : [];

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found.", success: false });
    }

    // ✅ Set values properly
    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.profile.bio = bio;
    user.profile.skills = skillsArray;
    user.profile.resume = cloudResponse.secure_url;
    user.profile.resumeOriginalName = file.originalname;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An internal server error occurred.", success: false });
  }
};


// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     const file = req.file;

//     if (!fullname || !email || !phoneNumber || !bio || !skills || !file) {
//       return res.status(400).json({ message: "Something is missing", success: false });
//     }

//     if (file.mimetype !== "application/pdf") {
//       return res.status(400).json({ message: "Only PDF files are allowed", success: false });
//     }

//     const fileUri = getDataUri(file);
//     const cloudResponse = await cloudinary.uploader.upload(fileUri.content, { resource_type: "raw" });
//     const skillsArray = skills ? skills.split(",") : [];

//     const userId = req.id;
//     let user = await User.findById(userId);
//     if (!user) {
//       return res.status(400).json({ message: "User not found.", success: false });
//     }

//     Object.assign(user, { fullname, email, phoneNumber, bio, "profile.skills": skillsArray });
//     user.profile.resume = cloudResponse.secure_url;
//     user.profile.resumeOriginalName = file.originalname;
//     await user.save();

//     return res.status(200).json({ message: "Profile updated successfully.", user, success: true });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "An internal server error occurred.", success: false });
//   }
// };
