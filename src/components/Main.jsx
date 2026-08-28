import { useState, useEffect } from "react";
import TextTransition from "./TextTransition";

function Main(prop) {
  // const [isInputValue, setIsInputValue] = useState("");

  function fillQuick(text) {
    document.getElementById("msgInput").value = text;
    document.getElementById("msgInput").focus();
  }

  document.getElementById("msgInput")
    ? document
        .getElementById("msgInput")
        .addEventListener("keydown", function (e) {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            prop.handleSend();
          }
        })
    : null;

  const actionWords = [
    "Which line is giving you a <span class='bg-[linear-gradient(90deg,#6feb9f,#7dfcae,#0ee9b6)] bg-clip-text text-transparent'>Headache?",
    "Fixes error codes in <span class='bg-[linear-gradient(90deg,#6feb9f,#7dfcae,#0ee9b6)] bg-clip-text text-transparent'>minutes.",
    "Explains complex bugs <span class='bg-[linear-gradient(90deg,#6feb9f,#7dfcae,#0ee9b6)] bg-clip-text text-transparent'>instantly.",
  ];

  return (
    <>
      <div className="min-h-[100vh] bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.018)_0px,rgba(255,255,255,0.018)_1px,transparent_1px,transparent_8px),linear-gradient(135deg,#0d0f1a_0%,#111827_50%,#0d0f1a_100%)]  overflow-hidden flex flex-col font-sans">
        {/* ************HEADER SECTION******************** */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-sky-400/20 bg-[rgba(13,15,26,0.8)]">
          <div className="flex items-center gap-2">
            <img
              src="/dubugger_logo.png"
              className="w-5 h-5 flex items-center justify-center"
            />
            <span className="text-base font-semibold text-slate-200 tracking-wide">
              Dubugger
            </span>
          </div>
          <div className="flex gap-2">
            <img
              src="/logout_icon.png"
              title="sign-in"
              onClick={() => alert("coming soon.")}
              className="w-7 h-7 p-[6px] cursor-pointer rounded-full hover:bg-white/5"
            />

            <img
              src="/sidebar_icon.png"
              title="sidebar"
              onClick={() => alert("coming soon.")}
              className="w-7 h-7 p-[6px] cursor-pointer rounded-full hover:bg-white/5"
            />
          </div>
        </div>
        {/* ************HEADER TEXT SECTION******************** */}
        <div className="flex-1 flex flex-col items-center pt-10 justify-center px-6 pb-6">
          <div className="relative">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center leading-snug mb-3 md:mb-1.5 max-w-[480px] opacity-0">
              Which line is giving you a Headache?
            </h1>
            <TextTransition words={actionWords} />
          </div>

          <p className="text-[13px] text-slate-500 text-center mb-8 leading-relaxed max-w-[360px]">
            Paste your error below. Dubby will explain it, fix it, and make sure
            it never haunts you again.
          </p>
          {/* ************LOADING STATE******************** */}
          <div
            className="w-full max-w-[600px] mb-4  loading-bar"
            id="loadingBar"
          >
            <img
              src="/dubugger_logo_loader.png"
              className="w-7 prompt-loader"
            />
          </div>

          {/* ************RESPONSE CARD******************** */}
          {/* <div
            className="w-full max-w-[600px] bg-cyan-500/[0.04] border border-cyan-500/20 rounded-xl p-4 hidden mb-4"
            id="responseCard"
          >
            <div className="flex items-center gap-2 mb-2.5">
              <i
                className="ti ti-sparkles text-[15px] text-cyan-400"
                aria-hidden="true"
              ></i>
              <span className="text-xs font-semibold text-cyan-300 tracking-wider uppercase">
                Dubby found the issue
              </span>
            </div>
            <div
              className="text-[13px] text-slate-400 leading-relaxed font-mono"
              id="responseBody"
            ></div>
          </div> */}

          <div
            className="w-full max-w-[600px] rounded-xl mb-5 transition-all"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "0.5px solid rgba(0, 188, 255, 0.2)",
            }}
          >
            <textarea
              id="msgInput"
              rows="3"
              className="w-full bg-transparent text-base text-slate-300 resize-none outline-none px-4 pt-4 pb-2 leading-relaxed placeholder:text-slate-600"
              placeholder="Ask Dubby..."
              onInput={() => {
                const msg = document.getElementById("msgInput").value.trim();
                if (msg) {
                  prop.setIsInputValue(true);
                } else {
                  prop.setIsInputValue(false);
                }
              }}
            ></textarea>

            <div className="flex items-center justify-between px-3 pb-3 pt-1">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-300 transition-colors px-2 py-1 rounded-md hover:bg-white/5">
                  <i className="ti ti-paperclip text-sm"></i>
                </button>
                <button className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-200 transition-colors px-2 py-1 rounded-md hover:bg-white/5">
                  <i className="ti ti-photo text-sm"></i>
                  <span>Create an image</span>
                </button>
                <button className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-200 transition-colors px-2 py-1 rounded-md hover:bg-white/5">
                  <i className="ti ti-world text-sm"></i>
                  <span>Search the web</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  id="sendBtn"
                  onClick={() => prop.handleSend()}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-opacity cursor-pointer ${prop.isInputValue ? "opacity-100 pointer-events-auto" : "opacity-50 pointer-events-none"}`}
                  style={{
                    background:
                      "linear-gradient(90deg, #61eb96, #59d88a, #0ee9b6)",
                  }}
                >
                  <img src="/right-up_icon.png" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 w-full max-w-[600px]">
            <div
              className="bg-white/[0.03] border border-white/[0.07] rounded-[10px] p-3 cursor-pointer transition-all hover:bg-cyan-500/[0.04] hover:border-cyan-500/30"
              onClick={() => fillQuick("Explain this error")}
            >
              <div className="text-base mb-1.5 text-violet-400">
                <i className="ti ti-zoom-question" aria-hidden="true"></i>
              </div>
              <div className="text-xs font-semibold text-slate-200 mb-0.5">
                Explain error
              </div>
              <div className="text-[11px] text-slate-600 leading-tight">
                Break it down in plain English
              </div>
            </div>
            <div
              className="bg-white/[0.03] border border-white/[0.07] rounded-[10px] p-3 cursor-pointer transition-all hover:bg-cyan-500/[0.04] hover:border-cyan-500/30"
              onClick={() => fillQuick("Fix this bug for me")}
            >
              <div className="text-base mb-1.5 text-violet-400">
                <i className="ti ti-tool" aria-hidden="true"></i>
              </div>
              <div className="text-xs font-semibold text-slate-200 mb-0.5">
                Fix the bug
              </div>
              <div className="text-[11px] text-slate-600 leading-tight">
                Get working code instantly
              </div>
            </div>
            <div
              className="bg-white/[0.03] border border-white/[0.07] rounded-[10px] p-3 cursor-pointer transition-all hover:bg-cyan-500/[0.04] hover:border-cyan-500/30"
              onClick={() => fillQuick("Why does this keep happening?")}
            >
              <div className="text-base mb-1.5 text-violet-400">
                <i className="ti ti-refresh-alert" aria-hidden="true"></i>
              </div>
              <div className="text-xs font-semibold text-slate-200 mb-0.5">
                Why it repeats
              </div>
              <div className="text-[11px] text-slate-600 leading-tight">
                Understand the root cause
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
