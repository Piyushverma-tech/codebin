import {
  SingleCodeLanguageType,
  SingleNoteType,
  SingleTagType,
} from '@/app/Types';
import { useGlobalContext } from '@/ContextApi';
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
  CodeOutlined,
  ContentCopyOutlined,
  DescriptionOutlined,
  DoneAllOutlined,
} from '@mui/icons-material';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { IconButton } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import AceEditor from 'react-ace';

// Import a mode and a theme
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow';
import { SearchIcon, TagsIcon } from 'lucide-react';
import programmingLanguages from '@/app/localData/Languages';
import { debounce } from 'lodash';

export async function saveNoteInDB(
  note: SingleNoteType,
  isNew: boolean,
  setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>,
  setSingleNote: React.Dispatch<
    React.SetStateAction<SingleNoteType | undefined>
  >,
  setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>
) {
  // If note._id is falsy, then its new, otherwise its an update.
  const reallyNew = !note._id || isNew;

  const url = reallyNew
    ? '/api/snippets'
    : `/api/snippets?snippetId=${note._id}`;
  const method = reallyNew ? 'POST' : 'PUT';

  // Remove _id from the payload when creating a new note
  const { _id, ...noteData } = note;
  if (_id) {
  }

  const bodyData = {
    ...noteData,
    description: noteData.description || '',
    code: noteData.code || '',
    language: noteData.language || 'Javascript',
  };

  const body = JSON.stringify(bodyData);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`Failed to save note: ${response.statusText}`);
    }

    const data = await response.json();

    const savedNote: SingleNoteType = reallyNew
      ? { ...note, _id: data.notes._id }
      : data;

    setAllNotes((prevNotes) => {
      const updatedNotes = reallyNew
        ? [...prevNotes, savedNote]
        : prevNotes.map((n) => (n._id === savedNote._id ? savedNote : n));
      // Sort notes by creationDate descending
      return updatedNotes.sort(
        (a, b) =>
          new Date(b.creationDate).getTime() -
          new Date(a.creationDate).getTime()
      );
    });

    setSingleNote(savedNote);
    if (reallyNew) {
      setIsNewNote(false);
    }
  } catch (error) {
    console.error('Error saving note:', error);
  }
}

