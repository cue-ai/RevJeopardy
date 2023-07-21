import {JeopardyBoard} from "@/components/organisms/Sprites/JeopardyBoard";
import {FC, useState} from "react";
import {AlexHeader} from "@/components/organisms/Sprites/AlexHeader";
import {CurrentState, Question, TutorialEnum} from "@/shared/types/Game.types";
import {AnswerQuestion} from "@/components/organisms/Gameplay/AnswerQuestion";

export type GameplayProps={
    tutorialState:TutorialEnum,
    setTutorialState:(arg:any)=>void
    setCurrentState:(arg:CurrentState)=>void
}
export const TutorialGameplay:FC<GameplayProps>=({setTutorialState,tutorialState,setCurrentState})=>{
    const [selectedQuestion,setSelectedQuestion]=useState<Question|undefined>(undefined);

    const onNextClick=()=>{
        if (tutorialState!==TutorialEnum.Final){
            setTutorialState((prev:any)=>prev+1)
        }
        else{
            setCurrentState("game")
        }
        setSelectedQuestion(undefined)

    }
        return (<div className={"w-full h-full"}>
            {tutorialState===TutorialEnum.FirstQuestion && <AlexHeader text={`Choose a dollar amount/category to get a question.
      The more the dollar amount, the harder the question.`}/>}

            {tutorialState===TutorialEnum.Double && <AlexHeader text={`Now choose another question. You'll see that whatever you choose, 
            you first have to wager some amount before answering the question.`}/>}\

            {tutorialState===TutorialEnum.Final && <AlexHeader text={`Now, in the final round of jeopardy, you will be 
            given a topic and will have to wager some ammount before answering the question. This is similar to the previous example.`}/>}



            {
              (  selectedQuestion|| tutorialState===TutorialEnum.Final)? <AnswerQuestion question={selectedQuestion as Question} onNextClick={onNextClick}
                                                    questionCategory={tutorialState=== TutorialEnum.FirstQuestion ? "regular":"wager"} tutorialState={tutorialState} />
                    : <JeopardyBoard categoriess={[]} setSelectedQuestion={setSelectedQuestion}/>
            }

        </div>);
}