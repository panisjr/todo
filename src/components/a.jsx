import { useState } from "react";

const SearchComponent = () => {
  const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  const searchItems = (query) => {
    setSearchTerm(query);
    if (query.trim() === "") {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        items.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
      );
    }
  };

  return (
    <div className="p-4">
      <input
        className="h-8 p-3 w-[250px] text-sm peer border border-gray-300 rounded-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => searchItems(e.target.value)}
        value={searchTerm}
        placeholder="Search items..."
      />
      <ul className="mt-2">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <li key={index} className="p-2 border-b border-gray-200">
              {item}
            </li>
          ))
        ) : (
          <li className="p-2 text-gray-500">No results found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchComponent;
