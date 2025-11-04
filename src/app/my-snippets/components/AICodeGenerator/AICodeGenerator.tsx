import React, { useEffect, useRef, useState } from 'react';
import { SingleNoteType, SingleTagType } from '@/app/Types';
import { useGlobalContext } from '@/ContextApi';
import programmingLanguages from '@/app/localData/Languages';

interface AICodeGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onCodeGenerated: (note: Partial<SingleNoteType>) => void;
  selectedLanguage: string;
}

export default function AICodeGenerator({
  isOpen,
  onClose,
  onCodeGenerated,
  selectedLanguage,
}: AICodeGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    darkModeObject: { darkMode },
    sharedUserIdObject: { sharedUserId },
    allTagsObject: { allTags, setAllTags },
  } = useGlobalContext();

  // Function to find the matching supported language
  const findMatchingLanguage = (detectedLanguage: string): string => {
    const normalizedDetectedLang = detectedLanguage.toLowerCase();
    const matchedLanguage = programmingLanguages.find(
      (lang) => lang.name.toLowerCase() === normalizedDetectedLang
    );
    return matchedLanguage?.name || selectedLanguage;
  };

  const generateCode = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          language: selectedLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate code');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.code || !data.title || !data.description) {
        throw new Error('Incomplete code generation response');
      }

      // Create any suggested tags that don't exist yet
      let noteTags: SingleTagType[] = [];
      if (data.suggestedTags && Array.isArray(data.suggestedTags)) {
        const createTagPromises = data.suggestedTags.map(
          async (tagName: string) => {
            // Check if tag already exists
            const existingTag = allTags.find(
              (tag: SingleTagType) =>
                tag.name.toLowerCase() === tagName.toLowerCase()
            );

            if (existingTag) {
              return existingTag;
            }

            // Create new tag
            try {
              const response = await fetch('/api/tags', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: tagName,
                  clerkUserId: sharedUserId,
                }),
              });

              if (!response.ok) {
                throw new Error('Failed to create tag');
              }

              const data = await response.json();
              const newTag: SingleTagType = {
                _id: data.tags._id,
                name: data.tags.name,
                clerkUserId: data.tags.clerkUserId,
              };

              setAllTags((prevTags: SingleTagType[]) => [...prevTags, newTag]);
              return newTag;
            } catch (error) {
              console.error('Error creating tag:', error);
              return null;
            }
          }
        );

        const createdTags = await Promise.all(createTagPromises);
        noteTags = createdTags.filter(
          (tag): tag is SingleTagType => tag !== null
        );
      }

      const noteData = {
        title: data.title,
        description: data.description,
        code: data.code,
        language: data.suggestedTags?.[0]
          ? findMatchingLanguage(data.suggestedTags[0])
          : selectedLanguage,
        creationDate: new Date().toISOString(),
        tags: noteTags,
        clerkUserId: sharedUserId,
        isFavorite: false,
        isTrash: false,
        timeComplexity: data.timeComplexity || '',
        optimizationPercent:
          typeof data.optimizationPercent === 'number'
            ? data.optimizationPercent
            : undefined,
      };

      onCodeGenerated(noteData);
      setPrompt('');
      onClose();
    } catch (error) {
      console.error('Error generating code:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to generate code'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`${
          darkMode[1].isSelected
            ? 'bg-zinc-900 text-white'
            : 'bg-gray-50 text-slate-900'
        } p-6 rounded-lg w-[500px] max-w-[90%]`}
      >
        <h2
          className={`text-lg font-semibold mb-4 ${
            darkMode[1].isSelected ? 'text-slate-300 ' : ' text-gray-800'
          } `}
        >
          Generate Code with AI
        </h2>
        <textarea
          ref={inputRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the code you want to generate..."
          className={`w-full h-32 p-2 mb-4 rounded-md ${
            darkMode[1].isSelected
              ? 'bg-zinc-800 text-white'
              : 'bg-white text-slate-900'
          } border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all`}
        />
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={generateCode}
            disabled={isLoading || !prompt.trim()}
            className={`px-4 py-2 rounded-md ${
              isLoading || !prompt.trim()
                ? 'bg-violet-300 cursor-not-allowed'
                : 'bg-violet-500 hover:bg-violet-600'
            } text-white text-sm`}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  );
}
