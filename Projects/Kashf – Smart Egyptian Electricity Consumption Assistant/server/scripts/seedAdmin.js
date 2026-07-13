import "dotenv/config";
import mongoose from "mongoose";
import User from "../database/models/user.model.js";
import { USER_ROLES } from "../src/config/auth.constants.js";
import { hashPasswordForSeed } from "../src/services/auth.service.js";

const parseArgs = (argv) => {
    const args = {};

    for (let index = 0; index < argv.length; index += 1) {
        const key = argv[index];

        if (!key.startsWith("--")) {
            continue;
        }

        const name = key.slice(2);
        const value = argv[index + 1];

        if (!value || value.startsWith("--")) {
            throw new Error(`Missing value for --${name}`);
        }

        args[name] = value;
        index += 1;
    }

    return args;
};

const seedAdmin = async () => {
    const { email, username, password } = parseArgs(process.argv.slice(2));

    if (!email || !username || !password) {
        console.error(
            "Usage: node scripts/seedAdmin.js --email <email> --username <username> --password <password>"
        );
        process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await hashPasswordForSeed(password);

    const user = await User.findOneAndUpdate(
        { email },
        {
            username,
            email,
            password: hashedPassword,
            role: USER_ROLES.ADMIN,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`Admin user ready: ${user.email} (${user.username})`);
    await mongoose.disconnect();
    process.exit(0);
};

seedAdmin().catch(async (error) => {
    console.error("Failed to seed admin:", error.message);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
});
