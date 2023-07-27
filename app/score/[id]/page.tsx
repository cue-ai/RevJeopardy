import {Score} from "@/app/score/[id]/Score";
import {Metadata} from "next";

type MetaProps = {
    params: { id: string }
}

export async function generateMetadata(
    { params }: MetaProps
): Promise<Metadata> {
    const id = params.id

    let data;
    try{
        const res = await fetch(`https://www.revjeopardy.com/api/leaderboard/${id}`, {
            method: "GET",
        });
        data=await res.json();
    }
    catch(err){
         data={score:0,name:""}
    }
    return {
        openGraph: {
            title: "Revenue based Jeopardy",
            description:
                "A RevOps twist on the classic game show, Jeopardy",
            images: [`https://www.revjeopardy.com/ogShare?score=${data.score}&name=${data.name}`],
        },
        twitter: {
            card: "summary_large_image",
            title: "Revenue based Jeopardy",
            description: 'A RevOps twist on the classic game show, Jeopardy',
            images: [`https://www.revjeopardy.com/ogShare?score=${data.score}&name=${data.name}`],
        },
    }
}

const Page=({ params }: { params: { id: string } })=>(
    <div className={"w-screen h-screen grid place-items-center"}>
        <Score id={params.id}/>
    </div>
)

export default Page