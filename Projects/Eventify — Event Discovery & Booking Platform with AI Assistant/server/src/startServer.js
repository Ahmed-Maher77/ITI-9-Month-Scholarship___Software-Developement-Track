import "./config/env.js";
import connectDB from "./config/db.js";
import app from "./app.js";

/** Traditional Node hosting: connect DB and listen on PORT. */
export async function startServer() {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(
            `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
        );
        console.log(`API available at http://localhost:${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
}
