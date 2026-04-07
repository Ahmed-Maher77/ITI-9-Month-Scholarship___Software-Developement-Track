import crypto from "crypto";


const generateResetPasswordToken = (user) => {
    // generate reset password token
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");                       // 32 bytes, hex format => plain text
    // hash the token
    const hashedResetPasswordToken = crypto.createHash("sha256").update(resetPasswordToken).digest("hex");
    
    return { resetPasswordToken, hashedResetPasswordToken };
}



export default generateResetPasswordToken;