function ContentNote() {
  const {
    openContentNoteObject: { openContentNote },
    isMobileObject: { isMobile },
    selectedNoteObject: { selectedNote },
    isNewNoteObject: { isNewNote, setIsNewNote },
    allNotesObject: { setAllNotes },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const [singleNote, setSingleNote] = useState<SingleNoteType | undefined>(
    undefined
  );

  useEffect(() => {
    if (openContentNote && selectedNote) {
      setSingleNote(selectedNote);
    }
  }, [openContentNote, selectedNote]);

  //check this
  useEffect(() => {
    if (isNewNote && singleNote && singleNote.title.trim() !== '') {
      debouncedSavedNote(singleNote, isNewNote);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleNote]);

  const debouncedSavedNote = useMemo(
    () =>
      debounce((note: SingleNoteType, isNew: boolean) => {
        saveNoteInDB(note, isNew, setAllNotes, setSingleNote, setIsNewNote);
      }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div
      className={` ${
        isMobile
          ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full   z-50'
          : 'w-1/2'
      } ${
        darkMode[1].isSelected
          ? 'bg-neutral-950 text-white'
          : 'bg-gray-50 text-slate-900'
      } p-3 rounded-lg  ${openContentNote ? 'block' : 'hidden'} h-[740px]`}
    >
      {singleNote && (
        <div>
          <ContentNoteHeader
            singleNote={singleNote}
            setSingleNote={setSingleNote}
          />
          <NoteTags singleNote={singleNote} setSingleNote={setSingleNote} />
          <Description singleNote={singleNote} setSingleNote={setSingleNote} />
          <CodeBlock singleNote={singleNote} setSingleNote={setSingleNote} />
        </div>
      )}
    </div>
  );
}

export default ContentNote;

function ContentNoteHeader({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<
    React.SetStateAction<SingleNoteType | undefined>
  >;
}) {
  const {
    openContentNoteObject: { openContentNote, setOpenContentNote },
    allNotesObject: { setAllNotes },
    isNewNoteObject: { setIsNewNote },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const textRef = useRef<HTMLTextAreaElement>(null);
  const [onFocus, setOnFocus] = useState(false);
  if (onFocus) {
  }

  function onUpdateTitle(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newSingleNote = { ...singleNote, title: event.target.value };
    setSingleNote(newSingleNote);
    setAllNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === singleNote._id ? newSingleNote : note
      )
    );

    if (!singleNote.title.trim()) {
      console.log('Title is empty, not creating a note');
      return;
    }

    // ✅ Call saveNoteInDB immediately after updating state
    saveNoteInDB(
      newSingleNote,
      false,
      setAllNotes,
      setSingleNote,
      setIsNewNote
    );
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  useEffect(() => {
    if (openContentNote) {
      textRef.current?.focus();
      setOnFocus(true);
    }
  }, [openContentNote]);

  useEffect(() => {
    if (singleNote.title !== '') {
      setOnFocus(true);
    }
  }, [singleNote.title]);

  return (
    <div className="flex justify-between p-2 gap-8  mt-4">
      <div className="flex gap-4 w-full mt-2 items-center">
        <textarea
          ref={textRef}
          value={singleNote.title || ''}
          onKeyDown={handleKeyDown}
          placeholder="Add Title..."
          onChange={onUpdateTitle}
          onBlur={() => setOnFocus(false)}
          onFocus={() => setOnFocus(true)}
          onMouseEnter={() => setOnFocus(true)}
          onMouseLeave={() => setOnFocus(false)}
          className={`${
            darkMode[1].isSelected
              ? ' bg-neutral-950 text-violet-200'
              : ' bg-gray-50 text-slate-500 '
          } font-bold text-[24px] sm:text-center sm:ml-4 outline-none  h-18 overflow-y-auto resize-none  overflow-hidden w-full`}
        />
      </div>
      <CloseOutlined
        onClick={() => {
          setIsNewNote(false);
          setOpenContentNote(false);
        }}
        className="text-slate-400 mt-[7px] cursor-pointer"
        sx={{ cursor: 'pointer', fontSize: '25' }}
      />
    </div>
  );
}

function NoteTags({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<
    React.SetStateAction<SingleNoteType | undefined>
  >;
}) {
  const [hovered, setHovered] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const {
    allNotesObject: { setAllNotes },

    isMobileObject: { isMobile },
    isNewNoteObject: { setIsNewNote },
  } = useGlobalContext();

  useEffect(() => {
    if (isOpened) {
      setHovered(true);
    }
  }, [isOpened]);

  function onClickedTag(tag: SingleTagType) {
    // Toggle the presence of this tag in singleNote.tags:
    const newTags = singleNote.tags.some(
      (t) => t.name.toLowerCase() === tag.name.toLowerCase()
    )
      ? singleNote.tags.filter(
          (t) => t.name.toLowerCase() !== tag.name.toLowerCase()
        )
      : [...singleNote.tags, tag];

    const newSingleNote = { ...singleNote, tags: newTags };

    // Updating the local state of the note
    setSingleNote(newSingleNote);

    // Updating the global state of notes
    setAllNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === singleNote._id ? newSingleNote : note
      )
    );

    // Save the note update
    saveNoteInDB(
      newSingleNote,
      false,
      setAllNotes,
      setSingleNote,
      setIsNewNote
    );
  }

  return (
    <div className="flex text-[13px] items-center p-2 gap-2  ">
      {!isMobile && (
        <TagsIcon
          size={26}
          className={`${hovered ? 'text-violet-600' : 'text-slate-400'}`}
        />
      )}
      <div
        className="flex w-full relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          if (!isOpened) setHovered(false);
        }}
      >
        <div className="flex gap-2 items-center flex-wrap ml-2">
          {singleNote.tags.length > 0 ? (
            singleNote.tags.map((tag, index) => (
              <div
                key={tag._id || tag.name || index}
                className=" border-2 bg-violet-100 text-violet-600 shadow-sm  p-1 px-2 rounded-md "
              >
                {tag.name}
              </div>
            ))
          ) : (
            <div className="text-slate-400 italic">No tags</div>
          )}
          {isMobile ? (
            <EditOutlined
              onClick={() => setIsOpened(!isOpened)}
              sx={{ fontSize: 19 }}
              className="text-slate-400 cursor-pointer"
            />
          ) : (
            hovered && (
              <EditOutlined
                onClick={() => setIsOpened(!isOpened)}
                sx={{ fontSize: 19 }}
                className="text-slate-400 cursor-pointer"
              />
            )
          )}
        </div>
        {isOpened && <TagsMenu onClickedTag={onClickedTag} />}
      </div>
    </div>
  );

  function TagsMenu({
    onClickedTag,
  }: {
    onClickedTag: (tag: SingleTagType) => void;
  }) {
    const {
      allTagsObject: { allTags },
      darkModeObject: { darkMode },
    } = useGlobalContext();

    const menuRef = useRef<HTMLUListElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpened(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const filterAllItemFromAllTags = allTags.filter(
      (tag) => tag.name !== 'All'
    );

    return (
      <ul
        ref={menuRef}
        className={`${
          darkMode[1].isSelected ? 'bg-neutral-900' : 'bg-violet-100'
        } absolute top-10  shadow-lg w-[200px] p-3 rounded-md flex flex-col gap-2 z-50 h-48 overflow-y-auto`}
      >
        {filterAllItemFromAllTags.length === 0 && (
          <span className="text-slate-400 text-center">
            Currently you dont have any tags, Add tags to use them.
          </span>
        )}
        {filterAllItemFromAllTags.map((tag, index) => (
          <li
            key={tag._id || index || tag.name}
            onClick={() => onClickedTag(tag)}
            className={`${
              singleNote.tags.some(
                (t) => t.name.toLowerCase() === tag.name.toLowerCase()
              )
                ? `${
                    darkMode[1].isSelected
                      ? 'bg-neutral-800'
                      : 'bg-violet-200/70'
                  }`
                : ''
            } p-1 px-2 select-none cursor-pointer  ${
              darkMode[1].isSelected
                ? 'text-slate-100 hover:bg-neutral-700'
                : 'text-slate-900 hover:bg-violet-200'
            } rounded-md text-[12px] transition-all`}
          >
            {tag.name}
          </li>
        ))}
      </ul>
    );
  }
}

