import {JeopardyBoard} from "@/components/organisms/Sprites/JeopardyBoard";
import {FC, useState} from "react";
import {AlexHeader} from "@/components/organisms/Sprites/AlexHeader";
import {CurrentState, GameMode, Question, TutorialEnum} from "@/shared/types/Game.types";
import {AnswerQuestion} from "@/components/organisms/Gameplay/AnswerQuestion";
import {tutorialQuestions} from "@/shared/questions/tutorialQuestions";
import {Alex} from "@/components/organisms/Sprites/Alex";
import {ButtonType} from "@/shared/types/Html.types";
import {StandardJeopardy} from "@/components/organisms/Gameplay/StandardJeopardy";


export const Gameplay:FC=()=>{

    const [score,setScore]=useState<number>(0);
    const [gameMode,setGameMode]=useState<GameMode>("intro")
    const [prevQuestions,setPrevQuestions]=useState<string[]>([]);
    const introButton:ButtonType={
        text: "Choose my first question",
        onClick:()=>setGameMode("standard"),
    }
    console.log(gameMode)
    return (<div className={"w-full h-full"}>
        {gameMode==="intro" &&
            <div className={"w-full  bg-slate-600 text-white rounded-md py-8 p-2 border"}>
                <Alex headerText={`Welcome to the first round of RevJeopardy.` }
        contentText={"Click the button below to start playing"} button1={introButton}/>
            </div>
        }
        {
            gameMode==="standard" && <StandardJeopardy score={score} setScore={setScore} setGameMode={setGameMode}
                                                       gameMode={gameMode}
                                                       setPrevQuestions={setPrevQuestions} prevQuestions={prevQuestions}/>
        }
        {
            gameMode==="gameOver" &&
            <div className={"w-full  bg-slate-600 text-white rounded-md py-8 p-2 border"}>
                <Alex headerText={`Great Job.` }
                      contentText={`Great Job. You have a final score of ${score}`} />
            </div>
        }




    </div>);
}