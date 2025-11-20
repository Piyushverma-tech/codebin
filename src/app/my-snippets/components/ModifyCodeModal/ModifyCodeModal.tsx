import React, { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '@/ContextApi';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { anOldHope, tomorrow } from 'react-code-blocks';

interface ModifyCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCode: string;
  language: string;
  onCodeModified: (newCode: string) => void;
}

const DynamicCodeBlock = dynamic(
  () => import('react-code-blocks').then((mod) => mod.CodeBlock),
  { ssr: false }
);

export default function ModifyCodeModal({
  isOpen,
  onClose,
  currentCode,
  language,
  onCodeModified,
}: ModifyCodeModalProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const modifyCode = async () => {
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
          prompt: `Modify this ${language} code according to these instructions: "${prompt}"\n\nExisting code:\n${currentCode}\n\nProvide only the modified code without any explanations or markdown formatting.`,
          language,
          isModification: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to modify code');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // For modifications, we expect the response to be just the code
      const modifiedCode = typeof data === 'string' ? data : data.code;

      if (!modifiedCode) {
        throw new Error('No code was generated');
      }

      onCodeModified(modifiedCode);
      toast.success('Code modified successfully!');
      setPrompt('');
      onClose();
    } catch (error) {
      console.error('Error modifying code:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to modify code'
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
            ? 'bg-neutral-800 border border-white/10 text-white'
            : 'bg-gray-50 text-slate-900'
        } p-6 rounded-lg w-[600px] max-w-[90%]`}
      >
        <h2
          className={`text-lg font-semibold mb-4 ${
            darkMode[1].isSelected ? 'text-slate-200 ' : ' text-gray-800'
          } `}
        >
          Modify Code with AI
        </h2>

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Current Code:</h3>
          <div className="h-[250px] overflow-y-auto ">
            <DynamicCodeBlock
              text={currentCode}
              language={language.toLowerCase()}
              showLineNumbers={false}
              theme={darkMode[1].isSelected ? anOldHope : tomorrow}
              customStyle={{
                height: '100%',
                overflowY: 'auto',
                fontSize: '14px',
              }}
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">
            Modification Instructions:
          </h3>
          <textarea
            ref={inputRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe how you want to modify the code (e.g., 'Add error handling', 'Optimize the loop', 'Add comments')"
            className={`w-full h-32 p-2 rounded-md ${
              darkMode[1].isSelected
                ? 'bg-zinc-800 text-white'
                : 'bg-white text-slate-900'
            } border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all`}
          />
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={modifyCode}
            disabled={isLoading || !prompt.trim()}
            className={`px-4 py-2 rounded-md ${
              isLoading || !prompt.trim()
                ? 'bg-violet-300 cursor-not-allowed'
                : 'bg-violet-500 hover:bg-violet-600'
            } text-white`}
          >
            {isLoading ? 'Modifying...' : 'Modify Code'}
          </button>
        </div>
      </div>
    </div>
  );
}
