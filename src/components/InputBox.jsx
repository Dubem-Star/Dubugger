function InputBox(prop) {
  console.log(prop.inputWidth);
  return (
    <div
      className={`${prop.inputWidth ? "px-5 md:px-30 absolute left-[50%] translate-x-[-50%] bottom-[10px] w-full" : ""}`}
    >
      <div
        className={`  max-w-[600px] rounded-xl mb-2 transition-all ${prop.inputWidth ? `  flex justify-center items-center   w-full` : ""}  bg-slate-950/70 backdrop-blur-sm
    shadow-[0_10px_30px_rgba(15,23,42,0.7)]`}
        style={{
          background: prop.inputWidth
            ? "rgba(15, 23, 42, 0.72)"
            : "rgba(255,255,255,0.03)",
          border: "0.5px solid rgba(0, 188, 255, 0.2)",
        }}
      >
        <textarea
          id="msgInput"
          row={prop.inputWidth ? "3" : "1"}
          className="w-full bg-transparent text-base text-slate-300 resize-none h-auto outline-none px-4 pt-4 pb-2 leading-relaxed placeholder:text-slate-600"
          placeholder="Ask Dubby..."
          onChange={(e) => prop.setIsInputValue(e.target.value.trim())}
        ></textarea>

        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          {!prop.inputWidth ? (
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
          ) : null}

          {/* ***************SUBMIT BUTTON***************** */}
          <div className="flex items-center gap-2">
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
