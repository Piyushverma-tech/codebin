import { useGlobalContext } from '@/ContextApi';
import { atomOneLight, dracula } from 'react-code-blocks';
import {
  DeleteOutline,
  DeleteRounded,
  Favorite,
  Replay,
  RestoreFromTrashOutlined,
  TextSnippetOutlined,
} from '@mui/icons-material';
import dynamic from 'next/dynamic';
import { SingleNoteType, SingleTagType } from '@/app/Types';
import getLanguageIcon from '@/app/utils/languageTextToIcon';
import { Checkbox } from '@mui/material';
import toast, { Toast } from 'react-hot-toast';
import { useCallback, useEffect, useState } from 'react';
import EmpthyPlaceHolder from '@/app/EmpthyPlaceHolder';
import { capitalizeFirstOccurrence } from '../../sidebar/Sidebar';
import { Heart, Tag } from 'lucide-react';

function AllNotesSection() {
  const {
    allNotesObject: { allNotes },
    sideBarMenuObject: { sideBarMenu },
    openContentNoteObject: { setOpenContentNote },
    tagsClickedObject: { tagsClicked },
    isLoadingObject: { isLoading },
    searchBarQueryObject: { searchBarQuery },
  } = useGlobalContext();

  const [filteredNotes, setFilteredNotes] = useState<SingleNoteType[]>([]);

  // Consolidate filtering logic into a single function
  const filterNotes = useCallback(() => {
    let notes = [...allNotes];

    // Sidebar filter logic
    if (sideBarMenu[0].isSelected) {
      notes = notes.filter((note) => !note.isTrash);
    } else if (sideBarMenu[1].isSelected) {
      // "Favorites" selected

      notes = notes.filter((note) => !note.isTrash && note.isFavorite);
    } else if (sideBarMenu[2].isSelected) {
      // "Trash" selected

      notes = notes.filter((note) => note.isTrash);
    }

    // Search filter logic
    if (searchBarQuery.trim() !== '') {
      notes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchBarQuery.toLowerCase())
      );
    }

    //tags filter logic
    if (
      tagsClicked.length > 0 &&
      !(tagsClicked.length === 1 && tagsClicked[0] === 'All')
    ) {
      notes = notes.filter((note) =>
        tagsClicked.every((selectedTag) =>
          note.tags.some((noteTag) => noteTag.name === selectedTag)
        )
      );
    }

    return notes;
  }, [allNotes, sideBarMenu, tagsClicked, searchBarQuery]); // Dependencies for memoization

  useEffect(() => {
    setFilteredNotes(filterNotes());
  }, [filterNotes]);

  // closing content note when sidebar state changes
  const closeContentNote = useCallback(() => {
    setOpenContentNote(false);
  }, [setOpenContentNote]);

  useEffect(() => {
    closeContentNote();
  }, [closeContentNote, sideBarMenu]);

  if (isLoading) {
    return (
      <div className="mt-5 flex flex-wrap gap-6">
        <ShimmerNoteEffect />
        <ShimmerNoteEffect />
        <ShimmerNoteEffect />
      </div>
    );
  }

  function ShimmerNoteEffect() {
    return (
      <div className="h-[400px] w-[375px] bg-white/50 rounded-lg flex flex-col">
        {/* header */}
        <div className="flex h-24 justify-between px-5 pt-5">
          <div className="w-1/2 h-7 bg-slate-200 rounded-sm"></div>
          <div className="w-7 h-4 bg-slate-200 rounded-sm"></div>
        </div>
        {/* code */}
        <div className="h-[200px] mt-12 w-full bg-slate-200"></div>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-wrap max-md:justify-center gap-4">
      {sideBarMenu[0].isSelected && (
        <>
          {filteredNotes.length === 0 ? (
            tagsClicked.filter((tag) => tag !== 'All').length > 0 ? (
              <EmpthyPlaceHolder
                muiIcon={<Tag size={100} className="text-slate-400" />}
                text={
                  <span className="text-slate-400 text-lg text-center">
                    It looks like there are no <br /> snippets with these tags.
                  </span>
                }
              />
            ) : (
              <EmpthyPlaceHolder
                muiIcon={
                  <TextSnippetOutlined
                    sx={{ fontSize: 150 }}
                    className="text-slate-400"
                  />
                }
                text={
                  <span className="text-slate-400 text-lg text-center">
                    It looks like there&apos;s no snippets right now
                  </span>
                }
                isNew={true}
              />
            )
          ) : (
            filteredNotes.map((note, index) => (
              <div key={index}>
                <SingleNote note={note} id={note._id} />
              </div>
            ))
          )}
        </>
      )}

      {sideBarMenu[1].isSelected && (
        <>
          {filteredNotes.length !== 0 ? (
            <>
              {filteredNotes.map((note, index) => (
                <div key={index}>
                  <SingleNote note={note} id={note._id} />
                </div>
              ))}
            </>
          ) : (
            <EmpthyPlaceHolder
              muiIcon={<Heart size={130} className="text-slate-400" />}
              text={
                <span className="text-slate-400 text-lg text-center">
                  Currenly, there are no snippets
                  <br /> marked as favorites.
                </span>
              }
            />
          )}
        </>
      )}

      {sideBarMenu[2].isSelected && (
        <>
          {filteredNotes.length !== 0 ? (
            <>
              {filteredNotes.map((note, index) => (
                <div key={index}>
                  <SingleNote note={note} id={note._id} />
                </div>
              ))}
            </>
          ) : (
            <EmpthyPlaceHolder
              muiIcon={
                <DeleteOutline
                  sx={{ fontSize: 140 }}
                  className="text-slate-400"
                />
              }
              text={
                <span className="text-slate-400 text-lg text-center">
                  Currenly, there are no trashed snippets.
                </span>
              }
            />
          )}
        </>
      )}
    </div>
  );
}

