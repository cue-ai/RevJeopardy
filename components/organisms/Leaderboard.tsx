import {CurrentState, LeaderboardEntry} from "@/shared/types/Game.types";
import {FC, useEffect, useState} from "react";


export type LeaderboardProps={
    setCurrentState:(arg:CurrentState)=>void
}
export const Leaderboard:FC<LeaderboardProps>=({setCurrentState})=>{
    const [topTen,setTopTen]=useState<LeaderboardEntry[]>([]);
    const [isLoading,setIsLoading]=useState(false);
    const getTopTen=async()=>{
        setIsLoading(true)
        const res = await fetch(`/api/leaderboard`, {
            method: "GET",
        });
        const {topTen}=await res.json();
        setIsLoading(false)
        setTopTen(topTen)
    }

    useEffect(()=>{
        void getTopTen()
    },[])

    return (<div className={"relative md:w-full w-8/12 min-h-full mt-4 text-center bg-slate-500 px-4 py-2 pb-0 rounded-md border"}>
                <button  className={"absolute left-4 top-2 text-white bg-slate-700 py-2  px-2 md:px-4 rounded-md text-xs md:text-lg hover:bg-slate-800 my-4"}
                         onClick={()=>setCurrentState("intro")}
                >
                    Go Back
                </button>
                    <h1 className={`text2xl md:text-5xl my-4 
                    text-white ${isLoading ? "animate-bounce":"" }`}>{isLoading?"Loading ...":"Top Ten Scores"}</h1>



            <table className="md:mt-0 mt-8 w-full">
            <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm md: leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Score</th>
            </tr>
            </thead>
            <tbody className="text-white text-sm font-light">
            {topTen.map((item, index) => (
                <tr className="border-b border-gray-200 hover:bg-gray-400" key={index}>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                            <span className=" md:text-lg tracking-wide text-xs">{item.name}</span>
                        </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                        <div className="flex items-center font-bold">
                            <span className={"md:text-lg tracking-wide text-xs"}>{item.score}</span>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    )
}