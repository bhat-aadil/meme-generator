import twemoji from "twemoji";

function EmojiSticker({ emoji, size = 48 }) {
  const html = twemoji.parse(emoji, {
    folder: "svg",
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
