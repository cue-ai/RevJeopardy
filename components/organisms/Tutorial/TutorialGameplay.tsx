import {JeopardyBoardTutorial} from "@/components/organisms/Sprites/JeopardyBoard";
import {FC, useState} from "react";
import {AlexHeader} from "@/components/organisms/Sprites/AlexHeader";
import {CurrentState, Question, TutorialEnum} from "@/shared/types/Game.types";
import {AnswerQuestion} from "@/components/organisms/Gameplay/AnswerQuestion";
import {tutorialQuestions} from "@/shared/questions/tutorialQuestions";

export type TutorialGameplayProps={
    tutorialState:TutorialEnum,
    setTutorialState:(arg:any)=>void
    setCurrentState:(arg:CurrentState)=>void
}
export const TutorialGameplay:FC<TutorialGameplayProps>=({setTutorialState,tutorialState,setCurrentState})=>{
    const [selectedQuestion,setSelectedQuestion]=useState<Question|undefined>(undefined);
    const [score,setScore]=useState<number>(0);

    const onNextClick=()=>{
        setSelectedQuestion(undefined)

        if (tutorialState!==TutorialEnum.Double){
            setTutorialState((prev:any)=>prev+1)
        }
        else{
            setCurrentState("game")
        }


    }
        return (<div className={"w-full h-full"}>
            {tutorialState===TutorialEnum.FirstQuestion && <AlexHeader text={`Choose a dollar amount/category to get a question.
      The more the dollar amount, the harder the question.`}/>}

            {tutorialState===TutorialEnum.Double && <AlexHeader text={`Now choose another question. You'll see that whatever you choose, 
            you first have to wager some amount before answering the question.`}/>}


            {
              (  selectedQuestion)? <AnswerQuestion question={selectedQuestion as Question} onNextClick={onNextClick} score={score}
                                                    questionCategory={tutorialState=== TutorialEnum.FirstQuestion ? "regular":"wager"} tutorialState={tutorialState} setScore={setScore}/>
                    : <JeopardyBoardTutorial tutorialState={tutorialState} setSelectedQuestion={setSelectedQuestion} score={score}/>
            }

        </div>);
}