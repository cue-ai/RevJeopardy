import {Question, QuestionCategory, TutorialEnum} from "@/shared/types/Game.types";
import {FC, FormEvent, useEffect, useState} from "react";
import {Alex} from "@/components/organisms/Sprites/Alex";
import {ButtonType} from "@/shared/types/Html.types";
import {WagerAnswer} from "./WagerAnswer";
import {CheckBoxForm} from "@/components/atoms/CheckBoxForm";
import {Loading} from "@/components/atoms/Loading";
import {set} from "zod";
import {AlexHeader} from "@/components/organisms/Sprites/AlexHeader";


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

    const [selectedOption, setSelectedOption]=useState<string | undefined>(undefined)
    const [answeredIncorrectly,setAnsweredIncorrectly]=useState(false);
    const [loading,setLoading]=useState(false);

    const [problemAccuracy,setProblemAccuracy]=useState<undefined | number>(undefined);

    const nextButton:ButtonType={
        text: tutorialState!==TutorialEnum.Double?"Next":"Get started with a new game",
        onClick:onNextClick,

    }
    useEffect(()=>{
        setWagerAmount(0)
        setAnsweredCorrectly(false)
        setAnsweredIncorrectly(false)
        setTutorialError(false)
    },[tutorialState])

    const handleAnswerSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        // some logic to decide if is true or false -> make api call here
        const res = await fetch("/api/handleAnswerSubmit", {
            method: "POST",
            body: JSON.stringify({
                question,
                answer:selectedOption
            }),
        });

        const {isCorrect, numAttempts,numCorrect}=await res.json();
        const accuracy=(numCorrect/numAttempts )*100;
        const stringacc=accuracy.toFixed(2)
        setProblemAccuracy(parseFloat(stringacc));
        setLoading(false)
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

    return <div className={"w-full h-full  py-10 text-center"}>
            {
                (typeof problemAccuracy!=="undefined" && !tutorialState) && <AlexHeader text={`${problemAccuracy}% of people have answered this correct`}/>
            }
            <div className={"bg-slate-600 border rounded-md p-2 text-white h-full"}>
                {
                    questionCategory==="wager" && score !=0 && (wagerAmount<5 || wagerAmount>=score) ? <WagerAnswer setWagerAmount={setWagerAmount} /> :
                        <>

                {loading ?
                    <div className={"w-full h-full grid place-items-center"}>
                        <Loading/>
                    </div>
                    : answeredCorrectly
                    ?<>
                        <Alex headerText={"Congratulations"} contentText={`You just made ${questionCategory==="wager" ?wagerAmount:question.value} dollars!`} button1={nextButton}/>
                    </>:
                    answeredIncorrectly?
                        <>
                            <Alex headerText={"Oops"} contentText={`That was the wrong answer, better luck next time.`} button1={nextButton}/>
                        </>
                    :<>
                    <Alex headerText={`For ${questionCategory==="wager" ? wagerAmount:question.value} dollars`} contentText={question.text}/>
                            {tutorialError &&<h1 className={"mt-1 text-red-500 font-semibold"}>You made an error, try again.</h1>}
                    <CheckBoxForm values={question.answers} selectedValue={selectedOption} handleSubmit={handleAnswerSubmit}
                                  setSelectedOption={setSelectedOption}/>
                </>}

                        </>}
            </div>
    </div>
}