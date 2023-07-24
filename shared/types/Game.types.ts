
export type CurrentState="intro"| "tutorial"|"game"

export type GameMode="intro"|"standard" |"doubleIntro"|"double" |"finalIntro"|"final"|"gameOver"


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
    _id?:string
}
export type RevenueOperationsCategory= "Sales"|
    "Marketing"|
    "Customer Success"|
    "Finance"|
    "Data Analysis"

export const revenueOperationsCategories: RevenueOperationsCategory[] = [
    "Sales",
    "Marketing",
    "Customer Success",
    "Finance",
    "Data Analysis",
];


export type CategoryType={
    name:string;
    questions:Question[]
}

export type DailyDouble={
    category:RevenueOperationsCategory,
    value:QuestionValue
}
