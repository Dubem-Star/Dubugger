import { useState } from "react";

import "./App.css";
import Main from "./src/components/Main";

function App() {
  const [count, setCount] = useState(0);
  const [isInputValue, setIsInputValue] = useState("");

  {
    /* ***************HANDLE SEND FUNCTION***************** */
  }
  async function handleSend(value) {
    const loadingBar = document.getElementById("loadingBar");
    const sendBtnContent = document.getElementById("sendBtnContent");
    loadingBar.classList.add("show");

    sendBtnContent.src = `/icons/square_icon.png`;
    sendBtnContent.classList.remove("w-5", "h-5");
    sendBtnContent.classList.add("w-3", "h-3");

    const response = await fetch(
      "https://dubugger.vercel.app/api/sendMessage",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: value }),
      },
    );

    const res = await response.json();

    if (res.data) {
      loadingBar.classList.remove("show");
      document.getElementById("msgInput").value = "";
      const aiReply = res.data.messages.at(-1).content;
      alert(`User: ${value}....Model:${aiReply} `);
      sendBtnContent.src = `/icons/right-up_icon.png`;
      sendBtnContent.classList.remove("w-3", "h-3");
      sendBtnContent.classList.add("w-5", "h-5");
      setIsInputValue("");
    } else {
      const errorMessage =
        res.error?.message || res.error || "An unknown error occurred";
      alert(errorMessage);
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