function Description({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<
    React.SetStateAction<SingleNoteType | undefined>
  >;
}) {
  const {
    allNotesObject: { setAllNotes },
    darkModeObject: { darkMode },
    isMobileObject: { isMobile },
    isNewNoteObject: { setIsNewNote },
  } = useGlobalContext();

  const [isHoverd, setIsHoverd] = useState(false);

  function onUpdateDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newSingleNote = { ...singleNote, description: event.target.value };
    setSingleNote(newSingleNote);
    setAllNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === singleNote._id ? newSingleNote : note
      )
    );

    saveNoteInDB(
      newSingleNote,
      false,
      setAllNotes,
      setSingleNote,
      setIsNewNote
    );
  }

  return (
    <div className="flex gap-2 text-[13px] mt-4 p-2">
      {!isMobile && (
        <DescriptionOutlined
          sx={{ fontSize: 24 }}
          className={`mt-[9px] ${
            isHoverd ? 'text-violet-600' : 'text-slate-400'
          }`}
        />
      )}

      <textarea
        name=""
        id=""
        onMouseEnter={() => setIsHoverd(true)}
        onMouseLeave={() => setIsHoverd(false)}
        onChange={onUpdateDescription}
        value={singleNote.description || ''}
        placeholder="Add a description..."
        className={`${
          darkMode[1].isSelected
            ? 'bg-neutral-950 text-slate-200'
            : 'bg-gray-50 text-slate-800'
        } text-sm  outline-none border w-full   ${
          isHoverd ? 'border-violet-600' : 'border-slate-400'
        } rounded-lg p-2 h-20 resize-none`}
      />
    </div>
  );
}

