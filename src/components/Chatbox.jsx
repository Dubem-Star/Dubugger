import InputBox from "./InputBox";
import { useRef, useEffect, useState } from "react";

function Chatbox(prop) {
  const [inputWidth, setInputWidth] = useState(null);
  const chatCont = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const outerWrapper = document.getElementById("outerContainer");
    const scrollableContainer = document.getElementById("innerContainer");
    const navbar = document.getElementById("navbar");
    setNavHeight(navbar ? navbar.offsetHeight : 0);
    if (chatCont.current) {
      setInputWidth(chatCont.current.offsetWidth);
    }

    outerWrapper.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        scrollableContainer.scrollTop += e.deltaY;
      },
      { passive: false },
    );
  }, []);

  useEffect(() => {
    const innerContainer = document.getElementById("innerContainer");
    innerContainer.scrollTo({
      top: innerContainer.scrollHeight,
      behavior: "smooth",
    });
  }, [prop.messages]);

  return (
    <>
      <div
        className={`flex flex-1 mx-auto h-[calc(100dvh-${navHeight}px)] max-w-[600px] justify-end w-full px-5 md:px-0 pt-2 pb-20 overflow-hidden relative`}
      >
        {/* Welcome / conversation area */}

        <div
          ref={chatCont}
          className="flex h-[95%]   relative overflow-y-auto flex-col gap-6  w-full [scrollbar-width:none][-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden  inner-container"
          id="innerContainer"
        >
          <div className="flex-1 min-h-0  ">
            {prop.messages.map((msg, i) => {
              return (
                <div
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-6 chat-message`}
                  key={i}
                >
                  <div className="max-w-[80%] md:max-w-[65%]">
                    <div
                      className={`rounded-2xl flex justify-center ${msg.role === "user" ? "rounded-tr-sm bg-sky-400/10 border border-sky-400/20" : "rounded-tl-sm border border-white/5 bg-white/[0.025]"} p-3 `}
                    >
                      <p className="text-sm text-slate-200  leading-relaxed">
                        {msg.content}
                      </p>
                    </div>

                    <span className="block text-[10px] text-slate-600 text-right mt-1">
                      {msg.role === "user" ? "You" : "Dubby"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <InputBox
          isInputValue={prop.isInputValue}
          setIsInputValue={prop.setIsInputValue}
          handleSend={prop.handleSend}
          inputWidth={inputWidth}
        />
      </div>
    </>
  );
}

export default Chatbox;
