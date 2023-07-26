import {Alex} from "@/components/organisms/Sprites/Alex";
import {FC, FormEventHandler, useState} from "react";
import {Loading} from "@/components/atoms/Loading";

export type GameOverProps={
    score:number
}
export const GameOver:FC<GameOverProps>=({score})=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [loading,setLoading]=useState(false);
    const [submitted,setSubmitted]=useState(false);
    const [savedUrl,setSavedUrl]=useState("");

    const handleSubmit=async(e: any)=>{
        e.preventDefault()
        if (submitted) {
            await navigator.clipboard.writeText(savedUrl);
            return
        }
        setLoading(true)
        const res = await fetch("/api/leaderboard", {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                score
            }),
        });
        const {url}=await res.json();
        await navigator.clipboard.writeText(url);
        setSavedUrl(url);
        setLoading(false)
        setSubmitted(true)
    }

    return (<div className={"w-full flex flex-col justify-center items-center bg-slate-600 text-white rounded-md py-8 p-2 border"}>
        <Alex headerText={`Great Job.` }
              contentText={`You have a final score of ${score}. Add it to the leaderboard if you want`} />

        {loading ? <div className={"mt-12"}><Loading/></div>
            :
            <form className={"w-6/12 mt-10 space-y-4 flex flex-col justify-center items-center"} onSubmit={handleSubmit}>
            <input type="text" id="first_name"
                   className="tracking-widest bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Name" required
                   disabled={submitted}
                   onChange={(e) => setName(e.target.value)}
                   value={name}
            />
            <input type="email" id="femail"
                   className="tracking-widest bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Email"
                   required
                   disabled={submitted}
                   onChange={(e) => setEmail(e.target.value)}
                   value={email}
            />
            <button type="submit"
                                  className="tracking-widest mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded">
                    {`${!submitted ? "Submit": "Link copied to clipboard"}`}</button>

        </form>
        }

    </div>)
}