import { createContext } from "react";
import {CurrentState} from "@/shared/types/Game.types";


export type CurrentStateContextType={
    currentState:CurrentState
    setCurrentState:(arg:CurrentState)=>void
}

const defaultValue: CurrentStateContextType = {
    currentState:"intro",
    setCurrentState:()=>{}
};

export const CurrentStateContext = createContext<CurrentStateContextType>(defaultValue);
