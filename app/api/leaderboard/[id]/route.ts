import {NextRequest, NextResponse} from "next/server";
import queryMongo from "@/shared/mongo/queryMongo";
import {ObjectId} from "mongodb";



export async function GET(req: NextRequest, {params}:{params:{id:string}}) {
    const {id} = params
    const idQuery = { _id: new ObjectId(id) };
    let userData=await queryMongo("revJeopardyLeaderboard",idQuery)
    const res=userData.length>=1 ? userData[0]:{}
    return NextResponse.json(res );
}
