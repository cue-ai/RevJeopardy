import {FC, useEffect, useState} from "react";
import {useTypingAnimation, useTypingAnimationTwoElements} from "@/components/hooks/useTypingAnimation";

export type AlexHeaderProps={
    text:string
}

export const AlexHeader:FC<AlexHeaderProps>=({text})=>{
    const {text:content}=useTypingAnimation(text,40)
    const [isHidden,setIsHidden]=useState(false)
    useEffect(()=>{
        setIsHidden((false))
    },[text])
    return(<div className={`${isHidden ? "hidden":"fixed"} top-0 right-0`}>
            <div className={"flex bg-slate-600 m-10 p-4 border rounded-md relative"}>
                <div>
                    <img src={"/alex.png"} className={"w-40"}/>
                </div>
                <div className={"font-sans flex items-center justify-start text-sm ml-8 text-white  max-w-xs"}>
                    {content}
                </div>
                <div className="absolute top-0 right-0 mx-4 my-1 cursor-pointer">
                    <span className="text-2xl text-red-400 hover:text-red-600" onClick={()=>{
                        setIsHidden(true)
                    }}>×</span>
                </div>


            </div>
    </div>)
}