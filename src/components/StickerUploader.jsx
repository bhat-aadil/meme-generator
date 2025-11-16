function StickerUploader({ onUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "image/png" ||
        file.type === "image/gif" ||
        file.type === "image/jpeg")
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a PNG, JPG, or GIF image.");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="font-bold mb-2">🖼 Upload Custom Sticker</h3>
      <input
        type="file"
        accept="image/png,image/gif,image/jpeg"
        onChange={handleFileChange}
        className="cursor-pointer bg-yellow-50 shadow rounded p-2 w-2/3"
      />
    </div>
  );
}

export default StickerUploader;
