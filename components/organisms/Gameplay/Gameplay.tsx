import {JeopardyBoard} from "@/components/organisms/Sprites/JeopardyBoard";
import {FC, useState} from "react";
import {AlexHeader} from "@/components/organisms/Sprites/AlexHeader";
import {CurrentState, GameMode, Question, TutorialEnum} from "@/shared/types/Game.types";
import {AnswerQuestion} from "@/components/organisms/Gameplay/AnswerQuestion/AnswerQuestion";
import {tutorialQuestions} from "@/shared/questions/tutorialQuestions";
import {Alex} from "@/components/organisms/Sprites/Alex";
import {ButtonType} from "@/shared/types/Html.types";
import {StandardJeopardy} from "@/components/organisms/Gameplay/StandardJeopardy";
import {GameOver} from "@/components/organisms/Gameplay/GameOver";


export const Gameplay:FC=()=>{

    const [score,setScore]=useState<number>(0);
    const [gameMode,setGameMode]=useState<GameMode>("intro")
    const [name,setName]=useState("")
    const [prevQuestions,setPrevQuestions]=useState<string[]>([]);


    return (<div className={"w-full h-full"}>
        {gameMode==="intro" &&
            <div className={"w-full flex flex-col items-center justify-center bg-slate-500 text-white rounded-md py-8 p-2 border"}>
                <Alex headerText={`Welcome to the first round of RevJeopardy.` }
        contentText={"Enter your name"}  isStatic={true}/>
                <input  id="first_name"
                        className="mt-6 tracking-widest bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-6/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Name" required
                        minLength={3}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                />
                {
                    name.length>3 && <button className={"tracking-widest bg-slate-700 mt-6 py-2 px-2 md:px-4 rounded-md text-xl hover:bg-slate-800 border-white"}
                                             onClick={()=>setGameMode("standard")}
                    >
                        Choose my first question
                    </button>
                }
            </div>
        }
        {
            gameMode==="standard" && <StandardJeopardy score={score} setScore={setScore} setGameMode={setGameMode}
                                                       gameMode={gameMode}
                                                       setPrevQuestions={setPrevQuestions} prevQuestions={prevQuestions}/>
        }
        {
            gameMode==="gameOver" &&
            <GameOver score={score} name={name}/>
        }




    </div>);
}