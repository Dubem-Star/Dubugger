import { useEffect, useState } from "react";

function InputBox(prop) {
  const [box, setBox] = useState(null);
  const [inputHeight, setInputHeight] = useState(null);

  function handleInputKeyDown(e) {
    const input = e.currentTarget;
    const value = input.textContent.trim();
    prop.setIsInputValue(e.currentTarget.textContent.trim());
    if (e.currentTarget.offsetHeight !== inputHeight) {
      document.getElementById("sendBtnCont").classList.add("self-end");
    } else {
      document.getElementById("sendBtnCont").classList.remove("self-end");
    }

    if (!value) {
      input.textContent = "";
    }
  }

  useEffect(() => {
    setBox(document.getElementById("box").offsetWidth);
    const inputHeight = document.getElementById("msgInput").offsetHeight;
    setInputHeight(inputHeight);
    return () => {};
  }, []);

  return (
    <div
      className={`${prop.inputWidth ? "flex flex-col px-5 md:px-0 absolute left-[50%] translate-x-[-50%] bottom-[10px] flex justify-center w-full" : ""}`}
    >
      {prop.inputWidth ? (
        <div
          className="w-full flex jusify-start  mb-4  loading-bar"
          id="loadingBar"
        >
          <img
            src="/logos/dubugger_logo_filled.png"
            className="w-7 prompt-loader"
          />
        </div>
      ) : null}

      <div
        className={` flex justify-center items-center  ${!prop.inputWidth ? " w-[390px] md:w-[500px]" : ""} rounded-xl mb-2 transition-all  py-2 ${prop.inputWidth ? `    w-full` : ""}  bg-slate-950/70 backdrop-blur-sm
    shadow-[0_10px_30px_rgba(15,23,42,0.7)]`}
        style={{
          background: prop.inputWidth
            ? "rgba(15, 23, 42, 0.72)"
            : "rgba(255,255,255,0.03)",
          border: "0.5px solid rgba(0, 188, 255, 0.2)",
        }}
      >
        {/* {contentEditable textarea} */}
        <div className="flex-1 overscroll-none min-w-0" id="box">
          <div
            contentEditable="true"
            placeholder="Ask Dubby..."
            onInput={(e) => handleInputKeyDown(e)}
            className={`center-input overscroll-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full min-w-0 overflow-y-auto min-h-[24px] max-h-[100px] bg-transparent text-base text-slate-300 resize-none  outline-none px-4 pt-2 pb-2 leading-relaxed placeholder:text-slate-600 whitespace-pre-wrap break-words`}
            id="msgInput"
          ></div>
        </div>

        <div
          className="flex items-center justify-between  px-3 py-1"
          id="sendBtnCont"
        >
          {/* ***************SUBMIT BUTTON***************** */}
          <div className="flex items-center  gap-2 flex-shrink-0">
            <button
              id="sendBtn"
              onClick={() => prop.handleSend(prop.isInputValue)}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-opacity cursor-pointer ${prop.isInputValue ? "opacity-100 pointer-events-auto" : "opacity-50 pointer-events-none"}`}
              style={{
                background: "linear-gradient(90deg, #61eb96, #59d88a, #0ee9b6)",
              }}
            >
              <img
                src="/icons/right-up_icon.png"
                id="sendBtnContent"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
