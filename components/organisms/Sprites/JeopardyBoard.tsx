import {CategoryType, Question, QuestionValue, TutorialEnum} from "@/shared/types/Game.types";

export type JeopardyBoardProps={
    categoriess:CategoryType[]
    setSelectedQuestion:(arg:Question)=>void,
    tutorialState?:TutorialEnum
}
export const JeopardyBoard=({ categoriess,setSelectedQuestion,tutorialState}: JeopardyBoardProps)=>{
    const categories = [
        {
            name: 'Category 1',
            clues: [
                { value: '$200' },
                { value: '$400' },
                { value: '$600' },
                { value: '$800' },
                { value: '$1000' },
            ],
        },
        {
            name: 'Category 2',
            clues: [
                { value: '$200' },
                { value: '$400' },
                { value: '$600' },
                { value: '$800' },
                { value: '$1000' },
            ],
        }, {
            name: 'Category 2',
            clues: [
                { value: '$200' },
                { value: '$400' },
                { value: '$600' },
                { value: '$800' },
                { value: '$1000' },
            ],
        }, {
            name: 'Category 2',
            clues: [
                { value: '$200' },
                { value: '$400' },
                { value: '$600' },
                { value: '$800' },
                { value: '$1000' },
            ],
        }, {
            name: 'Category 2',
            clues: [
                { value: '$200' },
                { value: '$400' },
                { value: '$600' },
                { value: '$800' },
                { value: '$1000' },
            ],
        }]
    return (
        <div className="grid grid-cols-5 gap-2 p-4 bg-black">
            {categories.map((category, i) => (
                <div key={i} className="flex flex-col items-center bg-black">
                    <div className="font-bold text-lg mb-2 h-20 w-full bg-blue-700 text-white grid place-content-center">{category.name}</div>
                    {category.clues.map((clue, j) => (
                        <div key={j} className={`font-serif grid place-content-center w-full h-28  
                        bg-blue-700 text-amber-300 text-3xl my-1 cursor-pointer hover:bg-blue-600`}
                             onClick={()=>{setSelectedQuestion({
                                 text:"hello",
                                 answer:"hello",
                                 value:200,
                                 numAttempts:2,
                                 numCorrect:3,
                                 category:"hello"
                             })}}
                        >

                            {`${clue.value}`}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
