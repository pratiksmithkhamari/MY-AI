import { useEffect, useState } from "react";
import "@babel/polyfill";
import { apiKey } from "./utils/constant";
import "./App.css";
import axios from "axios";
import VoiceFeature from "./components/VoiceFeature";

function App() {
  const [answer, setAnswer] = useState([]);
  const [yourQuestion, setYourQuestion] = useState("");
  const [updateTranscript, setUpdateTranscript] = useState("");
  const [storeInput, setStoreInput] = useState("");

  console.log("loading");

  const generateAnswer = async () => {
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      method: "post",
      data: {
        contents: [{ parts: [{ text: yourQuestion }] }],
      },
    });
    setAnswer(response?.data?.candidates[0]?.content?.parts[0]?.text);
    setStoreInput(response?.data?.candidates[0]?.content?.parts[0]?.text);
  };

  useEffect(() => {
    localStorage.setItem("storeInput", storeInput);
  }, [storeInput]);

  const handleTranscript = (text) => {
    setUpdateTranscript(text);
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center  flex-col">
        <h1 className="text-3xl capitalize text-gray-600 font-bold">
          jaldi puch na bhai
        </h1>

        <div className=" flex items-center min-h-[30rem] break-all w-8/12 mt-7 gap-4 flex-col p-12 border border-1 border-emerald-800 rounded-xl justify-center">
          <div className="h-[30rem]  p-6 overflow-y-scroll bg-black w-full rounded-2xl gap-4  flex opacity-80 text-sky-50">
            <h1 className="h-8 w-8 rounded-full flex items-center justify-center fixed bg-blue-900 text-white">
              AI
            </h1>

            <p className="w-[90%] ml-11 break-all items-center">{answer}</p>
          </div>
          <div className="flex gap-6 w-full justify-center">
            <input
              type="text"
              className="border border-black w-[70%] rounded-2xl"
              value={yourQuestion || updateTranscript}
              placeholder="search your querry..."
              onChange={(e) => {
                return setYourQuestion(e.target.value);
              }}
            />
            <VoiceFeature handleTranscript={handleTranscript} />
            <button
              className="p-2 border rounded-xl text-nowrap bg-slate-500 active:bg-slate-600 text-white capitalize"
              onClick={() => {
                generateAnswer();
                setYourQuestion("");
                setUpdateTranscript("");
              }}
            >
              generate data
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
