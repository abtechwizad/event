const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../userModel"); // path to user model
require("../main");

async function seedAdmin() {
    try {

        // check if admin already exists
        const existing = await User.findOne({ email: "admin2@gmail.com" });
        if (existing) {
            console.log("Admin already exists!");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("admin", 10);

        const adminUser = new User({
            name: "Jawad Ali",
            email: "admin2@gmail.com",
            password: hashedPassword,
            role: "admin"
        });

        await adminUser.save();
        console.log("✅ Admin user created successfully!");
        process.exit(0);

    } catch (err) {
        console.error("Error seeding admin:", err);
        process.exit(1);
    }
}

seedAdmin();