import {
    CategoryType,
    DailyDouble,
    GameMode,
    Question,
    RevenueOperationsCategory,
    TutorialEnum
} from "@/shared/types/Game.types";
import {AlexHeader} from "@/components/organisms/Sprites/AlexHeader";
import {AnswerQuestion} from "@/components/organisms/Gameplay/AnswerQuestion/AnswerQuestion";
import {JeopardyBoard, JeopardyBoardTutorial} from "@/components/organisms/Sprites/JeopardyBoard";
import {FC, useEffect, useState} from "react";
import {getRandomCategoryAndValue} from "@/shared/gameplay/helperFunctions";
import {Loading} from "@/components/atoms/Loading";

export type StandardJeopardyProps={
    score:number,
    setScore:(arg:any)=>void,
    gameMode:GameMode,
    setGameMode:(arg:GameMode)=>void
    setPrevQuestions:(arg:any)=>void;
    prevQuestions:string[]

}
export const StandardJeopardy:FC<StandardJeopardyProps>=({gameMode,score,setScore,setGameMode,setPrevQuestions,prevQuestions})=>{
    const [selectedQuestion,setSelectedQuestion]=useState<Question|undefined>(undefined);
    const [categories,setCategories]=useState<CategoryType[]>([]);
    const [isLoading,setIsLoading]=useState(false)
    const [livesRemaining,setLivesRemaining]=useState(3);
    const getQuestions=async()=>{
        setIsLoading(true);
        const res = await fetch("/api/questions", {
            method: "POST",
            body:JSON.stringify({
                round:gameMode,
                prevQuestions:prevQuestions
            })
        });

        const {categories}=await res.json();
        setCategories(categories);
        setIsLoading(false);
    }

    useEffect(()=>{
        void getQuestions();
    },[gameMode])


    const onNextClick=()=>{
        if(livesRemaining<=0){
            setGameMode("gameOver")
        }
        const numQuestionsDone=prevQuestions.length+1;
        setPrevQuestions((prev:any[])=>[...prev,selectedQuestion?._id])
        setSelectedQuestion(undefined);

        const totalQuestions= categories.reduce((total, categoryType) => {
            return total + categoryType.questions.length;
        }, 0);

        if (numQuestionsDone===totalQuestions){
            setGameMode('gameOver')
        }
    }

    return (<div className={"w-full h-full"}>

        <div className={"fixed top-8 left-8 "}>
            <h1 className={"md:text-4xl text-lg text-white"}>{`Lives Remaining: ${livesRemaining}`}</h1>
        </div>

        <AlexHeader text={
      "The more the dollar amount, the harder the question."  }/>
        {
            isLoading? <div className={"w-full  h-full grid place-content-center"}>
                    <Loading/>
                </div>:
        <>
            {
                selectedQuestion? <AnswerQuestion question={selectedQuestion as Question} onNextClick={onNextClick} score={score}
                                    questionCategory={"regular"} setScore={setScore} setLivesRemaining={setLivesRemaining}/>
                    : <JeopardyBoard categories={categories} setSelectedQuestion={setSelectedQuestion} score={score} prevQuestions={prevQuestions}/>
            }
        </>
        }

    </div>);
}