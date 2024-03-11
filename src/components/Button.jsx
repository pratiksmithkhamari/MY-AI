import React, { useState } from "react";

const Button = ({answer}) => {
  const [yourQuestion, setYourQuestion] = useState("");
  return (
    <div>
      <div className="flex gap-6 w-full justify-center">
        <input
          type="text"
          className="border border-black w-[70%] rounded-2xl"
          value={yourQuestion}
          placeholder="search your querry..."
          onChange={(e) => {
            return setYourQuestion(e.target.value);
          }}
        />

        <button
          className="p-2 border rounded-xl text-nowrap bg-slate-500 active:bg-slate-600 text-white capitalize"
          onClick={() => {
            return generateAnswer() && setYourQuestion("");
          }}
        >
          generate data
        </button>
      </div>
    </div>
  );
};

export default Button;
