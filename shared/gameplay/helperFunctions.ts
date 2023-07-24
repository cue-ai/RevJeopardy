import {CategoryType, DailyDouble, RevenueOperationsCategory} from "@/shared/types/Game.types";

export const getRandomItems=<T>(array: T[], num: number): T[] =>{
    let randomItems: T[] = [];
    while(randomItems.length < num){
        const randomIndex = Math.floor(Math.random() * array.length);
        randomItems.push(array[randomIndex]);
    }
    return randomItems;
}

export const getRandomCategoryAndValue=(categoryTypeArray: CategoryType[], num: number):DailyDouble[]=> {
    const randomCategoryTypes = getRandomItems(categoryTypeArray, num);
    let dailyDoubles: DailyDouble[] = [];

    for(let randomCategoryType of randomCategoryTypes){
        const category = randomCategoryType.name as RevenueOperationsCategory;
        const questions = randomCategoryType.questions;
        const values = questions.map((q) => q.value);
        const randomValue = getRandomItems(values, 1)[0];
        dailyDoubles.push({ category, value: randomValue });
    }

    return dailyDoubles;
}