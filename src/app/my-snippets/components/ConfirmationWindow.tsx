'use client';
import { useGlobalContext } from '@/ContextApi';
import { useState } from 'react';
import toast from 'react-hot-toast';

function ConfirmationWindow() {
  const {
    openConfirmationWindowObject: {
      openConfirmationWindow,
      setOpenConfirmationWindow,
    },
    allNotesObject: { allNotes, setAllNotes },
    selectedNoteObject: { selectedNote, setSelectedNote },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const [isDeleting, setIsDeleting] = useState(false);
  async function deleteSnippet() {
    if (selectedNote) {
      setIsDeleting(true);
      try {
        const response = await fetch(
          `/api/snippets?snippetId=${selectedNote._id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const copyAllNotes = [...allNotes];
        const updateAllNotes = copyAllNotes.filter(
          (note) => note._id !== selectedNote._id
        );
        setAllNotes(updateAllNotes);
        setOpenConfirmationWindow(false);
        setSelectedNote(null);

        toast.success('Snippet has been deleted');
      } catch (error) {
        console.error('Error deleting snippet:', error);
        toast.error('Error deleting snippet. please try again');
      } finally {
        setIsDeleting(false);
      }
    }
  }
  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${
        openConfirmationWindow ? 'fixed' : 'hidden'
      }`}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative transform overflow-hidden rounded-lg ${
            darkMode[1].isSelected
              ? 'bg-neutral-800 border border-white/10'
              : 'bg-gray-50'
          } px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6`}
        >
          {/* Content */}
          <div className="sm:flex sm:items-start">
            {/* Warning Icon */}
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3
                className={`text-lg font-medium leading-6 ${
                  darkMode[1].isSelected ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                Delete Snippet
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-400">
                  Are you sure you want to delete this Snippet? This action
                  cannot be undone.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
            <button
              type="button"
              onClick={() => deleteSnippet()}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-violet-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            <button
              type="button"
              onClick={() => setOpenConfirmationWindow(false)}
              className={`mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 ${
                darkMode[1].isSelected ? ' text-gray-200' : ' text-gray-700'
              }  px-4 py-2 text-base bg-transparent font-medium  shadow-sm focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationWindow;
