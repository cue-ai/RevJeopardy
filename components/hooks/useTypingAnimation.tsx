import { useState, useEffect } from 'react';

export const useTypingAnimation = (content:string, speed=40) => {
    const [text, setText] = useState("")

    const [index, setIndex] = useState(0)

    useEffect(()=>{
        if (index===0)return;
        setIndex(0);
        setText("")

    },[content])

    useEffect(() => {
        if (index < content.length) {
            setTimeout(() => {
                setText(text + content[index])
                setIndex(index + 1)
            }, speed)
        }
    }, [index])
    return {text}
};

export const useTypingAnimationTwoElements = (content1:string,content2:string, speed1=40, speed2=40) => {

    const [text1, setText1] = useState("")
    const [text2, setText2] = useState("")

    const [index1, setIndex1] = useState(0)
    const [index2, setIndex2] = useState(0)

    useEffect(()=>{
        if (index1===0 && index2===0)return;
        setText1("");
        setText2("")
        setIndex1(0);
        setIndex2(0)
    },[content1,content1])

    useEffect(() => {
        if (index1 < content1.length) {
            setTimeout(() => {
                setText1((prev)=>prev+content1[index1])
                setIndex1((prev)=>prev + 1)
            }, speed1)
        }
        else if (index2 < content2.length) {
            setTimeout(() => {
                setText2((prev)=>prev+content2[index2])
                setIndex2((prev)=>prev + 1)
            }, speed2)
        }
    }, [index1, index2])
    return {text1,text2}
};


