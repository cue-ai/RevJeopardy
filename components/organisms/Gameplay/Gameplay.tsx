import {JeopardyBoard} from "@/components/organisms/Sprites/JeopardyBoard";
import {FC, useState} from "react";
import {AlexHeader} from "@/components/organisms/Sprites/AlexHeader";
import {CurrentState, GameMode, Question, TutorialEnum} from "@/shared/types/Game.types";
import {AnswerQuestion} from "@/components/organisms/Gameplay/AnswerQuestion";
import {tutorialQuestions} from "@/shared/questions/tutorialQuestions";
import {Alex} from "@/components/organisms/Sprites/Alex";
import {ButtonType} from "@/shared/types/Html.types";
import {StandardJeopardy} from "@/components/organisms/Gameplay/StandardJeopardy";
import {FinalRound} from "@/components/organisms/Gameplay/FinalRound";

export const Gameplay:FC=()=>{

    const [score,setScore]=useState<number>(0);
    const [gameMode,setGameMode]=useState<GameMode>("intro")
    const [prevQuestions,setPrevQuestions]=useState<string[]>([]);
    const introButton:ButtonType={
        text: "Choose my first question",
        onClick:()=>setGameMode("standard"),
        className:""
    }
    const doubleIntroButton:ButtonType={
        text: "Let's play",
        onClick:()=>setGameMode("double"),
        className:""
    }
    console.log(gameMode)
    return (<div className={"w-full h-full"}>
        <button onClick={()=>setGameMode("doubleIntro")} className={"bg-red-300"}>
            Go to round 2
        </button>
        <button onClick={()=>setGameMode("finalIntro")} className={"bg-green-300"}>
            Go to final round
        </button>
        {gameMode==="intro" &&
            <div className={"w-full  bg-slate-600 text-white rounded-md py-8 p-2 border"}>
                <Alex headerText={`Welcome to the first round of RevJeopardy.` }
        contentText={"Click the button below to start playing"} button1={introButton}/>
            </div>}
        {
            (gameMode==="standard" || gameMode==="double") && <StandardJeopardy score={score} setScore={setScore} setGameMode={setGameMode}
                                                       gameMode={gameMode}
                                                       setPrevQuestions={setPrevQuestions} prevQuestions={prevQuestions}/>
        }
        {gameMode==="doubleIntro" &&
            <div className={"w-full  bg-slate-600 text-white rounded-md py-8 p-2 border"}>
                <Alex headerText={`Welcome to Double Jeopardy` }
                      contentText={"Questions are worth double"} button1={doubleIntroButton}/>
            </div>}
        {
            ((gameMode==="final" || gameMode==="finalIntro") &&score>0) && <FinalRound
            gameMode={gameMode} setGameMode={setGameMode} score={score} setScore={setScore} prevQuestions={prevQuestions}/>
        }
        {
            (gameMode==="gameOver" ||  ((gameMode==="final" || gameMode==="finalIntro") &&score==0)) && <div className={"w-full  bg-slate-600 text-white rounded-md py-8 p-2 border"}>
                <Alex headerText={`Great Job.` }
                      contentText={`Great Job. You have a final score of ${score}`} />
            </div>
        }




    </div>);
}