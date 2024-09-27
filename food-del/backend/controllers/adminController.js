import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const adminLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const admin = await userModel.findOne({email, isAdmin: true});

        if (!admin) {
            return res.json({success: false, message: "Admin not found"});
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.json({success: false, message: "Invalid credentials"});
        }

        const token = createToken(admin._id);
        res.json({success: true, token});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
};

export { adminLogin };