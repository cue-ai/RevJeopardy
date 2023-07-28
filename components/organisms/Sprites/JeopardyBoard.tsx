import {CategoryType, Question, QuestionValue, TutorialEnum,revenueOperationsCategories} from "@/shared/types/Game.types";
import {FC} from "react";
import {tutorialQuestions} from "@/shared/questions/tutorialQuestions";

export type JeopardyBoardProps={
    categories:CategoryType[]
    setSelectedQuestion:(arg:Question)=>void,
    score:number,
    prevQuestions:string[]
}

export type JeopardyBoardTutorialProps={
    tutorialState:TutorialEnum;
    setSelectedQuestion:(arg:Question)=>void,
    score:number
}
const tutorialValues=[200,400,800,1000];


export const JeopardyBoardTutorial:FC<JeopardyBoardTutorialProps>=({tutorialState,setSelectedQuestion, score})=>{
    const q=tutorialQuestions[tutorialState-1];
    return (
        <div>
            <div className={"w-full text-center text-white text-5xl font-semibold my-2 tracking-wide"}>${score}</div>
            <div className="grid grid-cols-5 gap-2 p-4 bg-black">
            {revenueOperationsCategories.map((category, i) => (
                <div key={i} className="flex flex-col items-center bg-black">
                    <div className="font-bold md:text-2xl text-xs mb-2 h-20 w-full bg-blue-700 text-white grid place-content-center tracking-widest">
                        {category}
                    </div>

                    {tutorialValues.map((value, j) => {
                        const isClickable= q.value===value && q.category===category;
                        return (
                        <div key={j} className={`grid place-content-center w-full h-28  
                        ${isClickable ? "bg-blue-700 hover:bg-blue-600": "bg-blue-400"}
                         text-amber-300 text-2xl md:text-5xl my-1 cursor-pointer `}
                             onClick={()=>{
                                 if (!isClickable)return;
                                 setSelectedQuestion(q);
                             }}
                        >
                            ${value}
                        </div>
                        )
                    })}
                </div>
            ))}
        </div>
        </div>
    );
}
export const JeopardyBoard=({categories,setSelectedQuestion,score,prevQuestions}: JeopardyBoardProps)=>(
        <>
            <div className={"w-full text-center text-white text-5xl font-semibold my-2 tracking-wide"}>${score}</div>
            <div className="grid grid-cols-5 gap-2 p-4 bg-black">
            {categories.map((category, i) => (
                <div key={i} className="flex flex-col items-center bg-black">
                    <div className="font-bold md:text-2xl text-xs mb-2 h-20 w-full bg-blue-700 text-white flex justify-center items-center tracking-widest text-center">{category.name}</div>

                    {category.questions.map((question, j) => {
                       const prevQuestionSet= new Set(prevQuestions);
                       const isClickable=!prevQuestionSet.has(question?._id as string);
                        return (
                            <div key={j} className={` grid place-content-center w-full h-28  
                        ${isClickable ? "bg-blue-700 hover:bg-blue-600 cursor-pointer": "bg-blue-400"}
                         text-amber-300 text-2xl md:text-5xl my-1 `}
                                 onClick={() => {
                                     if (!isClickable)return;
                                     setSelectedQuestion(question)
                                 }}
                            >

                                {`$${question.value}`}
                            </div>
                        )

                    })}
                </div>
            ))}
        </div>
        </>
    )
