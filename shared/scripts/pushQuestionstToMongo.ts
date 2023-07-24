/* eslint-disable no-console */
import { MongoClient, Collection } from "mongodb";
import {Question} from "@/shared/types/Game.types";
import {additionalFinalRoundQuestions} from "../questions/AdditionalFinalRoundQuestions";

const mongoURI = process.env.DATABASE_URL;
const dbName = "revhq-ai-development";
const collectionName = "revJeopardy";

async function pushQuestionsToMongoDB(questions: Question[]) {
    // return;
    if (!mongoURI)return
    const client = new MongoClient(mongoURI as string);

    try {
        await client.connect();

        const db = client.db(dbName);
        const collection: Collection<Question> = db.collection(collectionName);

        // Insert all questions into the collection
        await collection.insertMany(questions);

    } catch (err) {
        console.error("Error inserting questions into MongoDB:", err);
    } finally {
        client.close();
    }
}

// Call the function with your jeopardyQuestions array
void pushQuestionsToMongoDB(additionalFinalRoundQuestions);