export default AllNotesSection;

function SingleNote({ note, id }: { note: SingleNoteType; id: string }) {
  const {
    darkModeObject: { darkMode },
    openContentNoteObject: { openContentNote },
    selectedNoteObject: { setSelectedNote },
  } = useGlobalContext();

  const {
    title,
    creationDate,
    description,
    tags,
    code,
    language,
    isFavorite,
    isTrash,
  } = note;

  return (
    <div
      className={`${
        darkMode[1].isSelected ? 'bg-neutral-950 text-white' : 'bg-gray-50'
      } ${
        openContentNote ? 'w-[375px] sm:w-[585px]' : 'w-[375px]'
      } rounded-lg  h-[400px]`}
      onClick={() => setSelectedNote(note)}
    >
      <div className="h-24 p-4 mb-4">
        <NoteHeader
          title={title}
          isFavorite={isFavorite}
          id={id}
          isTrashed={isTrash}
        />
        <NoteDate creationDate={creationDate} />
        <NoteTags tags={tags} />
      </div>
      <div className="h-10 px-4">
        <NoteDescription description={description} />
      </div>

      <div className="h-[200px] ">
        <NoteCodeBlock language={language} code={code} />
      </div>

      <div className="h-12 flex items-center p-4">
        <NoteFooter language={language} note={note} />
      </div>
    </div>
  );
}

