import {NextResponse} from "next/server";
import queryMongo from "@/shared/mongo/queryMongo";
import {CategoryType, Question, revenueOperationsCategories} from "@/shared/types/Game.types";
import {WithId} from "mongodb";


const filterChosenQuestions=(questions: WithId<any>[], previousQuestions: string[])=>{
    const previousQuestionTexts = new Set(previousQuestions);
    return questions.filter((q) => !previousQuestionTexts.has(q._id.toHexString()));
}


const groupQuestionsByValue=(questions: Question[]): Map<number, Question[]>=> {
    const groupedQuestions = new Map<number, Question[]>();
    for (const question of questions) {
        const { value } = question;
        if (groupedQuestions.has(value)) {
            groupedQuestions.get(value)?.push(question);
        } else {
            groupedQuestions.set(value, [question]);
        }
    }
    return groupedQuestions;
}

function generateCategoryTypeArray(values:number[],categories: string[], questions: WithId<any>[], previousQuestions: string[]): CategoryType[] {
    const categoryTypeArray: CategoryType[] = [];
    const groupedQuestions = groupQuestionsByValue(questions);

    for (const category of categories) {
        const categoryQuestions: Question[] = [];
        for (const value of values) {
            let valueQuestions=groupedQuestions.get(value)??[];
            valueQuestions=valueQuestions.filter((question)=>question.category===category)
            if (valueQuestions.length > 0) {
                categoryQuestions.push(valueQuestions[0]);
            }
        }
        categoryTypeArray.push({ name: category, questions: categoryQuestions });
    }
    return categoryTypeArray;
}

export async function POST(req: Request) {
    try {
        const {round,prevQuestions,finalCategory } = await req.json();

        if (round==="final"){
            let questions = await queryMongo("revJeopardy");
            questions=filterChosenQuestions(questions,prevQuestions);
            questions=questions.filter((question)=>question.value===2000
                && question.category===finalCategory);

            const randomIndex = Math.floor(Math.random() * questions.length);
            const question=questions[randomIndex]
            return NextResponse.json({question});
        }

        let values = [200, 400, 600, 800, 1000];
        if (round !== "standard") {
            values = [400, 800, 1200, 1600, 2000];
        }
        let questions = await queryMongo("revJeopardy");
        questions=filterChosenQuestions(questions,prevQuestions);
        const categories=generateCategoryTypeArray(values,revenueOperationsCategories,questions,prevQuestions);
        return NextResponse.json({categories});
    }
    catch(err){
        console.log(err)
    }
}