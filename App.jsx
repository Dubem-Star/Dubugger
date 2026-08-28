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

    const response = await fetch("/api/sendMessage", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Hello Dubby" }),
    });

    const res = await response.json();

    if (res.data) {
      loadingBar.classList.remove("show");
      sendBtn.disabled = true;
      document.getElementById("msgInput").value = "";
      setIsInputValue(false);
      alert(res.data);
    } else {
      alert("error");
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
