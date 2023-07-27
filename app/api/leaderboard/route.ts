import {NextResponse} from "next/server";
import insertMongo from "@/shared/mongo/insertMongo";
import queryMongo from "@/shared/mongo/queryMongo";

export async function POST(req: Request) {
    try {
        const {email,name,score, getRanking } = await req.json();
        if (getRanking){
            const res =await queryMongo("revJeopardyLeaderboard");
            const better=res.filter((details)=>score>details.score);
            return NextResponse.json({rank:better.length/res.length})
        }
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

export async function GET(req: Request) {
    try {

        const res =await queryMongo("revJeopardyLeaderboard");
        const sorted=res.sort((a, b) => b.score - a.score)
        const topTen=sorted.slice(0,10);

        // get shareableLink
        return NextResponse.json({topTen})
    } catch (err) {
        console.log(err)
        return new NextResponse("Server Error", { status: 520 });
    }
}