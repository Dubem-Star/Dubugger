import { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import "./App.css";
import Main from "./src/components/Main";
import Chatbox from "./src/components/Chatbox";

function App() {
  const [enterKey, setEnterKey] = useState("home");
  const [isInputValue, setIsInputValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(
    localStorage.getItem("isSubmitted") === "true" ? true : false,
  );
  const [messages, setMessages] = useState(
    localStorage.getItem("messages")
      ? JSON.parse(localStorage.getItem("messages"))
      : [],
  );
  const [abortController, setAbortController] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef(null);
  {
    /* ***************HANDLE SEND FUNCTION***************** */
  }

  async function handleSend(value, timestamp) {
    const loadingBar = document.getElementById("loadingBar");
    const sendBtnContent = document.getElementById("sendBtnContent");
    const innerContainer = document.getElementById("innerContainer");
    const sendBtn = document.getElementById("sendBtn");
    const msgInput = document.getElementById("msgInput");

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      return;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    if (loadingBar) loadingBar.classList.add("show");

    if (innerContainer) {
      innerContainer.scrollTo({
        top: innerContainer.scrollHeight,
        behavior: "smooth",
      });
      msgInput.textContent = "";
    }

    sendBtn.title = "Stop Response";
    sendBtnContent.src = `/icons/square_icon.png`;
    sendBtnContent.className = "w-3 h-3";
    setMessages((prev) => [
      ...prev,
      { role: "user", content: value, timestamp: timestamp },
    ]);

    {
      /* ***************FETCH RESPONSE FROM BACKEND***************** */
    }
    try {
      const response = await fetch(
        "https://dubugger.vercel.app/api/sendMessage",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: value,
            chatId: localStorage.getItem("chatId") || null,
          }),
          signal: controller.signal,
        },
      );

      const res = await response.json();

      {
        /* ***************GET RESPONSE FROM BACKEND***************** */
      }
      if (res.data) {
        setIsSubmitted(true);
        localStorage.setItem("isSubmitted", "true");
        localStorage.setItem("chatId", res.chatId);
        setIsInputValue("");
        setIsLoading(false);
        if (loadingBar) loadingBar.classList.remove("show");

        sendBtnContent.src = `/icons/right-up_icon.png`;
        sendBtnContent.className = "w-5 h-5";
        sendBtn.title = "Send";

        const aiReply = res.data.messages.at(-1).content;
        const html = marked.parse(aiReply);
        const parsed = new DOMParser().parseFromString(html, "text/html");

        parsed.querySelectorAll("table").forEach((table) => {
          const wrapper = document.createElement("div");
          wrapper.className = "table-scroll";

          table.before(wrapper);
          wrapper.append(table);
        });

        const convertedReply = parsed.body.innerHTML;
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: convertedReply,
            timestamp: new Date().toISOString(),
          },
        ]);
      } else {
        alert(res.error || "An error occurred while sending the message.");
        console.log(res.error);
        setIsLoading(false);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        // IF REQUEST GETS ABORTED
        setIsLoading(false);
        if (loadingBar) {
          loadingBar.classList.remove("show");
        }
        sendBtnContent.src = `/icons/right-up_icon.png`;
        sendBtnContent.className = "w-5 h-5";
        sendBtn.title = "Send";
        // alert("This request has been aborted.");
        setAbortController(true);
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: "...This request has been aborted...",
            timestamp: new Date().toISOString(),
          },
        ]);
        // alert("This request has been aborted.");
      }
    }

    if (abortControllerRef.current === controller) {
      abortControllerRef.current = null;
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
          setIsLoading(true);
          handleSend(e.target.textContent.trim(), new Date().toISOString());
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

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

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
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        abortController={abortController}
        setAbortController={setAbortController}
      />
    </>
  );
}

export default App;
