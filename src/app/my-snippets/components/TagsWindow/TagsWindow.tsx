'use client';
import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '@/ContextApi';
import {
  X,
  Tag,
  Search,
  Plus,
  GripVertical,
  Edit,
  Trash2,
  SearchIcon,
} from 'lucide-react';
import { SingleNoteType, SingleTagType } from '@/app/Types';
import toast from 'react-hot-toast';
import EmpthyPlaceHolder from '@/app/EmpthyPlaceHolder';

function TagsWindow() {
  const {
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
    allTagsObject: { allTags, setAllTags },
    allNotesObject: { allNotes },
    searchQueryObject: { searchQuery, setSearchQuery },
    isMobileObject: { isMobile },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  interface Tag {
    name: string;
  }

  interface TagCount {
    [key: string]: number;
  }

  // sorting tags based on usage
  const countTags = (
    notes: SingleNoteType[],
    allTags: Tag[]
  ): { name: string; count: number }[] => {
    const tagCount: TagCount = allTags.reduce((acc: TagCount, tag) => {
      acc[tag.name] = 0;
      return acc;
    }, {});

    notes.forEach((note) => {
      note.tags.forEach((tag: Tag) => {
        tagCount[tag.name]++;
      });
    });

    return allTags
      .map((tag) => {
        if (tag.name === 'All') {
          return { name: 'All', count: allNotes.length };
        }
        return { name: tag.name, count: tagCount[tag.name] };
      })
      .sort((a, b) => b.count - a.count);
  };

  const sortAllTags = (
    notes: SingleNoteType[],
    allTags: SingleTagType[]
  ): SingleTagType[] => {
    const tagCounts = countTags(notes, allTags);

    const countMap = new Map(tagCounts.map((item) => [item.name, item.count]));

    return [...allTags].sort((a, b) => {
      // keep "All" at the top
      if (a.name === 'All') return -1;
      if (b.name === 'All') return 1;

      // sort by count
      const countDiff =
        (countMap.get(b.name) || 0) - (countMap.get(a.name) || 0);
      return countDiff !== 0 ? countDiff : a.name.localeCompare(b.name);
    });
  };

  const filterAllItemFromAllTags = allTags.filter((tag) => tag.name !== 'All');
  const filterAllTagsBasedOnSearchQuery = filterAllItemFromAllTags.filter(
    (tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTags: SingleTagType[] = sortAllTags(allNotes, allTags);

  useEffect(() => {
    setSearchQuery('');
  }, [allTags, setSearchQuery]);

  useEffect(() => {
    setAllTags((prevTags) => {
      // Check if sortedTags is different from prevTags
      if (JSON.stringify(prevTags) !== JSON.stringify(sortedTags)) {
        return sortedTags;
      }
      return prevTags;
    });
  }, [allNotes, setAllTags, sortedTags]);

  if (!openTagsWindow) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-30"
        onClick={() => setOpenTagsWindow(false)}
      ></div>

      {/* Modal */}
      <div
        className={`${
          isMobile
            ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-50'
            : 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] z-50'
        } ${
          darkMode[1].isSelected ? 'bg-zinc-900' : 'bg-gray-50 '
        } rounded-xl p-6 h-[580px] z-40 flex flex-col shadow-xl border ${
          darkMode[1].isSelected ? 'border-zinc-700' : 'border-gray-200'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-violet-600" />
            <h2
              className={`text-lg font-semibold ${
                darkMode[1].isSelected ? 'text-slate-300' : 'text-gray-900'
              } text-gray-900`}
            >
              Manage Tags
            </h2>
          </div>
          <button
            onClick={() => setOpenTagsWindow(false)}
            className="p-2 rounded-full hover:bg-gray-400/20 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Search and Add */}
        <div className="flex-shrink-0">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* Tags List - Fixed scrollable container */}
        <div className="my-4 flex-1 min-h-0">
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
            <div className="pr-2">
              {filterAllItemFromAllTags.length === 0 && (
                <EmpthyPlaceHolder
                  muiIcon={<Tag size={68} className="text-slate-400" />}
                  text={
                    <span className="text-slate-400 font-light">
                      No tags has been created yet...
                    </span>
                  }
                />
              )}
              {/*  */}
              {filterAllTagsBasedOnSearchQuery.length === 0 &&
                filterAllItemFromAllTags.length !== 0 && (
                  <EmpthyPlaceHolder
                    muiIcon={
                      <SearchIcon size={55} className="text-slate-400" />
                    }
                    text={<span className="text-slate-400">No Tags Found</span>}
                  />
                )}
              {/*  */}
              <div className="space-y-2">
                {filterAllTagsBasedOnSearchQuery.map((tag) => (
                  <div key={tag._id}>
                    <SingleTag tag={tag} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SearchBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    openNewTagWindowObject: { setOpenNewTagWindow },
    openTagsWindowObject: { openTagsWindow },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [openTagsWindow]);

  return (
    <div className="flex gap-4 items-center">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          ref={inputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tags..."
          className={`w-full h-9 pl-10 pr-4 rounded-lg ${
            darkMode[1].isSelected
              ? ' text-slate-300 border border-gray-500'
              : ' border border-gray-200 text-slate-500'
          }  text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all`}
        />
      </div>
      <button
        onClick={() => setOpenNewTagWindow(true)}
        className=" p-2.5 bg-violet-500 hover:bg-violet-700 rounded-lg flex items-center text-white transition-colors"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function SingleTag({ tag }: { tag: SingleTagType }) {
  const {
    allTagsObject: { allTags, setAllTags },
    allNotesObject: { allNotes, setAllNotes },
    selectedTagEditObject: { setSelectedTagEdit },
    openNewTagWindowObject: { setOpenNewTagWindow },
    tagsClickedObject: { tagsClicked, setTagsClicked },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  function openTagWindow(tag: SingleTagType) {
    setOpenNewTagWindow(true);
    setSelectedTagEdit(tag);
  }

  function countTagInAllNotes(tag: SingleTagType) {
    let count = 0;
    allNotes.forEach((note) => {
      if (note.tags.some((t) => t.name === tag.name)) {
        count++;
      }
    });
    return count;
  }

  return (
    <div
      className={`group ${
        darkMode[1].isSelected
          ? 'bg-neutral-900 border-zinc-500'
          : 'bg-white border-gray-100'
      } rounded-lg p-2 shadow-sm hover:shadow transition-all border`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <GripVertical className="h-5 w-5 text-gray-400 transition-opacity flex-shrink-0" />
          <div className="h-2.5 w-2.5 rounded-full bg-violet-500 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h3
              className={`font-medium text-[14px] ${
                darkMode[1].isSelected ? 'text-slate-200' : 'text-gray-900'
              } truncate`}
            >
              {tag.name}
            </h3>
            <p className="text-xs text-gray-400 truncate">
              {countTagInAllNotes(tag)} Snippets
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            className="p-2 rounded-full hover:bg-gray-400/20 text-gray-500 transition-colors"
            onClick={() => openTagWindow(tag)}
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() =>
              deleteTag(
                tag,
                allTags,
                setAllTags,
                allNotes,
                setAllNotes,
                tagsClicked,
                setTagsClicked
              )
            }
            className="p-2 rounded-full hover:bg-gray-400/20 text-gray-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TagsWindow;

async function updateNote(note: SingleNoteType, tagToRemove: string) {
  const updatedTags = note.tags.filter(
    (t) => t.name.toLowerCase() !== tagToRemove.toLowerCase()
  );

  const updateNoteResponse = await fetch(
    `/api/snippets?snippetId=${note._id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...note,
        tags: updatedTags,
      }),
    }
  );

  if (!updateNoteResponse.ok) {
    throw new Error(`Failed to update note ${note._id}`);
  }

  const updatedNote = await updateNoteResponse.json();
  return updatedNote;
}

async function deleteTag(
  tag: SingleTagType,
  allTags: SingleTagType[],
  setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>,
  allNotes: SingleNoteType[],
  setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>,
  tagsClicked: string[],
  setTagsClicked: React.Dispatch<React.SetStateAction<string[]>>
) {
  try {
    const deleteTagResponse = await fetch(`/api/tags?tagId=${tag._id}`, {
      method: 'DELETE',
    });

    if (!deleteTagResponse.ok) {
      const errorData = await deleteTagResponse.json();
      throw new Error(errorData.message || 'Failed to delete tag');
    }

    const notesToUpdate = allNotes.filter((note) =>
      note.tags.some((t) => t.name.toLowerCase() === tag.name.toLowerCase())
    );

    const updatePromises = notesToUpdate.map((note) =>
      updateNote(note, tag.name)
    );

    const updatedNotes = await Promise.all(updatePromises);

    const updatedAllTags = allTags.filter(
      (t) => t.name.toLowerCase() !== tag.name.toLowerCase()
    );

    const updatedAllNotes = allNotes.map((note) => {
      const updatedNote = updatedNotes.find((un) => un._id === note._id);
      if (updatedNote) {
        return updatedNote;
      }

      return {
        ...note,
        tags: note.tags.filter(
          (t) => t.name.toLowerCase() !== tag.name.toLowerCase()
        ),
      };
    });

    setAllTags(updatedAllTags);
    setAllNotes(updatedAllNotes);
    setTagsClicked(
      tagsClicked.filter((t) => t.toLowerCase() !== tag.name.toLowerCase())
    );

    toast.success('Tag has been deleted');
  } catch (error) {
    console.error('Error deleting tag:', error);
    toast.error(
      error instanceof Error ? error.message : 'Failed to delete tag'
    );
  }
}
