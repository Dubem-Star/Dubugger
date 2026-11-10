import InputBox from "./InputBox";
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

  // COPY BUTTON FUNCTION*******************************
  function placeMenuButtons(msg) {
    return (
      <>
        <img
          src="/icons/copy.png"
          alt="copy message"
          title="Copy message"
          class="w-3 h-3 md:w-[15px] md:me-1 md:h-[15px] mt-[6px] md:mt-1 cursor-pointer copy-icon md:opacity-0  "
          onClick={(e) => {
            e.target.src = "/icons/checkmark.png";
            navigator.clipboard.writeText(msg.content);
            setTimeout(() => {
              e.target.src = "/icons/copy.png";
            }, 2000);
          }}
        />

        {msg.role === "model" ? (
          <img
            src="/icons/recycle.png"
            alt="regenerate response"
            title="Regenerate response"
            class="w-3 h-3 md:w-[15px] md:h-[15px] mt-[6px] md:mt-1 ms-2 cursor-pointer regenerate-icon md:opacity-0"
            onClick={(e) => {
              alert("coming soon.");
            }}
          />
        ) : (
          <img
            src="/icons/edit.png"
            alt="edit message"
            title="Edit message"
            class="w-3 h-3 md:w-4 md:h-4 mt-[6px] md:mt-1 ms-2 cursor-pointer edit-icon md:opacity-0  "
            onClick={(e) => {
              alert("coming soon.");
            }}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div
        className={`flex flex-1 mx-auto h-[calc(100dvh-${navHeight}px)] max-w-[600px] justify-end w-full px-5 md:px-0 pt-2 pb-15 overflow-hidden relative`}
      >
        {/* Welcome / conversation area */}

        <div
          ref={chatCont}
          className="flex h-[98%] pb-3 mb-3   relative overflow-y-auto flex-col gap-6  w-full [scrollbar-width:none][-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden  inner-container"
          id="innerContainer"
        >
          <div className=" flex-none min-h-full">
            {prop.messages.map((msg, i) => {
              return (
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
                        <div
                          className="assistant-response text-sm text-slate-200 leading-relaxed w-full"
                          dangerouslySetInnerHTML={{ __html: msg.content }}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`absolute chat-bubble-menu  w-fit flex justify-end ${msg.role === "user" ? "justify-end bottom-[-20px]" : "justify-start bottom-[-22px]"}`}
                  >
                    {msg.role === "user" ? placeMenuButtons(msg) : null}

                    <span
                      data-time={`${msg.timestamp}`}
                      className={` block text-[10px] live-time text-slate-600 ${msg.role === "user" ? "ms-3" : "me-3 "} mt-1`}
                    >
                      Now
                    </span>

                    {msg.role === "model" ? placeMenuButtons(msg) : null}
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
          isLoading={prop.isLoading}
          setIsLoading={prop.setIsLoading}
          formatTimestamp={formatTimestamp}
        />
      </div>
    </>
  );
}

export default Chatbox;
