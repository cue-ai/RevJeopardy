import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        const {question,answer } = await req.json();

        const sim=similarity(question.answer,answer);
        return NextResponse.json({ isCorrect:sim>0.8 });

    } catch (err) {
        return new NextResponse("Server Error", { status: 520 });
    }
}

const similarity=(s1:string, s2:string)=>{
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    let longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(`${longerLength}`);
}

const editDistance=(s1:string, s2:string)=>{
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    var costs = [];
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}