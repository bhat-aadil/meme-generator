import { useState, useRef } from "react";
import MemeCanvas from "./components/MemeCanvas";
import Controls from "./components/Controls";
import StickerPicker from "./components/StickerPicker";
import StickerUploader from "./components/StickerUploader";
import TemplatePicker from "./components/TemplatePicker";
import { FaBars } from "react-icons/fa";

function App() {
  const memeRef = useRef(null);
  const [template, setTemplate] = useState(null);
  const [customTemplates, setCustomTemplates] = useState([]);

  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [stickers, setStickers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Handle custom upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newTemplate = {
          id: Date.now(),
          name: file.name,
          url: reader.result,
          custom: true,
        };
        setCustomTemplates((prev) => [...prev, newTemplate]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStickerAdd = (emojiData) => {
    setStickers((prev) => [...prev, { type: "emoji", value: emojiData.emoji }]);
  };

  const handleImageUpload = (imageData) => {
    setStickers([...stickers, { type: "image", value: imageData }]);
  };

  function handleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative min-h-screen flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-4">🎭 Meme Generator</h1>
      <FaBars
        className="fixed top-10 left-2 z-50 hidden max-tab:block mt-4 mb-4"
        onClick={handleSidebar}
      />

      <main className="w-full flex items-baseline relative">
        <aside
          id="side"
          className={`absolute left-0 bg-yellow-100 rounded-lg shadow-md p-2 z-50 transform transition-transform duration-300 overflow-auto
          ${isOpen ? "translate-x-0" : "-translate-x-96"} tab:translate-x-0
          ${isOpen ? "w-full" : "w-1/4"} `}
        >
          {/* Controls for text */}
          <Controls
            topText={topText}
            setTopText={setTopText}
            bottomText={bottomText}
            setBottomText={setBottomText}
            handleUpload={handleUpload}
          />
          {/* Stickers */}
          <StickerPicker onSelect={handleStickerAdd} />

          {/* Custom Sticker */}
          <StickerUploader onUpload={handleImageUpload} />
        </aside>

        <div
          id="main-view"
          className="absolute right-0 w-[70%] max-tab:w-full flex flex-col gap-10"
        >
          {/* Template selection */}
          <TemplatePicker
            onSelect={setTemplate}
            customTemplates={customTemplates}
          />

          {/* Meme preview & download */}
          {template && (
            <MemeCanvas
              ref={memeRef}
              template={template}
              topText={topText}
              bottomText={bottomText}
              stickers={stickers}
              setStickers={setStickers}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
