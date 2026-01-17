const { connectDB, client } = require('./db');

const testDBConnection = async () => {
    try {
        const db = await connectDB();
        console.log("Database connection test passed.");

        const pingResult = await db.command({ ping: 1 });
        console.log("Ping command result:", pingResult);
    } catch (error) {
        console.error("Database connection test failed:", error);
    } finally {
        await client.close();
        console.log("Database connection closed.");
    }
}

testDBConnection();