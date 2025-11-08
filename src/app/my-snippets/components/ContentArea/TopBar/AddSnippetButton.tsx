import { Plus } from 'lucide-react';
import { openTheContentNote } from '@/app/EmpthyPlaceHolder';
import { useGlobalContext } from '@/ContextApi';
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
      className=" flex gap-2 px-2 font-semibold rounded-3xl bg-violet-500 sm:py-[10px] py-[6px]  text-[13px] text-white  items-center cursor-pointer select-none"
    >
      <AISnippetIcon />
      <div className="text-md max-md:hidden">Snippet</div>
    </div>
  );
}

export default AddSnippetButton;

const AISnippetIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[20px] h-[20px]"
  >
    <Plus className="w-[20px] h-[20px]" />
    {/* AI sparkle in top right corner */}
    <circle cx="18" cy="4" r="2" fill="currentColor" />
    {/* Small sparkle dots */}
    <circle cx="4" cy="4" r="1.5" fill="currentColor" opacity="1" />
    <circle cx="17" cy="20" r="1.5" fill="currentColor" opacity="1" />
  </svg>
);
