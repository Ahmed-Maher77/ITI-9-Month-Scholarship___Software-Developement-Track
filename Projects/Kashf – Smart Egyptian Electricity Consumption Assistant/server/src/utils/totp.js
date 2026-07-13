import crypto from "crypto";

// Base32 Alphabet
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

/**
 * Decodes a base32 string into a Buffer.
 */
export function base32Decode(str) {
    const cleanStr = str.replace(/=+$/, "").toUpperCase();
    const len = cleanStr.length;
    const buf = Buffer.alloc(Math.floor((len * 5) / 8) + 1);
    
    let bits = 0;
    let value = 0;
    let index = 0;
    
    for (let i = 0; i < len; i++) {
        const char = cleanStr[i];
        const val = ALPHABET.indexOf(char);
        if (val === -1) continue;
        
        value = (value << 5) | val;
        bits += 5;
        
        if (bits >= 8) {
            buf[index++] = (value >> (bits - 8)) & 0xff;
            bits -= 8;
        }
    }
    return buf.slice(0, index);
}

/**
 * Generates a base32 encoded random secret of 160 bits (32 base32 characters).
 */
export function generateSecret() {
    const bytes = crypto.randomBytes(20);
    let secret = "";
    for (let i = 0; i < bytes.length; i++) {
        const val = bytes[i];
        secret += ALPHABET[val % 32];
    }
    return secret;
}

/**
 * Verifies a 6-digit TOTP code against a base32 secret.
 * Allows a window of ±1 step (±30s) to handle clock drift.
 */
export function verifyTOTP(token, secret, window = 1) {
    if (!token || !secret) return false;
    const key = base32Decode(secret);
    const timeStep = 30; // 30 seconds
    const counter = Math.floor(Date.now() / 1000 / timeStep);
    
    for (let i = -window; i <= window; i++) {
        const currentCounter = counter + i;
        
        // Convert counter to 8-byte buffer
        const buf = Buffer.alloc(8);
        let tmp = currentCounter;
        for (let j = 7; j >= 0; j--) {
            buf[j] = tmp & 0xff;
            tmp = Math.floor(tmp / 256);
        }
        
        const hmac = crypto.createHmac("sha1", key);
        hmac.update(buf);
        const digest = hmac.digest();
        
        // Dynamic truncation
        const offset = digest[digest.length - 1] & 0xf;
        const code = ((digest[offset] & 0x7f) << 24) |
                     ((digest[offset + 1] & 0xff) << 16) |
                     ((digest[offset + 2] & 0xff) << 8) |
                     (digest[offset + 3] & 0xff);
                     
        const otp = (code % 1000000).toString().padStart(6, "0");
        if (otp === token.trim()) {
            return true;
        }
    }
    return false;
}
