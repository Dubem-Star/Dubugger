function ChatMenuButtons(msg) {
  return (
    <>
      <img
        src="/icons/copy.png"
        alt="copy message"
        title="Copy message"
        class="w-3 h-3 md:w-[15px] md:me-1 md:h-[15px] mt-[6px] md:mt-1 cursor-pointer copy-icon md:opacity-0  "
        onClick={(e) => {
          e.target.src = "/icons/checkmark.png";
          const plainText = msg.content.replace(/<[^>]*>/g, "");
          navigator.clipboard.writeText(plainText);
          setTimeout(() => {
            e.target.src = "/icons/copy.png";
          }, 2000);
        }}
      />

      {msg.role === "model" ? (
        <img
          src="/icons/recycle.png"
          alt="regenerate response"
          title="Regenerate response"
          class="w-3 h-3 md:w-[15px] md:h-[15px] mt-[6px] md:mt-1 ms-2 cursor-pointer regenerate-icon md:opacity-0"
          onClick={(e) => {
            alert("coming soon.");
          }}
        />
      ) : (
        <img
          src="/icons/edit.png"
          alt="edit message"
          title="Edit message"
          class="w-3 h-3 md:w-4 md:h-4 mt-[6px] md:mt-1 ms-2 cursor-pointer edit-icon md:opacity-0"
          onClick={(e) => {
            alert("coming soon.");
          }}
        />
      )}
    </>
  );
}

export default ChatMenuButtons;
