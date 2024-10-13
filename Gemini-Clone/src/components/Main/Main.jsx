// import React, { useContext, useEffect, useRef, useState } from "react";
// import "./Main.css";
// import { assets } from "../../assets/assets.js";
// import { Context } from "../../context/Context.jsx";

// const Main = () => {
//   const {
//     onSent,
//     showResult,
//     resultData,
//     setInput,
//     input,
//     conversationHistory,
//   } = useContext(Context);
//   const resultRef = useRef(null);
//   const [rows, setRows] = useState(1);
//   const [history, setHistory] = useState([]); // Initialize an empty history array

//   useEffect(() => {
//     const updateRows = () => {
//       setRows(window.innerWidth <= 600 ? 2 : 1);
//     };

//     updateRows();
//     window.addEventListener("resize", updateRows);
//     return () => window.removeEventListener("resize", updateRows);
//   }, []);

//   useEffect(() => {
//     if (resultRef.current) {
//       resultRef.current.scrollTop = resultRef.current.scrollHeight;
//     }
//   }, [history]); // Trigger scroll when history updates

//   const handleSend = async () => {
//     const currentPrompt = input;
//     setInput(""); // Clear input field

//     // Add new prompt to history with loading set to true
//     const newPromptIndex = history.length;
//     setHistory((prevHistory) => [
//       ...prevHistory,
//       { prompt: currentPrompt, response: "", loading: true },
//     ]);
//     console.log("first")
//     // Trigger sending the prompt and receiving a response
//     await onSent(currentPrompt);
//     console.log("second")
//     console.log(resultData)
//     // Update the specific item in history with the response data and set loading to false
//     setHistory((prevHistory) =>
//       prevHistory.map((item, index) =>
//         index === newPromptIndex
//           ? { ...item, response: resultData, loading: false }
//           : item
//       )
//     );
//   };

//   return (
//     <main className="main">
//       <nav className="nav">
//         <p>Gemini</p>
//         <img src={assets.user_icon} alt="" />
//       </nav>
//       <div className="main-container">
//         {!showResult ? (
//           <>
//             <div className="greet">
//               <p><span>Hello, Dev</span></p>
//               <p>How can I help you today?</p>
//             </div>
//             <div className="cards">
//               <div
//                 className="card"
//                 onClick={() => setInput("Suggest beautiful places to see on an upcoming road trip")}
//               >
//                 <p>Suggest beautiful places to see on an upcoming road trip</p>
//                 <img src={assets.compass_icon} alt="" />
//               </div>
//               <div
//                 className="card"
//                 onClick={() => setInput("Briefly summarize this concept: urban planning")}
//               >
//                 <p>Briefly summarize this concept: urban planning</p>
//                 <img src={assets.bulb_icon} alt="" />
//               </div>
//               <div
//                 className="card"
//                 onClick={() => setInput("Brainstorm team bonding activities for our work retreat")}
//               >
//                 <p>Brainstorm team bonding activities for our work retreat</p>
//                 <img src={assets.message_icon} alt="" />
//               </div>
//               <div
//                 className="card"
//                 onClick={() => setInput("Tell me about React js and React native")}
//               >
//                 <p>Tell me about React js and React native</p>
//                 <img src={assets.code_icon} alt="" />
//               </div>
//             </div>
//           </>
//         ) : (
//           <div ref={resultRef}>
//             {history.map((item, index) => (
//               <div key={index} className="result">
//                 <div className="result-title">
//                   <img src={assets.user_icon} alt="" />
//                   <p>{item.prompt}</p>
//                 </div>
//                 <div className="result-data">
//                   <img className="result-data-icon" src={assets.gemini_icon} alt="" />
//                   {item.loading ? (
//                     <div className="loader">
//                       <hr />
//                       <hr />
//                       <hr />
//                     </div>
//                   ) : (
//                     <p dangerouslySetInnerHTML={{ __html: item.response }}></p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="main-bottom">
//           <div className="search-box">
//             <textarea
//               rows={rows}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyUp={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   handleSend();
//                 }
//               }}
//               value={input}
//               placeholder="Enter a prompt here"
//             />
//             <div className="icon-container">
//               <button>
//                 <img src={assets.gallery_icon} alt="" />
//               </button>
//               <button>
//                 <img src={assets.mic_icon} alt="" />
//               </button>
//               <button type="submit" onClick={handleSend} disabled={history[history.length - 1]?.loading}>
//                 <img src={assets.send_icon} alt="" />
//               </button>
//             </div>
//           </div>
//           <p className="bottom-info">
//             Gemini may display inaccurate info, including about people, so double-check its responses.
//             <a href="#">Your privacy and Gemini Apps</a>
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Main;



import React, { useContext, useEffect, useRef, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/Context.jsx";

const Main = () => {
  const {
    onSent,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    conversationHistory,
  } = useContext(Context);
  const resultRef = useRef(null);
  const [rows, setRows] = useState(1);

  useEffect(() => {
    const updateRows = () => {
      setRows(window.innerWidth <= 600 ? 2 : 1);
    };

    updateRows();
    window.addEventListener("resize", updateRows);
    return () => window.removeEventListener("resize", updateRows);
  }, []);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [conversationHistory]);

  const handleSend = async () => {
    if (input.trim() !== "") {
      await onSent(input);
    }
  };

  return (
    <main className="main">
      <nav className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </nav>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Dev</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() => setInput("Suggest beautiful places to see on an upcoming road trip")}
              >
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => setInput("Briefly summarize this concept: urban planning")}
              >
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => setInput("Brainstorm team bonding activities for our work retreat")}
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => setInput("Tell me about React js and React native")}
              >
                <p>Tell me about React js and React native</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result" ref={resultRef}>
            {conversationHistory.map((item, index) => (
              <React.Fragment key={index}>
                <div className="result-title">
                  <img src={assets.user_icon} alt="" />
                  <p>{item.prompt}</p>
                </div>
                <div className="result-data">
                  <img className="result-data-icon" src={assets.gemini_icon} alt="" />
                  <p dangerouslySetInnerHTML={{ __html: item.response }}></p>
                </div>
              </React.Fragment>
            ))}
            {loading && (
              <div className="result-data">
                <img className="result-data-icon" src={assets.gemini_icon} alt="" />
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              </div>
            )}
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <textarea
              rows={rows}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              value={input}
              placeholder="Enter a prompt here"
            />
            <div className="icon-container">
              <button>
                <img src={assets.gallery_icon} alt="" />
              </button>
              <button>
                <img src={assets.mic_icon} alt="" />
              </button>
              <button type="submit" onClick={handleSend} disabled={loading}>
                <img src={assets.send_icon} alt="" />
              </button>
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses.
            <a href="#">Your privacy and Gemini Apps</a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Main;