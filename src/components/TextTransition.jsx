import React, { useState, useEffect, useMemo } from "react";

export default function TextTransition({
  words,
  typingSpeed = 50,
  deletingSpeed = 50,
  pauseTime = 3000,
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentTokenIndex, setCurrentTokenIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Tokenize all words. Handles heavy classes and inline quotes perfectly.
  const tokenizedWords = useMemo(() => {
    const regex = /(<[^>]*?(?:"[^"]*"|'[^']*')[^>]*?>|[^<])/g;
    return words.map((word) => word.match(regex) || []);
  }, [words]);

  useEffect(() => {
    const currentTokens = tokenizedWords[currentWordIndex];
    let timer;

    if (!isDeleting) {
      // Typing forward
      timer = setTimeout(() => {
        const nextIndex = currentTokenIndex + 1;
        setCurrentTokenIndex(nextIndex);

        // Pause before deleting when all tokens are displayed
        if (nextIndex === currentTokens.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }, typingSpeed);
    } else {
      // Deleting backward
      timer = setTimeout(() => {
        const nextIndex = currentTokenIndex - 1;
        setCurrentTokenIndex(nextIndex);

        // Switch to the next word once fully cleared
        if (nextIndex === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }, deletingSpeed);
    }

    return () => clearTimeout(timer);
  }, [
    currentTokenIndex,
    isDeleting,
    currentWordIndex,
    words,
    tokenizedWords,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  // 2. Reconstruct the visible HTML string from the sliced token array
  const currentHtmlString = tokenizedWords[currentWordIndex]
    .slice(0, currentTokenIndex)
    .join("");

  return (
    <h1 className="text-3xl md:text-4xl font-bold text-white text-center leading-snug mb-3 md:mb-1.5 max-w-[480px] absolute top-0 start-0">
      <span dangerouslySetInnerHTML={{ __html: currentHtmlString }} />

      {/* Permanent, safe cursor that never breaks */}
      <span className="ml-1 animate-pulse font-bold text-[#59d88a]">|</span>
    </h1>
  );
}
