import {CheckBoxForm} from "@/components/atoms/CheckBoxForm";
import {Question} from "@/shared/types/Game.types";
import {FC} from "react";
import {useTypingAnimationTwoElements} from "@/components/hooks/useTypingAnimation";

export type DisplayQuestionProps={
    numDollars:number;
    question:Question
    selectedOption?:string;
    setSelectedOption:(arg:any)=>void;
    handleAnswerSubmit:(arg:any)=>void;
    timer:number
    tutorialError?:boolean
}
export const DisplayQuestion:FC<DisplayQuestionProps>=({numDollars,question,selectedOption,
                                                           setSelectedOption,handleAnswerSubmit,timer,tutorialError})=>{
    const {text1:header,text2:content}=useTypingAnimationTwoElements(`${numDollars} dollars`,question.text,40,10)
    return (
        <div className={"w-full h-full  grid place-content-center bg-blue-800 space-y-12 px-4"}>
            <h1 className={"text-5xl tracking-widest"}>{header}</h1>
            <p className={"text-xl tracking-widest"}>{content}</p>
            <div>
            {tutorialError && <h1 className={"text-red-500 text-3xl"}>Incorrect Answer</h1>}
            <CheckBoxForm values={question.answers} selectedValue={selectedOption} handleSubmit={handleAnswerSubmit}
                          setSelectedOption={setSelectedOption}/>
            </div>
            {timer>0 && <h1 className={"text-2xl"}>{timer}</h1>}
        </div>
        )
}