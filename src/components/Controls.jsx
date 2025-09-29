import React from "react";

function Controls({
  topText,
  setTopText,
  bottomText,
  setBottomText,
  handleUpload,
}) {
  return (
    <div className="flex flex-col gap-4 mt-2 mb-8">
      {/* Upload custom template */}
      <label className="block mb-3">
        <span className="font-bold mb-2">Upload your own template</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="cursor-pointer bg-yellow-50 shadow rounded p-2 w-2/3 mt-2"
        />
      </label>
      <h2 className="font-bold">Add Text</h2>

      <input
        type="text"
        value={topText}
        onChange={(e) => setTopText(e.target.value)}
        placeholder="Top text"
        className="  bg-yellow-50 rounded p-2 shadow"
      />
      <input
        type="text"
        value={bottomText}
        onChange={(e) => setBottomText(e.target.value)}
        placeholder="Bottom text"
        className="bg-yellow-50 rounded p-2 shadow"
      />
    </div>
  );
}

export default Controls;
