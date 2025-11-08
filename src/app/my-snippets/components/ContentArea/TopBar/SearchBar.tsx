'use client';
import { useGlobalContext } from '@/ContextApi';
import { SearchOutlined } from '@mui/icons-material';

function SearchBar() {
  const {
    darkModeObject: { darkMode },
    searchBarQueryObject: { setSearchBarQuery },
  } = useGlobalContext();

  return (
    <div
      className={`relative ml-3 sm:p-2 p-1 w-[50%] rounded-3xl flex items-center gap-2 ${
        darkMode[1].isSelected ? 'bg-neutral-800 ' : 'bg-neutral-100'
      }`}
    >
      <SearchOutlined
        className={` ${
          darkMode[1].isSelected ? 'text-slate-100' : ' text-violet-600'
        }`}
        sx={{ fontSize: 25 }}
      />
      <input
        id="search-input"
        name="input"
        onChange={(e) => setSearchBarQuery(e.target.value)}
        placeholder="Search a snippet..."
        className={`w-full outline-none text-[14px]    ${
          darkMode[1].isSelected
            ? 'bg-neutral-800 text-slate-300'
            : 'bg-neutral-100 text-slate-600'
        }`}
      />
    </div>
  );
}

export default SearchBar;
