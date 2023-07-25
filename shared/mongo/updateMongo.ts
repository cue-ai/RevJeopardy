import { MongoClient } from 'mongodb';

async function updateMongoDB(collectionName: string, query = {}, update = {}) {
    const mongoURI = process.env.DB_URL as string;
    const dbName = process.env.DB_NAME as string;

    const client = new MongoClient(mongoURI);
    try {
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const updateResult = await collection.updateOne(query, update);

        return updateResult;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Internal Server Error");
    } finally {
        client.close();
    }
}

export default updateMongoDB;
