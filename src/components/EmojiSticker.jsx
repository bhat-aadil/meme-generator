import React from "react";
import twemoji from "twemoji";

function EmojiSticker({ emoji, size = 48 }) {
  const html = twemoji.parse(emoji, {
    folder: "svg", // use svg for sharp scaling
    ext: ".svg",
  });

  return (
    <span
      style={{ width: size, height: size, display: "inline-block" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default EmojiSticker;
