import {useContext, useEffect, useState} from "react";
import {CurrentStateContext} from "@/components/Contexts/CurrentStateContext";
import {Alex} from "@/components/organisms/Sprites/Alex";
import {LeaderboardEntry} from "@/shared/types/Game.types";
import {Leaderboard} from "@/components/organisms/Leaderboard";

const headerText="Welcome to RevJeopardy, Jeopardy for Revenue Operations!";
const contentText=`Choose one of the 2 buttons below to either
                                                start playing or go through the tutorial.`;
export const Intro=()=>{
    const {setCurrentState}=useContext(CurrentStateContext)
    const button1={
        text:"Tutorial",
        onClick:()=>setCurrentState("tutorial"),
    }
    const button2={
        text:"Play Game",
        onClick:()=>setCurrentState("game"),
    }

    return <div className={"w-full bg-slate-600 p-4 border rounded-md text-white grid justify-items-center font-sans-serif"}>
        <div className={"w-full h-full"}>
            <button  className={"tracking-widest bg-slate-700 py-2  px-2 md:px-4 rounded-md text-lg hover:bg-slate-800"}
                     onClick={()=>setCurrentState("leaderboard")}
            >
                View LeaderBoard
            </button>
            <Alex headerText={headerText} contentText={contentText} button1={button1} button2={button2}/>
        </div>

    </div>
}