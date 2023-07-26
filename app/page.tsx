"use client"
import Image from 'next/image'
import {useState} from "react";
import {Intro} from "@/components/organisms/Intro"
import {CurrentState} from "@/shared/types/Game.types";
import {CurrentStateContext} from "@/components/Contexts/CurrentStateContext";
import {Tutorial} from "@/components/organisms/Tutorial/Tutorial";
import {Gameplay} from "@/components/organisms/Gameplay/Gameplay";

export default function Home() {

    const [currentState,setCurrentState]=useState<CurrentState>("intro")

  return (
    <main className="flex w-screen h-screen flex-col items-center justify-between py-24 px-2 md:px-24">
        <CurrentStateContext.Provider value={{currentState,setCurrentState}}>
            <div className={"w-full h-full"}>
                {currentState==="intro" ?<Intro/>:
                currentState==="tutorial"?<Tutorial setCurrentState={setCurrentState} />
                    :<Gameplay/>}
                {/*{currentState==="intro" &&<Intro/>}*/}

            </div>
        </CurrentStateContext.Provider>
    </main>
  )
}
