import EmojiPicker from "emoji-picker-react";

function StickerPicker({ onSelect }) {
  return (
    <div>
      <h3 className="font-bold mb-2">🎨 Add Stickers / Emojis</h3>
      <EmojiPicker onEmojiClick={(emojiData) => onSelect(emojiData)} />
    </div>
  );
}

export default StickerPicker;
