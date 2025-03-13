'use client';
import { openTheContentNote } from '@/app/EmpthyPlaceHolder';
import { useGlobalContext } from '@/ContextApi';
import { SearchOutlined } from '@mui/icons-material';
import { PlusIcon } from 'lucide-react';

function SearchBar() {
  const {
    darkModeObject: { darkMode },
    searchBarQueryObject: { setSearchBarQuery },
  } = useGlobalContext();

  return (
    <div
      className={`relative ml-3 sm:p-2 p-1 sm:w-[50%] w-[70%] rounded-3xl flex items-center gap-2 ${
        darkMode[1].isSelected ? 'bg-neutral-900' : 'bg-neutral-100'
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
        className={`w-[70%] outline-none text-[14px]    ${
          darkMode[1].isSelected
            ? 'bg-neutral-900 text-slate-300'
            : 'bg-neutral-100 text-slate-600'
        }`}
      />
      <AddSnippetButton />
    </div>
  );

  function AddSnippetButton() {
    const {
      openContentNoteObject: { setOpenContentNote },
      selectedNoteObject: { setSelectedNote },
      isNewNoteObject: { setIsNewNote },
      sharedUserIdObject: { sharedUserId },
    } = useGlobalContext();

    return (
      <div
        onClick={() =>
          openTheContentNote(
            setIsNewNote,
            setSelectedNote,
            setOpenContentNote,
            sharedUserId
          )
        }
        className="absolute  flex gap-2 px-2  rounded-3xl bg-violet-500 sm:py-[10px] py-[6px]  text-[13px] text-white right-0 items-center cursor-pointer select-none"
      >
        <PlusIcon className="w-[20px] h-[20px]" />
        <div className="text-md max-md:hidden">Snippet</div>
      </div>
    );
  }
}

export default SearchBar;
