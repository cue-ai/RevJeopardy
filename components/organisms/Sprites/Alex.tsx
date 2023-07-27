import {FC} from "react";
import {useTypingAnimation,useTypingAnimationTwoElements} from "@/components/hooks/useTypingAnimation";
import {ButtonType} from "@/shared/types/Html.types";
import localFont from "@next/font/local";
export type AlexProps={
    contentText:string;
    headerText?:string;
    button1?:ButtonType,
    button2?:ButtonType
    isStatic?:boolean

}



export const Alex:FC<AlexProps>=({headerText,contentText,
                                     button1,button2,isStatic})=>{

const {text1:header,text2:content}=useTypingAnimationTwoElements(headerText??"",contentText,40,10)
    return (
        <div className={"w-full grid justify-items-center "}>
            <div className={"w-full flex justify-center pt-5"}>
                    <img src={"/alex.png"} className={"md:w-3/12 w-10/12"}/>
            </div>
            <div className={"mt-10 md:px-10 w-full text-center  font-light"}>
                {headerText && <h1 className={`tracking-wide font-light font-sans-serif md:text-5xl text-2xl`} >
                    {!isStatic?header:headerText}</h1>}

            </div>

            <div className={"mt-10 px-10 text-center "}>
                <p className={"md:text-2xl text:md tracking-wider"}>
                    {!isStatic?content: contentText}
                </p>
            </div>
            {(button1 || button2) &&<div className={"my-12 flex w-6/12 justify-around space-x-2"}>
                {button1 && <button className={"tracking-widest bg-slate-700 py-2 px-2 md:px-4 rounded-md text-lg hover:bg-slate-800 border-white"}
                         onClick={button1.onClick}
                >
                    {button1.text}
                </button>}

                {button2 &&<button className={"tracking-widest bg-slate-700 py-2  px-2 md:px-4 rounded-md text-lg hover:bg-slate-800"}
                                   onClick={button2.onClick}
                >
                    {button2.text}
                </button>}
            </div>}

        </div>
    )
}