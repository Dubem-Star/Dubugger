import { useState } from "react";

import "./App.css";
import Main from "./src/components/Main";

function App() {
  const [count, setCount] = useState(0);
  const [isInputValue, setIsInputValue] = useState("");

  async function handleSend() {
    const msg = document.getElementById("msgInput").value.trim();
    if (!msg) return;

    const loadingBar = document.getElementById("loadingBar");
    const sendBtn = document.getElementById("sendBtn");
    loadingBar.classList.add("show");

    const response = await fetch(
      "https://dubugger.vercel.app/api/sendMessage",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: isInputValue }),
      },
    );

    const res = await response.json();

    if (res.data) {
      loadingBar.classList.remove("show");
      sendBtn.disabled = true;
      document.getElementById("msgInput").value = "";

      const aiReply = res.data.messages.at(-1).content;

      alert(res.data`User: ${isInputValue}....Model:${aiReply} `);
      setIsInputValue(false);
    } else {
      alert("error");
      console.log(res.e);
    }
  }

  return (
    <>
      <Main
        handleSend={handleSend}
        isInputValue={isInputValue}
        setIsInputValue={setIsInputValue}
      />
    </>
  );
}

export default App;
