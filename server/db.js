require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
    
    // Return the database instance so other files can use it
    return client.db("my_database_name"); 
  } catch (error) {
    console.error("Connection failed", error);
    // Only close if connection completely failed
    await client.close();
    process.exit(1);
  }
}

// Export the connect function and the client
module.exports = { connectDB, client };