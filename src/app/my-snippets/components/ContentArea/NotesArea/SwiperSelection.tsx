'use client';
import { useGlobalContext } from '@/ContextApi';
import { PlusIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function SwiperSelection() {
  const {
    darkModeObject: { darkMode },
    openNewTagWindowObject: { setOpenNewTagWindow },
    allTagsObject: { allTags },
    tagsClickedObject: { setTagsClicked },
    sideBarMenuObject: { sideBarMenu },
    isLoadingObject: { isLoading },
  } = useGlobalContext();

  const [tagsSelected, setTagsSelected] = useState<boolean[]>([]);

  const allTagsRef = useRef(allTags);

  useEffect(() => {
    // Update the ref value on each render
    allTagsRef.current = allTags;
  }, [allTags]);

  useEffect(() => {
    setTagsClicked((prevTagsClicked) => {
      const newTagsClicked = tagsSelected.reduce(
        (acc, isSelected, index) => {
          const tagName = allTagsRef.current[index]?.name; // Using ref to get the latest allTags value

          if (isSelected) {
            if (!acc.includes(tagName)) {
              acc.push(tagName);
            }
          } else {
            const tagIndex = acc.indexOf(tagName);
            if (tagIndex !== -1) {
              acc.splice(tagIndex, 1);
            }
          }
          return acc;
        },
        [...prevTagsClicked]
      );

      return newTagsClicked;
    });
  }, [setTagsClicked, tagsSelected]);

  //  console.log(tagsClicked);

  // reset the tagsSelected state when allTags changes
  useEffect(() => {
    if (allTags) {
      const newTagsSelected = Array(allTags.length).fill(false);
      newTagsSelected[0] = true;
      setTagsSelected(newTagsSelected);
    }
  }, [allTags]);

  // reset the tagsSelected and tagsClicked state when sideBarMenu changes
  useEffect(() => {
    if (sideBarMenu) {
      const newTagsSelected = Array(allTags.length).fill(false);
      const newTagsClicked = ['All'];
      newTagsSelected[0] = true;
      setTagsClicked(newTagsClicked);
      setTagsSelected(newTagsSelected);
    }
  }, [allTags.length, setTagsClicked, sideBarMenu]);

  const handleTagClick = (index: number) => {
    const newTagsSelected = [...tagsSelected];

    if (index === 0) {
      newTagsSelected[0] = true;

      for (let index = 1; index < newTagsSelected.length; index++) {
        newTagsSelected[index] = false;
      }
      setTagsSelected(newTagsSelected);
      return;
    } else {
      newTagsSelected[0] = false;
      newTagsSelected[index] = !newTagsSelected[index];
      setTagsSelected(newTagsSelected);
    }

    if (newTagsSelected.every((tag) => !tag)) {
      newTagsSelected[0] = true;
      setTagsSelected(newTagsSelected);
    }
  };

  return (
    <div
      className={`${
        darkMode[1].isSelected ? 'bg-zinc-900  text-white' : 'bg-gray-50'
      } p-1 rounded-lg flex gap-2`}
    >
      {/* Container for scrollable tags */}
      <div className="flex-1 overflow-hidden">
        <div
          className="flex gap-4 items-center text-sm overflow-x-auto no-scrollbar"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {isLoading ? (
            <div className="flex gap-6 items-center mt-[2px]">
              <div className="w-[60px] h-[30px] bg-slate-200 rounded-md"></div>
              <div className="w-[60px] h-[30px] bg-slate-200 rounded-md"></div>
              <div className="w-[60px] h-[30px] bg-slate-200 rounded-md"></div>
              <div className="w-[60px] h-[30px] bg-slate-200 rounded-md"></div>
              <div className="w-[60px] h-[30px] bg-slate-200 rounded-md"></div>
            </div>
          ) : (
            <>
              {allTags.map((tag, index) => (
                <div
                  key={index}
                  className={`${
                    tagsSelected[index]
                      ? 'bg-violet-500 text-white'
                      : ' text-gray-500'
                  }  p-2 rounded-md text-center text-[12px] sm:text-sm font-medium cursor-pointer min-w-[50px] sm:min-w-[60px] flex-shrink-0`}
                  onClick={() => handleTagClick(index)}
                >
                  {tag.name}
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Add button */}
      <button
        onClick={() => setOpenNewTagWindow(true)}
        className="bg-violet-500 p-2 text-sm rounded-md px-2 flex gap-1 items-center justify-center text-white flex-shrink-0"
      >
        <PlusIcon size={18} />
        <span>Tag</span>
      </button>
    </div>
  );
}
