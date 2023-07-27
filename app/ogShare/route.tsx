/* eslint-disable */
import { ImageResponse } from 'next/server';


export const runtime = 'edge';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get('user');
    const email=searchParams.get('smail')
    const score=searchParams.get('score')

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    fontSize: 60,
                    color: 'black',
                    background: 'rgb(8 47 73)',
                    width: '100%',
                    height: '100%',
                    paddingTop: 50,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                {(user && score && email  )? (
                    <div
                        tw={"w-full flex flex-col items-center"}
                    >
                        <p tw={"text-xl text-slate-400"}>{user}</p>

                        <div
                            tw={`inline-block bg-gray-900 p-2 text-lg font-medium rounded-md text-slate-300 font-mono max-w-sm`}
                        >
                            {email}
                        </div>
                        <div tw={"w-full flex justify-center overflow-auto"}>
                               <h1 tw={"font-medium text-white font-mono text-4xl"}>{`Won ${score} dollars.`}</h1>
                        </div>
                    </div>
                ) : (
                    <h1 tw={"text-slate-400 font-bold text-4xl mt-8"}>
                        No query found
                    </h1>
                )}
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}
