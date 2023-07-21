import {Question, QuestionCategory, TutorialEnum} from "@/shared/types/Game.types";
import {FC, FormEvent, useEffect, useState} from "react";
import {Alex} from "@/components/organisms/Sprites/Alex";
import {ButtonType} from "@/shared/types/Html.types";
import {WagerAnswer} from "./WagerAnswer";


// can be regular question or wager

export type AnswerQuestionProps={
    question:Question,
    onNextClick:()=>void
    questionCategory?:QuestionCategory
    tutorialState?:TutorialEnum

}
export const AnswerQuestion:FC<AnswerQuestionProps>=({question,onNextClick,questionCategory,tutorialState})=>{
    console.log(tutorialState)
    const [answeredCorrectly,setAnsweredCorrectly]=useState<boolean >(false)
    const [tutorialError,setTutorialError]=useState(false)
    const [wagerAmount,setWagerAmount]=useState(0)

    const nextButton:ButtonType={
        text: tutorialState!==TutorialEnum.Final?"Next":"Get started with a new game",
        onClick:onNextClick,
        className:"bg-slate-700 py-2 px-4 rounded-md text-lg hover:bg-slate-800"

    }
    useEffect(()=>{
        setWagerAmount(0)
        setAnsweredCorrectly(false)
    },[tutorialState])

    const handleAnswerSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        // some logic to decide if is true or false -> make api call here
        const isCorrect=true;
        if (typeof tutorialState!=="undefined"){
            if (isCorrect){
                setAnsweredCorrectly(true)
            }
            else{
                setTutorialError(true)
            }
            return
        }
    }

    return <div className={"w-full text-center"}>
            <div className={"bg-slate-600 border rounded-md p-2 py-4 text-white"}>
                {
                    questionCategory==="wager" && wagerAmount===0 ? <WagerAnswer setWagerAmount={setWagerAmount} isFinalRound={tutorialState===TutorialEnum.Final}/> :
                        <>

                {answeredCorrectly
                    ?<>
                        <Alex headerText={"Congratulations"} contentText={`You just made ${wagerAmount ?wagerAmount:100} dollars!`} button1={nextButton}/>
                    </>

                    :<>
                    <Alex headerText={`For ${wagerAmount ? wagerAmount:100} dollars`} contentText={"The capital of India?"}/>
                    <form className={"w-full"} onSubmit={handleAnswerSubmit}>
                        {tutorialError &&<h1 className={"mt-1 text-red-500 font-semibold"}>You made an error, try again.</h1>}
                    <div className={"flex items-center justify-center w-full  space-x-4 pt-8"}>
                        <h1 className={"font-semibold "}>What is </h1>
                            <input
                                className=" shadow appearance-none border rounded w-6/12 max-w-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Type your Answer."
                            />

                    </div>
                    </form>
                </>}

                        </>}
            </div>
    </div>
}