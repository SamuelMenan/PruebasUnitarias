import React, { useState } from "react";

const NAMES = [
  "Ana",
  "Luis",
  "Carlos",
  "María",
  "Pedro",
  "Lucía",
  "Juan",
  "Sofía",
  "Miguel",
  "Valentina"
];

const SearchList: React.FC = () => {
  const [query, setQuery] = useState("");

  const filtered = NAMES.filter(name =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-2 text-white">Buscador en Lista</h2>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Buscar nombre..."
        className="border rounded px-2 py-1 mb-4 text-white bg-gray-800 placeholder-gray-400 border-gray-600"
        data-testid="search-input"
      />
      <ul className="list-disc mx-auto w-fit text-left text-white" data-testid="name-list">
        {filtered.length > 0 ? (
          filtered.map(name => <li key={name} className="text-white">{name}</li>)
        ) : (
          <li className="text-red-400">No encontrado</li>
        )}
      </ul>
    </div>
  );
};

export default SearchList;