function CodeBlock({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<
    React.SetStateAction<SingleNoteType | undefined>
  >;
}) {
  const [isHoverd, setIsHoverd] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const {
    selectedLanguageObject: { selectedLanguage, setSelectedLanguage },
    selectedNoteObject: { selectedNote },
    allNotesObject: { setAllNotes },
    isNewNoteObject: { setIsNewNote },
    darkModeObject: { darkMode },
    isMobileObject: { isMobile },
  } = useGlobalContext();

  useEffect(() => {
    if (selectedNote) {
      if (selectedNote.language === '') {
        setSelectedLanguage(programmingLanguages[0]);
        return;
      }
      const findLanguage = programmingLanguages.find(
        (language) =>
          language.name.toLocaleLowerCase() ===
          selectedNote.language.toLocaleLowerCase()
      );

      if (findLanguage) {
        setSelectedLanguage(findLanguage);
      }
    }
  }, [selectedNote, setSelectedLanguage]);

  function handleChange(code: string) {
    const newSingleNote = { ...singleNote, code };
    setSingleNote(newSingleNote);
    setAllNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === singleNote._id ? newSingleNote : note
      )
    );

    saveNoteInDB(
      newSingleNote,
      false,
      setAllNotes,
      setSingleNote,
      setIsNewNote
    );
  }

  function clickedCopyBtn() {
    navigator.clipboard.writeText(singleNote.code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1200);
  }

  return (
    <div className="flex gap-2 text-[12px] p-2 text-slate-400 mt-4">
      {!isMobile && (
        <CodeOutlined
          sx={{ fontSize: 22 }}
          className={`mt-[9px] ${
            isHoverd ? 'text-violet-600' : 'text-slate-400'
          }`}
        />
      )}
      <div
        onMouseEnter={() => setIsHoverd(true)}
        onMouseLeave={() => setIsHoverd(false)}
        className={`${
          isHoverd ? 'border-violet-600' : 'border-slate-400'
        } border rounded-lg p-3 pt-16 w-full relative 
        }`}
      >
        <div className={`absolute top-4 right-4 z-50`}>
          <IconButton disabled={isCopied}>
            {isCopied ? (
              <DoneAllOutlined
                sx={{ fontSize: 20 }}
                className={`text-slate-400`}
              />
            ) : (
              <ContentCopyOutlined
                onClick={() => clickedCopyBtn()}
                sx={{ fontSize: 20 }}
                className={`text-slate-400`}
              />
            )}
          </IconButton>
        </div>

        {/* Language drop down */}
        <div
          onClick={() => setIsOpened(!isOpened)}
          className={`flex gap-2 justify-between border border-slate-400 py-2  px-3 rounded-md items-center text-[12px] mt-3 absolute top-1 left-3 cursor-pointer`}
        >
          <div
            className={`${
              darkMode[1].isSelected ? 'text-slate-300' : 'text-slate-500'
            } flex gap-1 items-center`}
          >
            {selectedLanguage?.icon}
            <span className="mt-[1px]">{selectedLanguage?.name}</span>
          </div>
          {isOpened ? (
            <ArrowDropUpOutlined
              sx={{ fontSize: 18 }}
              className="text-slate-400"
            />
          ) : (
            <ArrowDropDownOutlined
              sx={{ fontSize: 18 }}
              className="text-slate-400"
            />
          )}
        </div>
        {isOpened && <LanguageMenu />}
        <AceEditor
          placeholder="// Add your code here..."
          mode="javascript"
          theme="tomorrow"
          className={`${
            darkMode[1].isSelected ? 'bg-neutral-950' : 'bg-gray-50'
          } p-4 mt-2`}
          name="blah2"
          width="100%"
          height="300px"
          fontSize={14}
          lineHeight={19}
          showPrintMargin={false}
          showGutter={false}
          highlightActiveLine={false}
          value={singleNote.code}
          onChange={handleChange}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            enableMobileMenu: false,
            showLineNumbers: false,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );

  function LanguageMenu() {
    const textRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
      textRef.current?.focus();
    }, []);

    //filtering
    const [filteredLanguages, setFilteredLanguages] =
      useState(programmingLanguages);
    const menuRef = useRef<HTMLDivElement>(null);
    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value.toLowerCase());
    };

    useEffect(() => {
      const filtered = programmingLanguages.filter((language) => {
        return language.name.toLowerCase().includes(searchQuery);
      });
      setFilteredLanguages(filtered);
    }, [searchQuery]);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpened(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    function clickedLanguage(language: SingleCodeLanguageType) {
      if (singleNote.language === '') {
        setSelectedLanguage(programmingLanguages[0]);
        return;
      }
      setSelectedLanguage(language);
      setIsOpened(false);

      if (singleNote) {
        const newLanguage = language.name;
        const newSingleNote: SingleNoteType = {
          ...singleNote,
          language: newLanguage || 'Javascript',
        };

        setSingleNote(newSingleNote);

        setAllNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === singleNote._id ? newSingleNote : note
          )
        );

        saveNoteInDB(
          newSingleNote,
          false,
          setAllNotes,
          setSingleNote,
          setIsNewNote
        );
      }
    }

    return (
      <div
        ref={menuRef}
        className={`${
          darkMode[1].isSelected
            ? 'bg-neutral-900'
            : 'bg-violet-100  text-slate-400'
        } absolute flex-col gap-2 p-3 w-[200px] rounded-md left-3 border   shadow-lg z-50 flex `}
      >
        <div className={`p-1 rounded-md flex gap-1 mb-1`}>
          <SearchIcon />
          <input
            ref={textRef}
            placeholder="Search..."
            className={`bg-transparent outline-none`}
            onChange={onChangeSearch}
            value={searchQuery}
          />
        </div>

        <div
          className={` ${
            darkMode[1].isSelected ? 'bg-neutral-900' : 'bg-violet-100'
          }  h-40  overflow-x-auto`}
        >
          {filteredLanguages.map((language) => (
            <div
              onClick={() => clickedLanguage(language)}
              key={language.id}
              className={`${
                darkMode[1].isSelected
                  ? 'hover:bg-neutral-700 text-slate-300'
                  : 'hover:bg-slate-300 text-slate-500'
              }  flex mb-2 gap-2  bg-transparent p-[6px] px-3 rounded-md items-center cursor-pointer ${
                selectedLanguage?.name.toLocaleLowerCase() ===
                language.name.toLocaleLowerCase()
                  ? `${
                      darkMode[1].isSelected
                        ? 'bg-neutral-700'
                        : 'bg-violet-200'
                    }`
                  : ''
              }`}
            >
              {language.icon}
              <span className="mt-[1px]">{language.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
