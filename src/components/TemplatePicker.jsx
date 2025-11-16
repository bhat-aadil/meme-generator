import { useEffect, useState } from "react";

function TemplatePicker({ onSelect, customTemplates }) {
  const [templates, setTemplates] = useState([]);

  const [search, setSearch] = useState("");

  // Fetch templates from Imgflip API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json();
        if (data.success) {
          setTemplates(data.data.memes);
        }
      } catch (err) {
        console.error("Error fetching templates:", err);
      }
    };
    fetchTemplates();
  }, []);

  // Filter templates by search term
  const filteredTemplates = templates.filter((tpl) =>
    tpl.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Choose a Meme Template</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search templates..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-yellow-50 shadow w-full p-2 mb-3 rounded-md text-sm"
      />

      <div className="grid grid-cols-2 gap-5 max-h-[400px] overflow-y-auto">
        {/* Custom templates */}
        {customTemplates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => onSelect(tpl.url)}
            className=" bg-yellow-50 shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={tpl.url}
              alt={tpl.name}
              className="w-full h-auto border-0"
            />
            <p className="font-bold p-1 text-center text-blue-600">Custom</p>
          </button>
        ))}

        {/* Filtered Imgflip templates */}
        {filteredTemplates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => onSelect(tpl.url)}
            className="rounded-lg shadow-md bg-yellow-50 overflow-hidden hover:scale-105 transition-transform"
          >
            <img src={tpl.url} alt={tpl.name} className="w-full h-auto" />
            <p className=" text-gray-600 font-bold p-1 text-center">
              {tpl.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TemplatePicker;
