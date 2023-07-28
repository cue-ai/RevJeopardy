import {NextRequest, NextResponse} from "next/server";
import queryMongo from "@/shared/mongo/queryMongo";
import {ObjectId} from "mongodb";



export async function GET(req: NextRequest, {params}:{params:{id:string}}) {
    const {id} = params
    const idQuery = { _id: new ObjectId(id) };
    let userData=await queryMongo("revJeopardyLeaderboard",idQuery)
    const res=userData.length>=1 ? userData[0]:{score:undefined}
    const allUsers =await queryMongo("revJeopardyLeaderboard");
    const better=allUsers.filter((details)=>(res?.score??0)>=details.score);
    const rank=((better.length / allUsers.length)*100).toFixed(2)
    const rankNum=parseFloat(rank);
    return NextResponse.json({...res, rank: rankNum});
}
