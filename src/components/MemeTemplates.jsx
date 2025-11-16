function MemeTemplates({ templates, onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-64 overflow-y-scroll">
      {templates.map((meme) => (
        <img
          key={meme.id}
          src={meme.url}
          alt={meme.name}
          onClick={() => onSelect(meme)}
          className="cursor-pointer rounded-lg shadow hover:scale-105 transition"
        />
      ))}
    </div>
  );
}

export default MemeTemplates;
