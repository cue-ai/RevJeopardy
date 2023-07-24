import {Question, QuestionCategory, TutorialEnum} from "@/shared/types/Game.types";
import {FC, FormEvent, useEffect, useState} from "react";
import {Alex} from "@/components/organisms/Sprites/Alex";
import {ButtonType} from "@/shared/types/Html.types";
import {WagerAnswer} from "./WagerAnswer";


// can be regular question or wager

export type AnswerQuestionProps={
    question:Question,
    onNextClick:()=>void
    score:number
    setScore:(arg:any)=>void
    questionCategory?:QuestionCategory
    tutorialState?:TutorialEnum

}
export const AnswerQuestion:FC<AnswerQuestionProps>=({question,onNextClick,questionCategory,score,setScore,tutorialState})=>{

    // for tutorial
    const [answeredCorrectly,setAnsweredCorrectly]=useState<boolean >(false)
    const [tutorialError,setTutorialError]=useState(false)

    // for wager
    const [wagerAmount,setWagerAmount]=useState<number>(0)

    // for tracking answer
    const [answer,setAnswer]=useState("")

    const [answeredIncorrectly,setAnsweredIncorrectly]=useState(false);


    const nextButton:ButtonType={
        text: tutorialState!==TutorialEnum.Final?"Next":"Get started with a new game",
        onClick:onNextClick,
        className:"bg-slate-700 py-2 px-4 rounded-md text-lg hover:bg-slate-800"

    }
    useEffect(()=>{
        alert("refreshing")
        setWagerAmount(0)
        setAnsweredCorrectly(false)
        setAnsweredIncorrectly(false)
        setTutorialError(false)
        setAnswer("")
    },[tutorialState])

    const handleAnswerSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        // some logic to decide if is true or false -> make api call here
        const res = await fetch("/api/handleAnswerSubmit", {
            method: "POST",
            body: JSON.stringify({
                question,
                answer
            }),
        });

        const {isCorrect}=await res.json();
        if (isCorrect){
            setAnsweredCorrectly(true)
            if (questionCategory=="wager")setScore((prev:number)=>prev+wagerAmount)
            else setScore((prev:number)=>prev+question.value)
            return;
        }
        // incorrect
        if (typeof tutorialState!=="undefined"){
            setTutorialError(true)
        }
        else {
            setAnsweredIncorrectly(true);
            if (questionCategory=="wager")setScore((prev:number)=>Math.max(prev-wagerAmount,0))
        }
    }

    return <div className={"w-full text-center"}>
            <div className={"bg-slate-600 border rounded-md p-2 py-4 text-white"}>
                {
                    questionCategory==="wager" && score !=0 && (wagerAmount<5 || wagerAmount>=score) ? <WagerAnswer setWagerAmount={setWagerAmount} isFinalRound={tutorialState===TutorialEnum.Final}/> :
                        <>

                {answeredCorrectly
                    ?<>
                        <Alex headerText={"Congratulations"} contentText={`You just made ${questionCategory==="wager" ?wagerAmount:question.value} dollars!`} button1={nextButton}/>
                    </>:
                    answeredIncorrectly?
                        <>
                            <Alex headerText={"Oops"} contentText={`That was the wrong answer, better luck next time.`} button1={nextButton}/>
                        </>
                    :<>
                    <Alex headerText={`For ${questionCategory==="wager" ? wagerAmount:question.value} dollars`} contentText={question.text}/>
                    <form className={"w-full"} onSubmit={handleAnswerSubmit}>
                        {tutorialError &&<h1 className={"mt-1 text-red-500 font-semibold"}>You made an error, try again.</h1>}
                    <div className={"flex items-center justify-center w-full  space-x-4 pt-8"}>
                        <h1 className={"font-semibold "}>What is </h1>
                            <input
                                className=" shadow appearance-none border rounded w-6/12 max-w-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Type your Answer."
                                value={answer}
                                onChange={(e)=>setAnswer(e.target.value)}
                            />

                    </div>
                    </form>
                </>}

                        </>}
            </div>
    </div>
}