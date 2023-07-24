import { MongoClient } from "mongodb";

async function queryMongoDB(collectionName:string, query = {}) {
    const mongoURI = process.env.DB_URL as string;
    const dbName = process.env.DB_NAME as string;

    const client = new MongoClient(mongoURI);
    try {
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const queryResult = await collection.find(query).toArray();

        return queryResult;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Internal Server Error");
    } finally {
        client.close();
    }
}

export default queryMongoDB;
