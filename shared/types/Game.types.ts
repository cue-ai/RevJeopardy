
export type CurrentState="intro"| "tutorial"|"game"

export type GameMode="intro"|"standard" |"gameOver"


export enum TutorialEnum {
    Intro,
    FirstQuestion,
    Double,
}

export type QuestionValue=200 |400 |600 |800|1000|1200|1600|2000;

export type QuestionCategory="regular" |"wager"

export type Question ={
    text: string;
    answer: string;
    answers:string[];
    value: QuestionValue;
    numAttempts: number;
    numCorrect: number;
    category:string;
    _id?:string
}
export type RevenueOperationsCategory= "Fun Facts"|
    "Sales Facts"|
    "Startup History"|
    "Data & Automation"|
    "Modern Tech Trends"

export const revenueOperationsCategories: RevenueOperationsCategory[] = [
    "Fun Facts",
    "Sales Facts",
    "Startup History",
    "Data & Automation",
    "Modern Tech Trends",
];


export type CategoryType={
    name:string;
    questions:Question[]
}

export type DailyDouble={
    category:RevenueOperationsCategory,
    value:QuestionValue
}
