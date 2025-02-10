'use client';
import React, { useState, createContext, useEffect, useCallback } from 'react';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import {
  CodeLanguageCounterType,
  DarkModeType,
  SideBarMenu,
  SingleCodeLanguageType,
  SingleNoteType,
  SingleTagType,
} from './app/Types';
import { v4 as uuidv4 } from 'uuid';
import { Tags } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

interface GlobalContextType {
  sideBarMenuObject: {
    sideBarMenu: SideBarMenu[];
    setSideBarMenu: React.Dispatch<React.SetStateAction<SideBarMenu[]>>;
  };
  darkModeObject: {
    darkMode: DarkModeType[];
    setDarkMode: React.Dispatch<React.SetStateAction<DarkModeType[]>>;
  };
  openSideBarObject: {
    openSideBar: boolean;
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  };
  openContentNoteObject: {
    openContentNote: boolean;
    setOpenContentNote: React.Dispatch<React.SetStateAction<boolean>>;
  };
  isMobileObject: {
    isMobile: boolean;
    setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  };
  allNotesObject: {
    allNotes: SingleNoteType[];
    setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>;
  };
  allTagsObject: {
    allTags: SingleTagType[];
    setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>;
  };
  selectedNoteObject: {
    selectedNote: SingleNoteType | null;
    setSelectedNote: React.Dispatch<
      React.SetStateAction<SingleNoteType | null>
    >;
  };
  selectedTagsObject: {
    selectedTags: SingleTagType[];
    setSelectedTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>;
  };
  isNewNoteObject: {
    isNewNote: boolean;
    setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>;
  };
  selectedLanguageObject: {
    selectedLanguage: SingleCodeLanguageType | null;
    setSelectedLanguage: React.Dispatch<
      React.SetStateAction<SingleCodeLanguageType | null>
    >;
  };
  openConfirmationWindowObject: {
    openConfirmationWindow: boolean;
    setOpenConfirmationWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };
  codeLanguagesCounterObject: {
    codeLanguagesCounter: CodeLanguageCounterType[];
    setCodeLanguagesCounter: React.Dispatch<
      React.SetStateAction<CodeLanguageCounterType[]>
    >;
  };
  openTagsWindowObject: {
    openTagsWindow: boolean;
    setOpenTagsWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };
  tagsMenuObject: {
    tagsMenu: SideBarMenu[];
    setTagsMenu: React.Dispatch<React.SetStateAction<SideBarMenu[]>>;
  };
  openNewTagWindowObject: {
    openNewTagWindow: boolean;
    setOpenNewTagWindow: React.Dispatch<React.SetStateAction<boolean>>;
  };
  selectedTagEditObject: {
    selectedTagEdit: SingleTagType | null;
    setSelectedTagEdit: React.Dispatch<
      React.SetStateAction<SingleTagType | null>
    >;
  };
  tagsClickedObject: {
    tagsClicked: string[];
    setTagsClicked: React.Dispatch<React.SetStateAction<string[]>>;
  };
  searchQueryObject: {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  };
  searchBarQueryObject: {
    searchBarQuery: string;
    setSearchBarQuery: React.Dispatch<React.SetStateAction<string>>;
  };
  isLoadingObject: {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
  sharedUserIdObject: {
    sharedUserId: string;
    setSharedUserId: React.Dispatch<React.SetStateAction<string>>;
  };
}

const ContextProvider = createContext<GlobalContextType>({
  sideBarMenuObject: {
    sideBarMenu: [],
    setSideBarMenu: () => {},
  },
  darkModeObject: {
    darkMode: [],
    setDarkMode: () => {},
  },
  openSideBarObject: {
    openSideBar: false,
    setOpenSideBar: () => {},
  },
  openContentNoteObject: {
    openContentNote: false,
    setOpenContentNote: () => {},
  },
  isMobileObject: {
    isMobile: false,
    setIsMobile: () => {},
  },
  allNotesObject: {
    allNotes: [],
    setAllNotes: () => {},
  },
  allTagsObject: {
    allTags: [],
    setAllTags: () => {},
  },
  selectedNoteObject: {
    selectedNote: null,
    setSelectedNote: () => {},
  },
  selectedTagsObject: {
    selectedTags: [],
    setSelectedTags: () => {},
  },
  isNewNoteObject: {
    isNewNote: false,
    setIsNewNote: () => {},
  },
  selectedLanguageObject: {
    selectedLanguage: null,
    setSelectedLanguage: () => {},
  },
  openConfirmationWindowObject: {
    openConfirmationWindow: false,
    setOpenConfirmationWindow: () => {},
  },
  codeLanguagesCounterObject: {
    codeLanguagesCounter: [],
    setCodeLanguagesCounter: () => {},
  },
  openTagsWindowObject: {
    openTagsWindow: false,
    setOpenTagsWindow: () => {},
  },
  tagsMenuObject: {
    tagsMenu: [],
    setTagsMenu: () => {},
  },
  openNewTagWindowObject: {
    openNewTagWindow: false,
    setOpenNewTagWindow: () => {},
  },
  selectedTagEditObject: {
    selectedTagEdit: null,
    setSelectedTagEdit: () => {},
  },
  tagsClickedObject: {
    tagsClicked: [],
    setTagsClicked: () => {},
  },
  searchQueryObject: {
    searchQuery: '',
    setSearchQuery: () => {},
  },
  searchBarQueryObject: {
    searchBarQuery: '',
    setSearchBarQuery: () => {},
  },
  isLoadingObject: {
    isLoading: true,
    setIsLoading: () => {},
  },
  sharedUserIdObject: {
    sharedUserId: '',
    setSharedUserId: () => {},
  },
});

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sideBarMenu, setSideBarMenu] = useState<SideBarMenu[]>([
    {
      id: 1,
      name: 'All Snippets',
      isSelected: true,
      icons: <BorderAllIcon sx={{ fontSize: 18 }} />,
    },
    {
      id: 2,
      name: 'Favorites',
      isSelected: false,
      icons: <FavoriteBorderIcon sx={{ fontSize: 18 }} />,
    },
    {
      id: 3,
      name: 'Trash',
      isSelected: false,
      icons: <DeleteOutlineOutlined sx={{ fontSize: 18 }} />,
    },
  ]);

  const [darkMode, setDarkMode] = useState<DarkModeType[]>([
    {
      id: 1,
      icon: <LightMode sx={{ fontSize: 25 }} />,
      isSelected: true,
    },
    {
      id: 2,
      icon: <DarkMode sx={{ fontSize: 25 }} />,
      isSelected: false,
    },
  ]);

  const [openSideBar, setOpenSideBar] = useState(false);
  const [openContentNote, setOpenContentNote] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [allNotes, setAllNotes] = useState<SingleNoteType[]>([]);
  const [allTags, setAllTags] = useState<SingleTagType[]>([]);
  const [selectedNote, setSelectedNote] = useState<SingleNoteType | null>(null);
  const [isNewNote, setIsNewNote] = useState(false);
  const [selectedTags, setSelectedTags] = useState<SingleTagType[]>([]);
  const [selectedLanguage, setSelectedLanguage] =
    useState<SingleCodeLanguageType | null>(null);
  const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
  const [codeLanguagesCounter, setCodeLanguagesCounter] = useState<
    CodeLanguageCounterType[]
  >([]);
  const [openTagsWindow, setOpenTagsWindow] = useState(false);
  const [openNewTagWindow, setOpenNewTagWindow] = useState(false);
  const [tagsMenu, setTagsMenu] = useState<SideBarMenu[]>([
    {
      id: 1,
      name: 'Tags',
      isSelected: false,
      icons: <Tags size={19} />,
    },
  ]);
  const [selectedTagEdit, setSelectedTagEdit] = useState<SingleTagType | null>(
    null
  );
  const [tagsClicked, setTagsClicked] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchBarQuery, setSearchBarQuery] = useState<string>('');
  const { isLoaded, isSignedIn, user } = useUser();
  const [sharedUserId, setSharedUserId] = useState<string>('');

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 740);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setSharedUserId(user?.id);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    async function fetchAllNotes() {
      try {
        const response = await fetch(`/api/snippets?clerkId=${user?.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch snippets');
        }
        const data: { notes: SingleNoteType[] } = await response.json();
        if (data.notes) {
          const sortedAllNotes: SingleNoteType[] = data.notes.sort((a, b) => {
            return (
              new Date(b.creationDate).getTime() -
              new Date(a.creationDate).getTime()
            );
          });

          setAllNotes(sortedAllNotes);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchAllTags() {
      try {
        const response = await fetch(`/api/tags?clerkId=${user?.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }
        const data: { tags: SingleTagType[] } = await response.json();
        if (data.tags) {
          const allTags: SingleTagType = {
            _id: uuidv4(),
            name: 'All',
            clerkUserId: user?.id || '',
          };

          setAllTags([allTags, ...data.tags]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoaded && isSignedIn) {
      fetchAllTags();
      fetchAllNotes();
    }
  }, [user, isLoaded, isSignedIn]);

  useEffect(() => {
    setSelectedTags(
      selectedNote?.tags.map((tag) => ({
        ...tag,
        clerkUserId: sharedUserId,
      })) || []
    );
  }, [selectedNote, sharedUserId]);

  useEffect(() => {
    if (openContentNote === false) {
      setAllNotes((prevNotes) =>
        prevNotes.filter(
          (note) =>
            note.title.trim() !== '' ||
            note.description.trim() !== '' ||
            note.code.trim() !== ''
        )
      );
    }
  }, [openContentNote]);

  useEffect(() => {
    const languageCounts: Record<string, number> = {};

    allNotes.forEach((note) => {
      if (!note.isTrash) {
        const language = note.language.toLowerCase();
        if (languageCounts[language]) {
          languageCounts[language]++;
        } else {
          languageCounts[language] = 1;
        }
      }
    });

    const ConvertedLanguageCounts: CodeLanguageCounterType[] = Object.entries(
      languageCounts
    )
      .map(([language, count]) => ({
        language,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    setCodeLanguagesCounter(ConvertedLanguageCounts);
  }, [allNotes]);

  const closeTagsWindow = useCallback(() => {
    setOpenTagsWindow(false);
  }, [setOpenTagsWindow]);

  useEffect(() => {
    closeTagsWindow();
  }, [closeTagsWindow, sideBarMenu]);

  return (
    <ContextProvider.Provider
      value={{
        sideBarMenuObject: { sideBarMenu, setSideBarMenu },
        darkModeObject: { darkMode, setDarkMode },
        openSideBarObject: { openSideBar, setOpenSideBar },
        openContentNoteObject: { openContentNote, setOpenContentNote },
        isMobileObject: { isMobile, setIsMobile },
        allNotesObject: { allNotes, setAllNotes },
        selectedNoteObject: { selectedNote, setSelectedNote },
        isNewNoteObject: { isNewNote, setIsNewNote },
        allTagsObject: { allTags, setAllTags },
        selectedTagsObject: { selectedTags, setSelectedTags },
        selectedLanguageObject: { selectedLanguage, setSelectedLanguage },
        openConfirmationWindowObject: {
          openConfirmationWindow,
          setOpenConfirmationWindow,
        },
        codeLanguagesCounterObject: {
          codeLanguagesCounter,
          setCodeLanguagesCounter,
        },
        openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
        tagsMenuObject: { tagsMenu, setTagsMenu },
        openNewTagWindowObject: { openNewTagWindow, setOpenNewTagWindow },
        selectedTagEditObject: { selectedTagEdit, setSelectedTagEdit },
        tagsClickedObject: { tagsClicked, setTagsClicked },
        searchQueryObject: { searchQuery, setSearchQuery },
        searchBarQueryObject: { searchBarQuery, setSearchBarQuery },
        isLoadingObject: { isLoading, setIsLoading },
        sharedUserIdObject: { sharedUserId, setSharedUserId },
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}

export const useGlobalContext = () => {
  const context = React.useContext(ContextProvider);
  if (!context) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider'
    );
  }
  return context;
};
