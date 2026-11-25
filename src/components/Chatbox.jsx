import InputBox from "./InputBox";
import ChatMenuButtons from "./plugins/ChatMenuButtons";
import { useRef, useEffect, useState } from "react";

function Chatbox(prop) {
  const [inputWidth, setInputWidth] = useState(true);
  const chatCont = useRef(null);
  const [navHeight, setNavHeight] = useState(20);
  const [timestamp, setTimestamp] = useState(null);

  // TIME SPANS INTERVALS*******************************
  function formatTimestamp(inputTime) {
    const now = new Date();
    const past = new Date(inputTime);
    const diffInSeconds = Math.floor((now - past) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInSeconds < 60) return "Now";
    if (diffInMinutes < 60)
      return `${diffInMinutes}${diffInMinutes < 2 ? `min` : `mins`} ago `;
    if (diffInHours < 24)
      return `${diffInHours}${diffInHours < 2 ? `hr` : `hrs`} ago `;

    const options = { day: "numeric", month: "short", year: "numeric" };
    return past.toLocaleDateString("en-GB", options);
  }

  // Wrap the selector and loop inside a named function
  function refreshAllTimestamps() {
    const timeSpans = document.querySelectorAll(".live-time");
    for (let span of timeSpans) {
      const originalTime = span.getAttribute("data-time");
      span.innerText = formatTimestamp(originalTime);
    }
  }
  // Refresh all timestamps every minute
  refreshAllTimestamps();
  setInterval(refreshAllTimestamps, 60000);

  // RELEVANT USEEFFECTS*******************************
  useEffect(() => {
    const outerWrapper = document.getElementById("outerContainer");
    const scrollableContainer = document.getElementById("innerContainer");
    const navbar = document.getElementById("navbar");
    const innerTable = document.getElementById("innerTabl");
    setNavHeight(navbar ? navbar.offsetHeight : 0);
    if (chatCont.current) {
      setInputWidth(true);
    }

    outerWrapper.addEventListener(
      "wheel",
      (e) => {
        if (e.target.closest("#msgInput")) return;
        if (e.target.closest(".table-scroll")) return;
        // e.preventDefault();
        scrollableContainer.scrollTop += e.deltaY;
      },
      { passive: false },
    );

    document.addEventListener(
      "wheel",
      (e) => {
        const scrollWrapper = e.target.closest(".table-scroll");
        if (!scrollWrapper) return;
        const table = scrollWrapper.querySelector("table");
        const before = scrollWrapper.scrollLeft;
        scrollWrapper.scrollLeft += e.deltaX;
        if (scrollWrapper.scrollLeft !== before) {
          e.preventDefault();
        }
      },
      { passive: false },
    );

    prop.setEnterKey("chatbox");
  }, []);

  useEffect(() => {
    const innerContainer = chatCont.current;
    if (!innerContainer) return;

    innerContainer.scrollTo({
      top: innerContainer.scrollHeight,
      behavior: "smooth",
    });
  }, [prop.messages, navHeight]);

  return (
    <>
      <div
        className={`flex flex-1 mx-auto h-[calc(100dvh-${navHeight}px)] max-w-[600px] justify-end w-full px-5 md:px-0 pt-2 pb-15 overflow-hidden relative`}
      >
        {/* Welcome / conversation area */}

        <div
          ref={chatCont}
          className="flex h-[98%] pb-5 mb-3   relative overflow-y-auto flex-col gap-6  w-full [scrollbar-width:none][-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden  inner-container"
          id="innerContainer"
        >
          <div className=" flex-none min-h-full">
            {prop.messages.map((msg, i) => {
              return (
                <>
                  {msg.role === "model" &&
                  msg.content === "...This request has been aborted..." ? (
                    <div
                      className={`w-full flex items-center my-6 gap-3 text-slate-400 text-[12px] `}
                    >
                      <span className="h-px flex-1 bg-slate-400/20"></span>
                      <p className="whitespace-nowrap">
                        You stopped this response
                      </p>
                      <span className="h-px flex-1 bg-slate-400/20"></span>
                    </div>
                  ) : (
                    <div
                      className={`flex relative ${msg.role === "user" ? "justify-end" : "justify-start"} mb-10 chat-message`}
                      key={i}
                    >
                      <div
                        className={`relative chat-bubble ${msg.role === "user" ? "max-w-[80%] md:max-w-[65%]" : "max-w-[100%]"}`}
                      >
                        <div
                          className={`rounded-2xl  flex justify-center ${msg.role === "user" ? "rounded-tr-sm bg-sky-400/10 border border-sky-400/20" : "rounded-tl-sm border border-white/5 bg-white/[0.025]"} p-3 `}
                        >
                          {msg.role === "user" ? (
                            <p className="text-sm text-slate-200  leading-relaxed">
                              {msg.content}
                            </p>
                          ) : (
                            //  msg.content ===
                            //   "...This request has been aborted..." ? (
                            //   <div
                            //     className={`w-full text-center border-1 mt-5 border-slate-600/20 text-slate-600 text-[12px] py-2 rounded-md`}
                            //   >
                            //     {" "}
                            //     <p>This request has been aborted</p>{" "}
                            //   </div>
                            // ) :
                            <div
                              className="assistant-response text-sm text-slate-200 leading-relaxed w-full"
                              dangerouslySetInnerHTML={{ __html: msg.content }}
                            />
                          )}
                        </div>
                      </div>
                      <div
                        className={`absolute chat-bubble-menu  whitespace-nowrap flex justify-end bottom-[-22px] ${msg.role === "user" ? "justify-end " : "justify-start "}`}
                      >
                        {msg.role === "user" ? ChatMenuButtons(msg) : null}

                        <span
                          data-time={`${msg.timestamp}`}
                          className={` block text-[10px] live-time text-slate-600 ${msg.role === "user" ? "ms-3" : "me-3 "} mt-1`}
                        >
                          Now
                        </span>

                        {msg.role === "model" ? ChatMenuButtons(msg) : null}
                      </div>
                    </div>
                  )}
                </>
              );
            })}
            {/* <div className={`w-full text-center border-1 mt-5 border-slate-600/20 text-slate-600 text-[12px] py-2 rounded-md ${prop.abortController ? "block" : "hidden"}`}>
              {" "}
              <p>This request has been aborted</p>{" "}
            </div> */}
          </div>
        </div>

        <InputBox
          isInputValue={prop.isInputValue}
          setIsInputValue={prop.setIsInputValue}
          handleSend={prop.handleSend}
          inputWidth={inputWidth}
          isLoading={prop.isLoading}
          setIsLoading={prop.setIsLoading}
          formatTimestamp={formatTimestamp}
        />
      </div>
    </>
  );
}

export default Chatbox;
