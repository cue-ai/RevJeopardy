import {Alex} from "@/components/organisms/Sprites/Alex";
import {FC, useState} from "react";
import {CurrentState, TutorialEnum} from "@/shared/types/Game.types";
import {ButtonType} from "@/shared/types/Html.types";
import {JeopardyBoard} from "@/components/organisms/Sprites/JeopardyBoard";
import { TutorialGameplay} from "./TutorialGameplay";

const headerTutorialText="Welcome to the tutorial!"
const textContent=`The basis of this game is simple, you answer Revenue Operations Questions to win money.`

export type TutorialProps={
        setCurrentState:(arg:CurrentState)=>void
}

export const Tutorial:FC<TutorialProps>=({setCurrentState})=>{
        const [tutorialState,setTutorialState]=useState<TutorialEnum>(0)

        const NextButton:ButtonType={
                text:"Next",
                onClick:()=>setTutorialState((prev)=>prev+1),
        }


        return <div className={"w-full h-full grid justify-items-center "}>
                {tutorialState===TutorialEnum.Intro ?<div className={"w-full  bg-slate-500 text-white rounded-md py-8 p-2 border"}>
                        <Alex headerText={headerTutorialText} contentText={textContent}
                              button1={NextButton}
                             />
                </div>:
                <TutorialGameplay tutorialState={tutorialState} setTutorialState={setTutorialState}
                                  setCurrentState={setCurrentState}
                />}
        </div>
}