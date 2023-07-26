import {Score} from "@/app/score/[id]/Score";

const Page=({ params }: { params: { id: string } })=>(
    <div className={"w-full h-full grid place-items-center"}>
        <Score id={params.id}/>
    </div>
)

export default Page