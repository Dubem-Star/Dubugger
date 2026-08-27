import { useState } from "react";

import "./App.css";
import Main from "./src/components/Main";

function App() {
  const [count, setCount] = useState(0);

  function handleSend() {
    // const code = document.getElementById("codeInput").value.trim();
    const msg = document.getElementById("msgInput").value.trim();
    if (!msg) return;

    const loadingBar = document.getElementById("loadingBar");
    const responseCard = document.getElementById("responseCard");
    // const responseBody = document.getElementById("responseBody");
    const sendBtn = document.getElementById("sendBtn");
    // loadingBar.classList.remove("hidden");
    loadingBar.classList.add("show");
    // responseCard.classList.add("hidden");
    sendBtn.disabled = true;
    sendBtn.style.opacity = "0.5";

    // const responses = [
    //   `<span className="text-violet-400 font-semibold">Root cause:</span> You're calling <code>.map()</code> on a value that's <code>undefined</code> — usually means your data hasn't loaded yet when the component first renders.\n\n<span className="text-violet-400 font-semibold">Fix:</span> Add a guard before you map:\n\n<code>{products && products.map(...)}</code>\n\nor initialise your state as an empty array instead of <code>null</code>.`,
    //   `<span className="text-violet-400 font-semibold">What happened:</span> The variable you're reading from doesn't exist at that point in execution. ClassNameic async timing issue.\n\n<span className="text-violet-400 font-semibold">Quick fix:</span> Check your state initialisation — make sure it defaults to <code>[]</code> not <code>undefined</code>, and add a loading state to prevent renders before data arrives.`,
    //   `<span className="text-violet-400 font-semibold">Dubby spotted it:</span> This is a stale closure or undefined ref issue. The function is running before the value it depends on is available.\n\n<span className="text-violet-400 font-semibold">Try this:</span> Add optional chaining <code>?.map()</code> as a quick guard, then trace back to where the value is set.`,
    // ];

    setTimeout(() => {
      loadingBar.classList.remove("show");
      // responseBody.innerHTML =
      //   responses[Math.floor(Math.random() * responses.length)];
      // responseCard.classList.remove("hidden");
      sendBtn.disabled = false;
      sendBtn.style.opacity = "1";

      document.getElementById("msgInput").value = "";
    }, 2200);
  }

  return (
    <>
      <Main handleSend={handleSend} />
    </>
  );
}

export default App;
