import { AddOutlined } from '@mui/icons-material';
import { SingleNoteType } from './Types';
import { v4 as uuidv4 } from 'uuid';
import { useGlobalContext } from '@/ContextApi';

function EmpthyPlaceHolder({
  muiIcon,
  text,
  isNew,
}: {
  muiIcon: React.ReactNode;
  text: React.ReactNode;
  isNew?: boolean;
}) {
  const {
    isNewNoteObject: { setIsNewNote },
    selectedNoteObject: { setSelectedNote },
    openContentNoteObject: { setOpenContentNote },
    sharedUserIdObject: { sharedUserId },
  } = useGlobalContext();

  return (
    <div className="w-full h-[510px] pt-20 flex gap-3 flex-col items-center">
      {muiIcon}
      {text}
      {isNew && (
        <button
          className="bg-violet-600 p-[8px] px-5 text-sm text-white rounded-md mt-2 justify-center items-center"
          onClick={() =>
            openTheContentNote(
              setIsNewNote,
              setSelectedNote,
              setOpenContentNote,
              sharedUserId
            )
          }
        >
          <AddOutlined sx={{ fontSize: 20, color: 'white' }} />
          <span className="ml-1">Add a new snippet</span>
        </button>
      )}
    </div>
  );
}

export default EmpthyPlaceHolder;

export function openTheContentNote(
  setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>,
  setOpenContentNote: React.Dispatch<React.SetStateAction<boolean>>,
  sharedUserId: string
) {
  const newSingleNote = {
    _id: uuidv4(),
    clerkUserId: sharedUserId || '',
    title: '',
    creationDate: new Date().toISOString(),
    tags: [],
    description: '',
    code: '',
    isFavorite: false,
    language: '',
    isTrash: false,
  };
  setIsNewNote(true);

  setSelectedNote(newSingleNote);
  setOpenContentNote(true);
}
