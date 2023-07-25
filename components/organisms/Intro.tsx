import {useContext} from "react";
import {CurrentStateContext} from "@/components/Contexts/CurrentStateContext";
import {Alex} from "@/components/organisms/Sprites/Alex";

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
        <Alex headerText={headerText} contentText={contentText} button1={button1} button2={button2}/>

    </div>
}