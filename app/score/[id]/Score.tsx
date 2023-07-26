"use client"
import {FC, useEffect, useState} from "react";
import {Alex} from "@/components/organisms/Sprites/Alex";
import {LeaderboardEntry} from "@/shared/types/Game.types";
import {useRouter} from "next/navigation";

export type ScoreProps={
    id:string
}
export const Score:FC<ScoreProps>=({id})=>{
    const [userDetails,setUserDetails]=useState<undefined | LeaderboardEntry>(undefined);

    const getUserData = async () => {
        if (!id)return
        try{
            const res = await fetch(`/api/leaderboard/${id}`, {
                method: "GET",
            });
            const data=await res.json();
            setUserDetails(data)
        }
        catch(err){
        }
    };

    useEffect(()=>{
        void getUserData()
    },[])
    const router = useRouter()
    return <div className={`bg-slate-600 border rounded-md text-white ${!userDetails ? "px-12 py-16":"py-16"} text-white text-center`}>
        {userDetails && <Alex headerText={`${userDetails.name} has a score of ${userDetails.score}`} contentText={`Hit them up at ${userDetails.email}`}/>}
        <button className="tracking-widest mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded" onClick={()=>{
            router.push("/")
        }}>
            {`Play RevJeopardy`}
        </button>
    </div>
}

