import {Alex} from "@/components/organisms/Sprites/Alex";
import {FC, FormEventHandler, useEffect, useState} from "react";
import {Loading} from "@/components/atoms/Loading";

export type GameOverProps={
    score:number
}
export const GameOver:FC<GameOverProps>=({score})=>{
    const [name,setName]=useState("");
    const [loading,setLoading]=useState(false);
    const [submitted,setSubmitted]=useState(false);
    const [savedUrl,setSavedUrl]=useState("");
    const [rankState,setRankState]=useState<number >(0);
    const [isFirstTime,setIsFirstTime]=useState(true);

    const handleSubmit=async(e: any)=>{
        setIsFirstTime(false)
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
                score

            }),
        });
        // const {url}=await res.json();
        // setSavedUrl(url);
        setLoading(false)
        setSubmitted(true)
    }
    const shareScore=async(e:any)=>{
        e.preventDefault();
        setIsFirstTime(false)
        if (savedUrl){
            await navigator.clipboard.writeText(savedUrl);
            return;
        }
        try{
            setLoading(true)
            const res = await fetch("/api/leaderboard", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    score
                }),
            });
            const {url}=await res.json();
            await navigator.clipboard.writeText(url);
            setSavedUrl(url);
            setLoading(false)
        }
        catch(err){
            setLoading(false)
        }

    }

    const getScoreHigherThan=async()=>{
        setLoading(true);
        const res = await fetch("/api/leaderboard", {
            method: "POST",
            body: JSON.stringify({
                score,
                getRanking:true
            }),
        });
        const {rank}=await res.json();
        const stringRank=(rank*100).toFixed(2)
        setRankState(parseFloat(stringRank));
        setLoading(false)
    }
    useEffect(()=>{
        void getScoreHigherThan();
    },[])

    return (<div className={`w-full ${loading &&"h-full"}  flex flex-col justify-center items-center bg-slate-500 text-white rounded-md py-8 p-2 border`}>
        {loading ? <div className={"mt-12"}><Loading/></div>
            :
            <div className={"w-full py-2  flex flex-col items-center justify-center "}>
        <Alex isStatic={!isFirstTime} headerText={`Congrats, You have a final score of ${score}, better than ${rankState}% of people who play RevJeopardy` }
              contentText={`Add your score to the leaderboard and share with friends`} />


            <form className={"w-6/12 mt-10 space-y-4 flex flex-col justify-center items-center"} onSubmit={handleSubmit}>
            <input type="submit" id="first_name"
                   className="tracking-widest bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Name" required
                   minLength={1}
                   disabled={submitted}
                   onChange={(e) => setName(e.target.value)}
                   value={name}
            />
            <div className={"flex space-x-8 h-full"}>
                <button type="submit"
                        className="tracking-widest mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded"
                onClick={handleSubmit}>
                    {`${!submitted ? "Add Score": "Added"}`}</button>

                <button
                        className="tracking-widest mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded"
                        onClick={shareScore}
                >
                    {!savedUrl?`Share Score`: "Copied to clipboard"}</button>
            </div>


        </form>
            </div>
        }

    </div>)
}