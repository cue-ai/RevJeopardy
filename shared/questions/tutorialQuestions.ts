import {Question} from "@/shared/types/Game.types";

export const tutorialQuestions:Question[]=[
    {
        text: "Which software allows you to automate repetitive tasks based on trigger actions, also known as 'Zaps'?",
        answer: "Zapier",
        answers: ["Zapier", "IFTTT", "Microsoft Power Automate", "Workato"],
        value: 1000,
        numAttempts: 0,
        numCorrect: 0,
        category: "Data & Automation"
    },
    {
        text: "What is the term for the trend of providing customer service across various communication channels seamlessly?",
        answer: "Omnichannel customer service",
        answers: ["Omnichannel customer service", "Multichannel customer service", "Cross-platform customer service", "Integrated customer service"],
        value: 1000,
        numAttempts: 0,
        numCorrect: 0,
        category: "Modern Tech Trends"
    },
    {
        text: "This statistical measure represents the amount of variability or dispersion in a dataset.",
        answer: "Standard Deviation",
        answers: ["Mean", "Median", "Standard Deviation"],
        value: 1000,
        numAttempts: 0,
        numCorrect: 0,
        category: "Data Analysis",
    }
];
