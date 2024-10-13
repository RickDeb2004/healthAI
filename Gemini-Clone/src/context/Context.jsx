// import { createContext, useState } from "react";
// import axios from 'axios';

// export const Context = createContext();

// const ContextProvider = (props) => {
//     const [input, setInput] = useState("");
//     const [recentPrompt, setRecentPrompt] = useState("");
//     const [prevPrompts, setPrevPrompts] = useState([]);
//     const [showResult, setShowResult] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [resultData, setResultData] = useState("");
//     const [conversationHistory, setConversationHistory] = useState([]);

//     const delayPara = (index, nextWord) => {
//         setTimeout(function () {
//             setResultData(prev => prev + nextWord)
//         }, 75 * index);
//     }

//     const newChat = () => {
//         setLoading(false);
//         setShowResult(false);
//     }

//     const baseURL=import.meta.env.VITE_BASE_URL;

//     const onSent = async (prompt) => {
//         setResultData("");
//         setLoading(true);
//         setShowResult(true);
//         let response;
//         const userPrompt = prompt !== undefined ? prompt : input;

//         try {
//             const res = await axios.post(`${baseURL}/predict`, {
//                 user: userPrompt
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });

//             const data = await res.data;
//             response = data.agent;
//         } catch (error) {
//             console.error('Error:', error);
//             response = "Sorry, there was an error processing your request.";
//         }

//         setRecentPrompt(userPrompt);
//         setConversationHistory(prev => [...prev, { prompt: userPrompt, response }]);

//         let newResponseArray = response.split(" ");
//         for (let i = 0; i < newResponseArray.length; i++) {
//             const nextWord = newResponseArray[i];
//             delayPara(i, nextWord + " ");
//         }

//         // Clear input and reset loading state after response is complete
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
//         newChat,
//         conversationHistory
//     }

//     return (
//         <Context.Provider value={contextValue}>
//             {props.children}
//         </Context.Provider>
//     )
// }

// export default ContextProvider;

import { createContext, useState } from "react";
import axios from "axios";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [conversationHistory, setConversationHistory] = useState([]);

  const baseURL = import.meta.env.VITE_BASE_URL;

  const onSent = async (prompt) => {
    setLoading(true);
    setShowResult(true);
    const userPrompt = prompt !== undefined ? prompt : input;

    try {
      const res = await axios.post(
        `${baseURL}/predict`,
        {
          user: userPrompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = res.data.agent;

      setConversationHistory((prev) => [
        ...prev,
        { prompt: userPrompt, response },
      ]);
      setResultData(response);
    } catch (error) {
      console.error("Error:", error);
      setResultData(`Sorry, there was an error processing your request.\n
                ${error}`);
    }

    setRecentPrompt(userPrompt);
    setLoading(false);
    setInput("");
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setConversationHistory([]);
  };

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
    newChat,
    conversationHistory,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
