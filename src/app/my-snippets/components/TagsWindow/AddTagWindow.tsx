'use client';
import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useGlobalContext } from '@/ContextApi';
import { SingleNoteType, SingleTagType } from '@/app/Types';
import toast from 'react-hot-toast';
import { ErrorOutline } from '@mui/icons-material';

function AddTagWindow() {
  const {
    openNewTagWindowObject: { openNewTagWindow, setOpenNewTagWindow },
    allTagsObject: { allTags, setAllTags },
    selectedTagEditObject: { selectedTagEdit, setSelectedTagEdit },
    allNotesObject: { allNotes, setAllNotes },
    sharedUserIdObject: { sharedUserId },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const [tagName, setTagName] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [errorMessage, setErrorMessage]);

  useEffect(() => {
    inputRef.current?.focus();
    const randomIndex = Math.floor(Math.random() * tagSuggestions.length);
    setPlaceholder(`e.g., ${tagSuggestions[randomIndex]}`);
  }, [openNewTagWindow]);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setErrorMessage('');
    setTagName(newValue);
  }

  useEffect(() => {
    if (openNewTagWindow) {
      setTagName('');
      setErrorMessage('');
    }
  }, [openNewTagWindow]);

  const handleClickedTag = () => {
    if (tagName.trim().length === 0) {
      setErrorMessage('Please enter a tag name.');
      return;
    }

    if (
      !allTags.some((tag) => tag.name.toLowerCase() === tagName.toLowerCase())
    ) {
      if (!selectedTagEdit) {
        addNewTagFunction(
          allTags,
          setAllTags,
          setOpenNewTagWindow,
          tagName,
          sharedUserId
        );
      } else {
        handleEditTag(
          allTags,
          setAllTags,
          setOpenNewTagWindow,
          selectedTagEdit,
          setSelectedTagEdit,
          tagName,
          allNotes,
          setAllNotes
        );
      }
    } else {
      setErrorMessage('Tag already exists.');
    }
  };

  useEffect(() => {
    if (selectedTagEdit) {
      setTagName(selectedTagEdit.name);
    }
  }, [selectedTagEdit]);

  // addNewTagFunction is below the component

  if (openNewTagWindow === false) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30  transition-opacity"
        onClick={() => {
          setOpenNewTagWindow(false);
          setSelectedTagEdit(null);
        }}
      />

      {/* Modal */}
      <div
        className={`fixed left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-full max-w-md ${
          darkMode[1].isSelected
            ? 'bg-[#212121] border border-white/10'
            : ' bg-gray-50'
        } rounded-xl shadow-xl p-6 z-50`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-lg font-semibold ${
              darkMode[1].isSelected ? 'text-slate-300 ' : ' text-gray-800'
            } `}
          >
            {selectedTagEdit ? 'Edit Tag' : 'Add New Tag'}
          </h2>
          <button
            onClick={() => {
              setOpenNewTagWindow(false);
              setSelectedTagEdit(null);
            }}
            className="p-2 rounded-full hover:bg-gray-400/20 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}

        <div className="mb-6">
          <span
            className={`block text-sm font-medium ${
              darkMode[1].isSelected ? 'text-slate-300' : 'text-gray-700'
            }  mb-2`}
          >
            Tag Name
          </span>
          <input
            ref={inputRef}
            value={tagName}
            onChange={(e) => onInputChange(e)}
            className={`w-full h-10 px-4 rounded-lg ${
              darkMode[1].isSelected
                ? ' text-slate-200 bg-neutral-800'
                : 'text-slate-600 bg-gray-50'
            }  border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all`}
            placeholder={placeholder}
          />
          {errorMessage.length > 0 && (
            <div className="text-red-500 flex mt-2 gap-1 items-center">
              <ErrorOutline className="text-[13px]" />
              <span className="text-red-500 text-[11px]">{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              setOpenNewTagWindow(false);
              setSelectedTagEdit(null);
            }}
            className={`px-4 py-2 rounded-lg ${
              darkMode[1].isSelected
                ? ' text-gray-300 hover:text-gray-700 hover:bg-gray-50 border-gray-200 '
                : '  text-gray-700 hover:border-gray-700'
            } border text-sm font-medium   transition-colors`}
          >
            Cancel
          </button>
          <button
            onClick={handleClickedTag}
            className="px-4 py-2 bg-violet-500 hover:bg-violet-700 rounded-lg text-sm font-medium text-white transition-colors"
          >
            {selectedTagEdit ? 'Edit Tag' : 'Add Tag'}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddTagWindow;

const tagSuggestions = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'MERN Stack',
  'Tailwind CSS',
  'CSS',
  'HTML',
  'Python',
  'Django',
  'Flask',
  'Machine Learning',
  'AI',
  'Deep Learning',
  'Data Science',
  'SQL',
  'PostgreSQL',
  'MySQL',
  'Firebase',
  'Supabase',
  'GraphQL',
  'REST API',
  'Git',
  'GitHub',
  'Docker',
  'Kubernetes',
  'Linux',
  'Cybersecurity',
  'Blockchain',
  'Solidity',
  'Rust',
  'C++',
  'C#',
  'Java',
  'Spring Boot',
  'Go',
  'Swift',
  'Flutter',
  'React Native',
  'Mobile Development',
  'Software Engineering',
  'Competitive Programming',
  'LeetCode',
  'Codeforces',
  'DSA',
  'System Design',
  'Freelancing',
];

async function addNewTagFunction(
  allTags: SingleTagType[],
  setAllTags: (value: React.SetStateAction<SingleTagType[]>) => void,
  setOpenNewTagWindow: (value: React.SetStateAction<boolean>) => void,
  tagName: string,
  sharedUserId: string
) {
  const newTag = {
    name: tagName,
    clerkUserId: sharedUserId || '',
  };
  try {
    const response = await fetch('/api/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTag),
    });

    if (!response.ok) {
      throw new Error('Failed to add tag');
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const addedTag: SingleTagType = {
      _id: data.tags._id,
      name: data.tags.name,
      clerkUserId: data.tags.clerkUserId,
    };
    setAllTags((prevTags) => [...prevTags, addedTag]);
    setOpenNewTagWindow(false);
    toast.success('Tag has been added.');
  } catch (error) {
    console.log(error);
    toast.error(error instanceof Error ? error.message : 'Failed to add tag.');
  }
}

// async function updateNote(note: SingleNoteType, tagToRemove: string) {
//   const updatedTags = note.tags.filter(
//     (t) => t.name.toLowerCase() !== tagToRemove.toLowerCase()
//   );

//   const updateNoteResponse = await fetch(
//     `/api/snippets?snippetId=${note._id}`,
//     {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         ...note,
//         tags: updatedTags,
//       }),
//     }
//   );

//   if (!updateNoteResponse.ok) {
//     throw new Error(`Failed to update note ${note._id}`);
//   }

//   const updatedNote = await updateNoteResponse.json();
//   return updatedNote;
// }

// async function handleEditTag(
//   allTags: SingleTagType[],
//   setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>,
//   setOpenNewTagWindow: React.Dispatch<React.SetStateAction<boolean>>,
//   selectedTagEdit: SingleTagType | null,
//   setSelectedTagEdit: React.Dispatch<
//     React.SetStateAction<SingleTagType | null>
//   >,
//   tagName: string,
//   allNotes: SingleNoteType[],
//   setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>
// ) {
//   if (!selectedTagEdit) return;

//   // Store the old tag name in lowercase for consistent comparisons.
//   const oldTagName = selectedTagEdit.name.toLocaleLowerCase();

//   try {
//     // Update the tag in the database.
//     const response = await fetch(`/api/tags?tagId=${selectedTagEdit._id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name: tagName }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Failed to update tag');
//     }

//     // Update the global tags array: update the tag with matching _id.
//     const updatedAllTags = allTags.map((tag) =>
//       tag._id === selectedTagEdit._id ? { ...tag, name: tagName } : tag
//     );

//     // Update every note that contains the tag (using oldTagName for comparison).
//     const updatedAllNotes = allNotes.map((note) => {
//       if (
//         note.tags.some((tag) => tag.name.toLocaleLowerCase() === oldTagName)
//       ) {
//         return {
//           ...note,
//           tags: note.tags.map((tag) =>
//             tag.name.toLocaleLowerCase() === oldTagName
//               ? { ...tag, name: tagName }
//               : tag
//           ),
//         };
//       }
//       return note;
//     });

//     // Update state.
//     setAllTags(updatedAllTags);
//     setAllNotes(updatedAllNotes);
//     setOpenNewTagWindow(false);
//     setSelectedTagEdit(null);
//     toast.success('Tag has been updated.');
//   } catch (error) {
//     console.error('Error updating tag:', error);
//     toast.error(
//       error instanceof Error ? error.message : 'Failed to update tag'
//     );
//   }
// }

// Updates a single note by replacing the old tag name with the new one and sends a PUT request to update the note in the database.
async function updateTagInNote(
  note: SingleNoteType,
  oldTagName: string,
  newTagName: string
): Promise<SingleNoteType> {
  // Create updated tags: replace tags with oldTagName  with newTagName.
  const updatedTags = note.tags.map((tag) =>
    tag.name.toLowerCase() === oldTagName.toLowerCase()
      ? { ...tag, name: newTagName }
      : tag
  );

  // Prepare the updated note payload.
  const updatedPayload = { ...note, tags: updatedTags };

  // Send a PUT request to update this note.
  const response = await fetch(`/api/snippets?snippetId=${note._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPayload),
  });

  if (!response.ok) {
    throw new Error(`Failed to update note ${note._id}`);
  }

  const updatedNote = await response.json();
  return updatedNote;
}

//Finds all notes that contain the tag and updates each note by calling updateTagInNote.
async function updateTagInAllNotes(
  oldTag: SingleTagType,
  newTagName: string,
  allNotes: SingleNoteType[],
  setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>
) {
  // Save the old tag name in lowercase for stable comparisons.
  const oldTagName = oldTag.name.toLowerCase();

  // Identify notes that contain the tag.
  const notesToUpdate = allNotes.filter((note) =>
    note.tags.some((tag) => tag.name.toLowerCase() === oldTagName)
  );

  // Update each note.
  const updatePromises = notesToUpdate.map((note) =>
    updateTagInNote(note, oldTag.name, newTagName)
  );

  // Wait for all updates.
  const updatedNotes = await Promise.all(updatePromises);

  // Merge the updated notes back into the global list.
  const updatedAllNotes = allNotes.map((note) => {
    const updatedNote = updatedNotes.find((un) => un._id === note._id);
    return updatedNote ? updatedNote : note;
  });

  setAllNotes(updatedAllNotes);
}

async function handleEditTag(
  allTags: SingleTagType[],
  setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>,
  setOpenNewTagWindow: React.Dispatch<React.SetStateAction<boolean>>,
  selectedTagEdit: SingleTagType | null,
  setSelectedTagEdit: React.Dispatch<
    React.SetStateAction<SingleTagType | null>
  >,
  newTagName: string,
  allNotes: SingleNoteType[],
  setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>
) {
  if (!selectedTagEdit) return;

  try {
    // 1. Update the tag in the tags API.
    const response = await fetch(`/api/tags?tagId=${selectedTagEdit._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTagName }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update tag');
    }

    // 2. Update the global tags array.
    const updatedAllTags = allTags.map((tag) =>
      tag._id === selectedTagEdit._id ? { ...tag, name: newTagName } : tag
    );
    setAllTags(updatedAllTags);

    // 3. Update all notes containing the old tag name.
    await updateTagInAllNotes(
      selectedTagEdit,
      newTagName,
      allNotes,
      setAllNotes
    );

    // 4. Close the edit window and clear the selected tag.
    setOpenNewTagWindow(false);
    setSelectedTagEdit(null);
    toast.success('Tag has been updated.');
  } catch (error) {
    console.error('Error updating tag:', error);
    toast.error(
      error instanceof Error ? error.message : 'Failed to update tag'
    );
  }
}
