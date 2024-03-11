import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone } from "react-icons/fa6";

const VoiceFeature = ({ handleTranscript }) => {
  const [inputValue, setInputValue] = useState("");
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const stopListening = () => SpeechRecognition.stopListening();
  if (!browserSupportsSpeechRecognition) {
    return <h1>browser not support voice recognition</h1>;
  }
  useEffect(() => {
    
    handleTranscript(transcript);
    setInputValue('');
    console.log(transcript);
  }, [transcript]);
  return (
    <>
      <div className="flex items-center">
        {/* <input
          type="text"
          className="ml-3"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        /> */}
        <button
          className="border bg-slate-500 text-white h-9 w-9 rounded-full flex items-center justify-center shadow-xl"
          onMouseDown={startListening}
          onMouseUp={stopListening}
        >
          <FaMicrophone className="text-xl " />
        </button>
        {/* <p className="bg-neutral-900 z-20index text-white ">{transcript}</p> */}
      </div>
    </>
  );
};

export default VoiceFeature;
