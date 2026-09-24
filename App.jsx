import { useState, useEffect } from "react";
import { marked } from "marked";
import "./App.css";
import Main from "./src/components/Main";
import Chatbox from "./src/components/Chatbox";

function App() {
  const [enterKey, setEnterKey] = useState("home");
  const [isInputValue, setIsInputValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);

  {
    /* ***************HANDLE SEND FUNCTION***************** */
  }
  async function handleSend(value) {
    const loadingBar = document.getElementById("loadingBar");
    const sendBtnContent = document.getElementById("sendBtnContent");
    const innerContainer = document.getElementById("innerContainer");
    const sendBtn = document.getElementById("sendBtn");
    const msgInput = document.getElementById("msgInput");
    loadingBar.classList.add("show");
    sendBtn.disabled = true;

    sendBtnContent.src = `/icons/square_icon.png`;
    sendBtnContent.className = "w-3 h-3";
    setMessages((prev) => [...prev, { role: "user", content: value }]);

    if (innerContainer) {
      innerContainer.scrollTo({
        top: innerContainer.scrollHeight,
        behavior: "smooth",
      });
      msgInput.textContent = "";
    }

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
      setIsSubmitted(true);
      setIsInputValue("");
      loadingBar.classList.remove("show");
      sendBtnContent.src = `/icons/right-up_icon.png`;
      sendBtnContent.className = "w-5 h-5";
      sendBtn.disabled = false;

      const aiReply = res.data.messages.at(-1).content;
      const convertedReply = marked.parse(aiReply);
      setMessages((prev) => [
        ...prev,
        { role: "model", content: convertedReply },
      ]);
    } else {
      alert(res.error || "An error occurred while sending the message.");
      console.log(res.error);
    }
  }

  {
    /* ***************HANDLE ENTER KEY SEND FUNCTION***************** */
  }
  useEffect(() => {
    const msgInput = document.getElementById("msgInput");

    function submit(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (e.target.textContent.trim()) {
          setIsInputValue(e.target.textContent.trim());
          handleSend(e.target.textContent.trim());
        }
      }
    }

    if (msgInput) {
      msgInput.addEventListener("keydown", submit);
    }

    return () => {
      if (msgInput) msgInput.removeEventListener("keydown", submit);
    };
  }, [enterKey]);

  return (
    <>
      <Main
        handleSend={handleSend}
        isInputValue={isInputValue}
        setIsInputValue={setIsInputValue}
        setIsSubmitted={setIsSubmitted}
        isSubmitted={isSubmitted}
        messages={messages}
        setMessages={setMessages}
        enterKey={enterKey}
        setEnterKey={setEnterKey}
      />
    </>
  );
}

export default App;
