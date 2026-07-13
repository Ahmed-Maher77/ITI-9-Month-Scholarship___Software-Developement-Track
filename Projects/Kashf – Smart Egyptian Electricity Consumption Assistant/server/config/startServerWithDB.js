import dbConnect from "../database/dbConnect.js";
import cron from "node-cron";
import { checkExpiredSubscriptions } from "../src/services/subscription.service.js";
import seedTiers from "../database/seed/tier.seed.js";
import seedSystemConfig from "../database/seed/systemConfig.seed.js";

const MAX_RETRIES = 5;
let retryCount = 0;

// Function to start the server after connecting to the database with retry mechanism
const startServerWithDB = async (app, port) => {
    try {
        await dbConnect();
        await seedTiers();
        await seedSystemConfig();

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            
            // Schedule daily subscription expiration checks at midnight
            cron.schedule("0 0 * * *", async () => {
                console.log("Running daily subscription expiration check...");
                try {
                    await checkExpiredSubscriptions();
                } catch (err) {
                    console.error("Error running subscription expiration cron job:", err);
                }
            });
            console.log("Daily subscription expiration cron job scheduled.");
        });
    } catch (error) {
        if (retryCount < MAX_RETRIES) {
            retryCount++;
            setTimeout(() => {
                startServerWithDB(app, port);
            }, 5000); // Wait 5 seconds before retrying
        }
        console.error("Error starting the server:", error);
    }
};

export default startServerWithDB;
