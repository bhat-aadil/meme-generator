import * as htmlToImage from "html-to-image";
import { Rnd } from "react-rnd";
import EmojiSticker from "./EmojiSticker";

function MemeCanvas({
  template,
  topText,
  bottomText,
  stickers,
  setStickers,
  ref,
}) {
  const downloadMeme = async () => {
    if (!ref.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(ref.current, {
        cacheBust: true,
        useCors: true,
      });
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const removeSticker = (index) => {
    setStickers(stickers.filter((_, i) => i !== index));
  };

  return (
    <div className="text-center bg-yellow-100 p-2 shadow-md flex flex-col items-center rounded">
      <div
        ref={ref}
        className="relative w-[500px] h-[500px] max-tab:w-[300px] max-tab:h-[300px] bg-white rounded-lg shadow-md overflow-hidden"
        style={{
          backgroundImage: template ? `url(${template})` : "none",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Rnd
          default={{ x: 50, y: 20, width: "auto", height: "auto" }}
          bounds="parent"
          enableResizing={false}
        >
          <h2 className="absolute top-2 text-gray-800 font-extrabold text-2xl drop-shadow-lg cursor-move">
            {topText}
          </h2>
        </Rnd>
        <Rnd
          default={{ x: 50, y: 20, width: "auto", height: "auto" }}
          bounds="parent"
          enableResizing={false}
        >
          <h2 className="absolute top-60 text-gray-800 font-extrabold text-2xl drop-shadow-lg cursor-move">
            {bottomText}
          </h2>
        </Rnd>
        {/* Stickers/Emojis */}
        {stickers.map((sticker, index) => (
          <Rnd
            key={index}
            default={{ x: 50, y: 50, width: 60, height: 60 }}
            bounds="parent"
            lockAspectRatio
          >
            <div className="relative w-full h-full group">
              {sticker.type === "emoji" ? (
                <EmojiSticker emoji={sticker.value} size={48} />
              ) : (
                <img
                  src={sticker.value}
                  alt="sticker"
                  className="w-full h-full object-contain"
                />
              )}
              {/* Delete button */}
              <button
                onClick={(e) => {
                  removeSticker(index);
                }}
                className="delete-btn absolute -top-2 -right-2 bg-[#FF0000] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                ✕
              </button>
            </div>
          </Rnd>
        ))}
      </div>
      <button
        onClick={downloadMeme}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow cursor-pointer"
      >
        Download Meme
      </button>
    </div>
  );
}

export default MemeCanvas;
