import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextTransition from "./TextTransition";
import Chatbox from "./Chatbox";
import InputBox from "./InputBox";

function Main(prop) {
  function fillQuick(text) {
    document.getElementById("msgInput").value = text;
    document.getElementById("msgInput").focus();
  }
  useEffect(() => {
    const msgInput = document.getElementById("msgInput");

    function submit(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (e.target.value.trim()) {
          prop.handleSend(e.target.value.trim());
        }
      }
    }

    if (msgInput) {
      msgInput.addEventListener("keydown", submit);
    }

    return () => {
      if (msgInput) msgInput.removeEventListener("keydown", submit);
    };
  }, []);

  const actionWords = [
    "Which line is giving you a <span class='bg-[linear-gradient(90deg,#6feb9f,#7dfcae,#0ee9b6)] bg-clip-text text-transparent'>Headache?",
    "Fixes error codes in <span class='bg-[linear-gradient(90deg,#6feb9f,#7dfcae,#0ee9b6)] bg-clip-text text-transparent'>minutes.",
    "Explains complex bugs <span class='bg-[linear-gradient(90deg,#6feb9f,#7dfcae,#0ee9b6)] bg-clip-text text-transparent'>instantly.",
  ];

  return (
    <>
      <div
        id="outerContainer"
        className="h-[100vh] bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.018)_0px,rgba(255,255,255,0.018)_1px,transparent_1px,transparent_8px),linear-gradient(135deg,#0d0f1a_0%,#111827_50%,#0d0f1a_100%)]  overflow-hidden flex flex-col font-sans sticky top-0"
      >
        {/* ************NAVBAR SECTION******************** */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-sky-400/20 bg-[rgba(13,15,26,0.8)] sticky top-0">
          <div className="flex items-center gap-2">
            <img
              src="/logos/dubugger_logo_transparent.png"
              className="w-5 h-5 flex items-center justify-center"
            />
            <span className="text-base font-semibold text-slate-200 tracking-wide">
              Dubugger
            </span>
          </div>
          <div className="flex gap-2">
            <img
              src="/icons/sign-in_icon.png"
              title="sign-in"
              onClick={() => alert("coming soon.")}
              className="w-7 h-7 p-[6px] cursor-pointer rounded-full hover:bg-white/5"
            />

            <img
              src="/icons/sidebar_icon.png"
              title="sidebar"
              onClick={() => alert("coming soon.")}
              className="w-7 h-7 p-[6px] cursor-pointer rounded-full hover:bg-white/5"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!prop.isSubmitted ? (
            <>
              {/* ************HEADER TEXT SECTION******************** */}
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col items-center pt-10 justify-center px-6 pb-6 "
              >
                <div className="mt-[-90px] md:mt-[-50px] lg:mt-[0]">
                  <div className="relative">
                    <h1 className="text-3xl md:text-4xl font-bold text-white text-center leading-snug mb-3 md:mb-1.5 max-w-[480px] opacity-0">
                      Which line is giving you a Headache?
                    </h1>
                    <TextTransition words={actionWords} />
                  </div>

                  <p className="text-[13px] text-slate-500 text-center mb-8 leading-relaxed max-w-[360px]">
                    Paste your error below. Dubby will explain it, fix it, and
                    make sure it never haunts you again.
                  </p>
                  {/* ************LOADING STATE******************** */}
                  <div
                    className="w-full max-w-[600px] mb-4  loading-bar"
                    id="loadingBar"
                  >
                    <img
                      src="/logos/dubugger_logo_filled.png"
                      className="w-7 prompt-loader"
                    />
                  </div>
                  {/* ************TEXT AREA SECTION******************** */}
                  <InputBox
                    isInputValue={prop.isInputValue}
                    setIsInputValue={prop.setIsInputValue}
                    handleSend={prop.handleSend}
                  />
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Chatbox
                isInputValue={prop.isInputValue}
                setIsInputValue={prop.setIsInputValue}
                handleSend={prop.handleSend}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Main;
