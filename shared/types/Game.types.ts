
export type CurrentState="intro"| "tutorial"|"game"

export type GameMode="standard" |"double" |"final"


export enum TutorialEnum {
    Intro,
    FirstQuestion,
    Double,
    Final
}

export type QuestionValue=200 |400 |600 |800|1000|1200|1600|2000;

export type QuestionCategory="regular" |"wager"

export type Question ={
    text: string;
    answer: string;
    value: QuestionValue;
    numAttempts: number;
    numCorrect: number;
    category:string;
}


export type CategoryType={
    name:string;
    questions:Question[]
}
