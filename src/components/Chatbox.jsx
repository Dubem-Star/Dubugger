import InputBox from "./InputBox";
import { useRef, useEffect, useState } from "react";
function Chatbox(prop) {
  const [inputWidth, setInputWidth] = useState(null);
  const chatCont = useRef(null);

  useEffect(() => {
    const outerWrapper = document.getElementById("outerContainer");
    const scrollableContainer = document.getElementById("innerContainer");

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

  return (
    <>
      <div className="flex-1 flex-col  w-full h-[100vh] max-w-4xl mx-auto px-5 md:px-30 pt-2 pb-8 overflow-hidden">
        {/* Welcome / conversation area */}
        <div
          ref={chatCont}
          className="flex h-[85%] relative overflow-y-auto flex-col gap-6 mb-10 [scrollbar-width:none][-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mb-10"
          id="innerContainer"
        >
          {/* User message */}
          <div className="flex justify-end">
            <div className="max-w-[80%] md:max-w-[65%]">
              <div className="rounded-2xl rounded-tr-sm bg-sky-400/10 border border-sky-400/20 px-4 py-3">
                <p className="text-sm text-slate-200 leading-relaxed">
                  I'm getting a TypeError saying Cannot read properties of
                  undefined. I don't understand what's causing it.
                </p>
              </div>

              <span className="block text-[10px] text-slate-600 text-right mt-1">
                You
              </span>
            </div>
          </div>

          {/* Dubby message */}
          <div className="flex items-start gap-3">
            <div className="max-w-[85%] md:max-w-[75%]">
              <div className="rounded-2xl rounded-tl-sm border border-white/5 bg-white/[0.025] px-4 py-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  That error usually means you're trying to access a property on
                  something that doesn't exist yet.
                </p>

                <p className="text-sm text-slate-400 leading-relaxed mt-3">
                  For example:
                </p>

                {/* Code block */}
                <div className="mt-3 rounded-lg overflow-hidden border border-sky-400/10 bg-[#090b14]">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                      JavaScript
                    </span>

                    <button className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors">
                      Copy
                    </button>
                  </div>

                  <pre className="p-3 overflow-x-auto text-xs leading-relaxed">
                    <code className="text-sky-300">
                      {`const name = user.profile.name;`}
                    </code>
                  </pre>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mt-4">
                  If <span className="text-slate-200">user.profile</span> is
                  undefined, JavaScript won't be able to access{" "}
                  <span className="text-slate-200">name</span>.
                </p>
              </div>

              <span className="block text-[10px] text-slate-600 mt-1">
                Dubby
              </span>
            </div>
          </div>

          {/* Another user message */}
          <div className="flex justify-end">
            <div className="max-w-[80%] md:max-w-[65%]">
              <div className="rounded-2xl rounded-tr-sm bg-sky-400/10 border border-sky-400/20 px-4 py-3">
                <p className="text-sm text-slate-200 leading-relaxed">
                  Ohhh, so I should check if profile exists first?
                </p>
              </div>

              <span className="block text-[10px] text-slate-600 text-right mt-1">
                You
              </span>
            </div>
          </div>

          <div className="max-w-[85%] md:max-w-[75%] mb-10">
            <div className="rounded-2xl rounded-tl-sm border border-white/5 bg-white/[0.025] px-4 py-3">
              <p className="text-sm text-slate-300 leading-relaxed">
                Exactly. You can use optional chaining to safely access nested
                properties.
              </p>

              <div className="mt-3 rounded-lg border border-sky-400/10 bg-[#090b14] px-3 py-3">
                <code className="text-xs text-[#61eb96]">
                  user?.profile?.name
                </code>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed mt-3">
                That way, JavaScript won't throw an error if one of those values
                doesn't exist.
              </p>
            </div>

            <span className="block text-[10px] text-slate-600 mt-1">Dubby</span>
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