function NoteHeader({
  title,
  isFavorite,
  id,
  isTrashed,
}: {
  title: string;
  isFavorite: boolean;
  id: string;
  isTrashed: boolean;
}) {
  const {
    darkModeObject: { darkMode },
    openContentNoteObject: { setOpenContentNote },
    allNotesObject: { allNotes, setAllNotes },
    selectedNoteObject: { setSelectedNote },
    isNewNoteObject: { setIsNewNote },
    isMobileObject: { isMobile },
    openTagsWindowObject: { setOpenTagsWindow },
  } = useGlobalContext();

  function clickedNoteTitle() {
    const findTheNote = allNotes.find((note) => note._id === id);
    if (findTheNote) {
      setSelectedNote(findTheNote);
    }
    if (!isTrashed) {
      setOpenContentNote(true);
      setOpenTagsWindow(false);
    }

    setIsNewNote(false);
    if (!isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  async function handleClickedCheckbox() {
    const currentFavorite = isFavorite;
    const newFavorite = !currentFavorite;

    try {
      const response = await fetch(`/api/snippets?snippetId=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isFavorite: newFavorite }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedNote = await response.json();

      setAllNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id
            ? { ...note, ...updatedNote, isFavorite: newFavorite }
            : note
        )
      );
    } catch (error) {
      console.log('Error updating favorite status:', error);
    }
  }

  return (
    <div className="flex justify-between">
      <span
        className={`text-slate-600 font-bold text-lg  ${
          !isTrashed && 'hover:text-violet-600 cursor-pointer'
        } truncate ${darkMode[1].isSelected ? 'text-violet-200' : ''}`}
        onClick={() => clickedNoteTitle()}
      >
        {truncateString(title, 40)}
      </span>
      {!isTrashed && (
        <Checkbox
          icon={
            <Favorite className="text-slate-400 cursor-pointer flex-shrink-0" />
          }
          checkedIcon={
            <Favorite className="text-violet-600 cursor-pointer flex-shrink-0" />
          }
          checked={isFavorite}
          onClick={handleClickedCheckbox}
        />
      )}
    </div>
  );
}

function NoteTags({ tags }: { tags: SingleTagType[] }) {
  return (
    <div className="text-slate-500 text-[11px] flex-wrap flex gap-1 mt-2">
      {tags.map((tag, index) => (
        <span
          key={tag._id || index || tag.name}
          className="bg-violet-100 text-violet-600 p-1 rounded-md px-2"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}

function NoteDate({ creationDate }: { creationDate: string }) {
  function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  return (
    <div className="text-slate-500 text-[11px] flex font-light ">
      <span>{formatDate(creationDate)}</span>
    </div>
  );
}

function NoteDescription({ description }: { description: string }) {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <div
      className={`${
        darkMode[1].isSelected ? 'text-white/70' : ''
      } text-slate-600 text-[13px]  mt-2 line-clamp-2`}
    >
      <span className="pre-wrap">{truncateString(description, 100)}</span>
    </div>
  );
}

interface NoteCodeBlockProps {
  language: string;
  code: string;
}

const DynamicCodeBlock = dynamic(
  () => import('react-code-blocks').then((mod) => mod.CodeBlock),
  { ssr: false }
);

const NoteCodeBlock: React.FC<NoteCodeBlockProps> = ({ language, code }) => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <div
      className={`h-full rounded-md ${
        darkMode[1].isSelected ? 'bg-neutral-900' : 'bg-white/50'
      }`}
    >
      <div className="h-full overflow-y-auto ">
        <DynamicCodeBlock
          text={code || '// Add your code here...'}
          language={language}
          showLineNumbers={false}
          theme={darkMode[1].isSelected ? dracula : atomOneLight}
          customStyle={{
            height: '100%',
            overflowY: 'auto',
            fontSize: '14px',
          }}
        />
      </div>
    </div>
  );
};

function NoteFooter({
  language,
  note,
}: {
  language: string;
  note: SingleNoteType;
}) {
  const {
    allNotesObject: { setAllNotes },
    openConfirmationWindowObject: { setOpenConfirmationWindow },
    selectedNoteObject: { setSelectedNote },
  } = useGlobalContext();

  async function trashNoteFunction() {
    if (note.isTrash) {
      setOpenConfirmationWindow(true);
      setSelectedNote(note);
      return;
    }

    try {
      const response = await fetch(`/api/snippets?snippetId=${note._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isTrash: true }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedNote = await response.json();

      setAllNotes((prevNotes) =>
        prevNotes.map((n) =>
          n._id === note._id ? { ...n, ...updatedNote, isTrash: true } : n
        )
      );

      toast((t: Toast) => (
        <div className="flex gap-2 items-center">
          <span className="text-[14px] font-medium">
            Note has been moved to trash
          </span>
          <button
            className="bg-violet-600 p-[4px] px-3 text-sm text-white rounded-md flex gap-1 items-center"
            onClick={() => {
              toast.dismiss(t.id);
              resetNoteFunction();
            }}
          >
            <Replay sx={{ fontSize: 19 }} />
            <span>Undo</span>
          </button>
        </div>
      ));
    } catch (error) {
      console.log('Error moving note to trash:', error);
    }
  }

  async function resetNoteFunction() {
    try {
      const response = await fetch(`/api/snippets?snippetId=${note._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isTrash: false }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedNote = await response.json();

      setAllNotes((prevNotes) =>
        prevNotes.map((n) =>
          n._id === note._id ? { ...n, ...updatedNote, isTrash: false } : n
        )
      );

      // setShowPlaceHolder(false);

      toast.success('Note has been restored');
    } catch (error) {
      console.log('Error restoring the note:', error);
    }
  }

  return (
    <div className="flex justify-between w-full text-[13px] text-slate-400">
      <div className="flex gap-1 items-center">
        {getLanguageIcon(language)}
        <span className="truncate">{capitalizeFirstOccurrence(language)}</span>
      </div>
      <div className="flex gap-2 items-center">
        {note.isTrash && (
          <RestoreFromTrashOutlined
            onClick={resetNoteFunction}
            sx={{ fontSize: 19 }}
            className="cursor-pointer flex-shrink-0"
          />
        )}
        <DeleteRounded
          sx={{ fontSize: 18 }}
          onClick={trashNoteFunction}
          className={`${
            note.isTrash && 'text-violet-600'
          } cursor-pointer hover:text-violet-600 flex-shrink-0`}
        />
      </div>
    </div>
  );
}

function truncateString(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
}
