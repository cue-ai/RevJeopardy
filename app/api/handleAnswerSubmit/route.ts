import {NextResponse} from "next/server";
import updateMongoDB from "@/shared/mongo/updateMongo";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    try {
        const {question,answer } = await req.json();

        const s1 = question.answer.toLowerCase();
        const s2 = answer? answer.toLowerCase(): "";
        const correct=s1==s2;

        const numAttempts=question.numAttempts+1;
        const numCorrect=correct ? question.numCorrect+ 1 : question.numCorrect ;
const query = { _id:  new ObjectId(question._id )};
        const update = { $set: { numAttempts, numCorrect}};

        await updateMongoDB("revJeopardy",query,update);
        return NextResponse.json({ isCorrect:correct, numAttempts, numCorrect });

    } catch (err) {
        console.log(err)
        return new NextResponse("Server Error", { status: 520 });
    }
}

