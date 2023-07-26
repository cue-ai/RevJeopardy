import {useEffect, useState} from "react";

export const useTimer=(seconds:number=10, fun:any)=>{
    const [timer,setTimer]=useState(seconds);
    useEffect(()=>{
        if (timer==0){
            fun();
        }
        else setTimeout(() => setTimer((prev)=>prev-1), 1000);
    },[timer])
    return {timer,setTimer};
}