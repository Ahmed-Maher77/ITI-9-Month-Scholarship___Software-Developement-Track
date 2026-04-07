import jwt from "jsonwebtoken";

function generateToken(user) {
    return jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
    );
}


export default generateToken;