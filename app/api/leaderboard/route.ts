import {NextResponse} from "next/server";
import insertMongo from "@/shared/mongo/insertMongo";

export async function POST(req: Request) {
    try {
        const {email,name,score } = await req.json();

        const res =await insertMongo("revJeopardyLeaderboard", {email,name,score});
        const id=res.insertedId.toString();
        const url=process.env.FRONTEND_URL+"score/"+id;

        // get shareableLink
        return NextResponse.json({url})
    } catch (err) {
        console.log(err)
        return new NextResponse("Server Error", { status: 520 });
    }
}