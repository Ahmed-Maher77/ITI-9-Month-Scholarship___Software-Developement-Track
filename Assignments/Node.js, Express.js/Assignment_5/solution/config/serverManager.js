import connectDB from "../database/dbConnect.js";


const startServerWithDB = async (app, PORT) => {
    try {
        const isConnected = await connectDB();
        if (isConnected) {
            // Start the server only after successful DB connection
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        } else {
            throw new Error("Database connection failed");
        }
    } catch (err) {
        throw new Error(`Failed to start server: ${err.message}`);
    }
};


export default startServerWithDB;
