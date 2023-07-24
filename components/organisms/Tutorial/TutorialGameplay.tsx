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
        if (tutorialState===TutorialEnum.Double){
            setSelectedQuestion(tutorialQuestions[2])
        }
        else {
            setSelectedQuestion(undefined)
        }
        if (tutorialState!==TutorialEnum.Final){
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

            {tutorialState===TutorialEnum.Final && <AlexHeader text={`Now, in the final round of jeopardy, you will be 
            given a topic and will have to wager some ammount before answering the question. This is similar to the previous example.`}/>}



            {
              (  selectedQuestion|| tutorialState===TutorialEnum.Final)? <AnswerQuestion question={selectedQuestion as Question} onNextClick={onNextClick} score={score}
                                                    questionCategory={tutorialState=== TutorialEnum.FirstQuestion ? "regular":"wager"} tutorialState={tutorialState} setScore={setScore}/>
                    : <JeopardyBoardTutorial tutorialState={tutorialState} setSelectedQuestion={setSelectedQuestion} score={score}/>
            }

        </div>);
}