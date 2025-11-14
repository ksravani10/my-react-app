import User from "./models/User.js";
import bcrypt from "bcryptjs"; 
import dotenv from "dotenv";
import connectToDatabase from "./db/db.js"; 

dotenv.config();
const userRegister = async () => {
    await connectToDatabase();
    try {
        const hashPassword = await bcrypt.hash("admin", 10);
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin",
        });
        await newUser.save();
    console.log("✅ Admin user created successfully!");
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
  } finally {
    process.exit(); // ✅ close script after completion
  }
};

userRegister();