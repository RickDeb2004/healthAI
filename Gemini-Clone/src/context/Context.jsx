// import {createContext, useState} from "react";
// import runChat from "../config/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {

//     const [input, setInput] = useState("");
//     const [recentPrompt, setRecentPrompt] = useState("");
//     const [prevPrompts, setPrevPrompts] = useState([]);
//     const [showResult, setShowResult] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [resultData, setResultData] = useState("");

//     const delayPara = (index, nextWord) => {
//         setTimeout(function () {
//             setResultData(prev => prev + nextWord)
//         }, 75 * index);
//     }

//     const newChat = () => {
//         setLoading(false);
//         setShowResult(false);
//     }

//     const onSent = async (prompt) => {


//         setResultData("");
//         setLoading(true);
//         setShowResult(true);
//         let response;
//         if (prompt !== undefined) {
//             response = await runChat(prompt);
//             setRecentPrompt(prompt);
//         } else {
//             setPrevPrompts(prev => [...prev, input]);
//             setRecentPrompt(input);
//             response = await runChat(input);
//         }

//         let responseArray = response.split("**");
//         let newResponse = "";
//         for (let i = 0; i < responseArray.length; i++) {
//             if (i === 0 || i % 2 !== 1) {
//                 newResponse += responseArray[i];
//             } else {
//                 newResponse += "<b>" + responseArray[i] + "</b>"
//             }

//         }
//         let newResponse2 = newResponse.split("*").join("</br>");
//         let newResponseArray = newResponse2.split(" ");
//         for (let i = 0; i < newResponseArray.length; i++) {
//             const nextWord = newResponseArray[i];
//             delayPara(i, nextWord + " ");
//         }
//         setLoading(false);
//         setInput("");
//     }

//     const contextValue = {
//         prevPrompts,
//         setPrevPrompts,
//         onSent,
//         recentPrompt,
//         setRecentPrompt,
//         showResult,
//         loading,
//         resultData,
//         input,
//         setInput,
//         newChat
//     }
//     return (
//         <Context.Provider value={contextValue}>
//             {props.children}
//         </Context.Provider>
//     )
// }

// export default ContextProvider;



import { createContext, useState } from "react";


export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const baseURL=import.meta.env.VITE_BASE_URL;

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        const userPrompt = prompt !== undefined ? prompt : input;

        try {
            const res = await fetch(`${baseURL}/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: userPrompt })
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            response = data.agent;
        } catch (error) {
            console.error('Error:', error);
            response = "Sorry, there was an error processing your request.";
        }

        setRecentPrompt(userPrompt);
        if (prompt === undefined) {
            setPrevPrompts(prev => [...prev, userPrompt]);
        }

        let newResponseArray = response.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;