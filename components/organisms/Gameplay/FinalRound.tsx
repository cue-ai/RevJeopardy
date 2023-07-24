import {GameMode, Question, RevenueOperationsCategory} from "@/shared/types/Game.types";
import {FC, useEffect, useState} from "react";
import {revenueOperationsCategories} from "@/shared/types/Game.types";
import {Alex} from "@/components/organisms/Sprites/Alex";
import {ButtonType} from "@/shared/types/Html.types";
import {AlexHeader} from "@/components/organisms/Sprites/AlexHeader";
import {AnswerQuestion} from "@/components/organisms/Gameplay/AnswerQuestion";
import {Loading} from "@/components/atoms/Loading";

export type FinalRoundProps={
    gameMode:GameMode,
    setGameMode:(arg:GameMode)=>void
    score:number,
    setScore:(arg:any)=>void,
    prevQuestions:string[]
}

export const FinalRound:FC<FinalRoundProps>=({gameMode,setGameMode,score,setScore,prevQuestions})=>{
    const [finalCategory,setFinalCategory]=useState<RevenueOperationsCategory>(
        revenueOperationsCategories[Math.floor(Math.random() * revenueOperationsCategories.length)]
    )
    const [question,setQuestion]=useState<Question |undefined>(undefined)


    const getQuestion=async()=>{
        const res = await fetch("/api/questions", {
            method: "POST",
            body:JSON.stringify({
                round:"final",
                prevQuestions:prevQuestions,
                finalCategory
            })
        });
        const {question}=await res.json();
        setQuestion(question);
    }
    useEffect(()=>{
        void getQuestion()
    },[])

    const nextButton:ButtonType={
        text:"Next",
        onClick:()=>setGameMode("final"),
        className:""
    }


    return (<div className={"w-full h-full "}>
        {
            gameMode==="finalIntro" ?
                <div className={"bg-slate-600 text-white rounded-md py-8 p-2 border"}>
                    <Alex headerText={`Welcome to the final round` }
                          contentText={`Your topic is ${finalCategory}, click the button to play.`} button1={nextButton}/>
                </div>
                : !question ? <div className={"w-full h-full grid place-content-center"}>
                        <Loading/>

                    </div>
                :<>

                    <AlexHeader text={`Here your topic is ${finalCategory}. 
                    You can choose any ammount of money to wager, from 0 to the amount of money you have won so far.
                    Choose your wager ammount and then answer the question.`}/>

                    <AnswerQuestion question={question as Question} onNextClick={()=>setGameMode("gameOver")} score={score} setScore={setScore}
                    questionCategory={"wager"}/>

                </>
        }

    </div>)
}