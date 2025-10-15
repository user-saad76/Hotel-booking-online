import AdminUser from "../models/AdminUser.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupAdminUser = async (req, res) => {
  try {
    const data = req.body;
    console.log("user admin data", data);

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    await AdminUser.create(data);

    res.json({
      message: "admin sign up ",
    });
  } catch (error) {
    console.log("Something went wrong ", error);
  }
};

export const signinAdminUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ FIXED: change variable name to avoid shadowing
    const admin = await AdminUser.findOne({ email });
    console.log("admin", admin);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatched = await bcrypt.compare(password, admin.password);
    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // ✅ JWT Token
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ Set cookie
    res.cookie("jwt-token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 3600000, // 1 hour
      secure: false,
    });

    res.json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log("Sign in error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const Admin = async (req, res, next) => {
  try {
    // ✅ FIXED: avoid overwriting model
    const admin = await AdminUser.findById(req.user.id).select("-password");
    res.status(200).json(admin);
  } catch (error) {
    console.log("Admin fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res, next) => {
  res.cookie("jwt-token", null, {
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(0),
    secure: false,
  });
  res.json({
    message: "user has been logged out ",
  });
};
