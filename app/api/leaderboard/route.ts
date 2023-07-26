import {ObjectId} from "mongodb";
import updateMongoDB from "@/shared/mongo/updateMongo";
import {NextResponse} from "next/server";
import insertMongo from "@/shared/mongo/insertMongo";

export async function POST(req: Request) {
    try {
        const {email,name,score } = await req.json();

        await insertMongo("revJeopardyLeaderboard", {email,name,score});
        return NextResponse.json({})
    } catch (err) {
        console.log(err)
        return new NextResponse("Server Error", { status: 520 });
    }
}