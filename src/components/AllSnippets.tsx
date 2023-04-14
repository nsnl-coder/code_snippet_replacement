import { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { toastError, toastSuccess } from '../utils/toast';

interface Snippet {
  options: [string, string][];
  initialCode: string;
  name: string;
  id: string;
}

interface Props {
  options: [string, string][];
  setOptions: (option: [string, string][]) => void;
  initialCode: string;
  setInitialCode: (code: string) => void;
}

function AllSnippets(props: Props): JSX.Element {
  const { initialCode, setInitialCode, options, setOptions } = props;
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [currentSnippetId, setCurrentSnippetId] = useState('');
  const nameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const storedSnippets = localStorage.getItem('snippets');
    if (storedSnippets) {
      setSnippets(JSON.parse(storedSnippets));
    }
  }, []);

  useEffect(() => {
    if (snippets.length > 0)
      localStorage.setItem('snippets', JSON.stringify(snippets));
  }, [snippets]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameRef.current?.value) {
      toastError('Enter snippet name first to create snippet!');
      return;
    }

    if (options.length === 0) {
      toastError('Enter options first to create snippet!');
      return;
    }

    if (!initialCode) {
      toastError('Add initial code first to create snippet!');
      return;
    }

    const newSnippet: Snippet = {
      options,
      initialCode,
      name: nameRef.current?.value,
      id: v4(),
    };

    if (currentSnippetId) {
      setSnippets((prev) => [
        ...prev.filter((item) => item.id !== currentSnippetId),
        { ...newSnippet, id: currentSnippetId },
      ]);
      setCurrentSnippetId('');
      setOptions([]);
      setInitialCode('');
      nameRef.current.value = '';
      return;
    }

    nameRef.current.value = '';
    setSnippets([...snippets, newSnippet]);
    setInitialCode('');
    setOptions([]);
    toastSuccess('You successfully created snippet!');
  };

  const handleSnippetClick = (snippet: Snippet) => {
    setInitialCode(snippet.initialCode);
    setOptions(snippet.options);
    setCurrentSnippetId(snippet.id);
    nameRef.current!.value = snippet.name;
  };

  const handleDeleteSnippet = (snippet: Snippet) => {
    const isConfirm = confirm('Do you really want to delete?');

    if (isConfirm)
      setSnippets((prev) => prev.filter((item) => item.id !== snippet.id));

    if (snippets.length === 1) {
      localStorage.setItem('snippets', JSON.stringify([]));
    }
    toastSuccess('Successfully delete snippet!');
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <label htmlFor="snippet" className="font-medium text-lg mb-6 block">
          Snippets
        </label>
        <ul className="grid grid-cols-3 gap-4">
          {snippets.map((snippet) => (
            <li key={snippet.id}>
              <div
                className="bg-gray-100 py-2 px-2 rounded-md hover:bg-gray-200 cursor-pointer flex justify-between"
                onClick={() => handleSnippetClick(snippet)}
              >
                <span>{snippet.name}</span>
                <button
                  type="button"
                  className="text-sm bg-red-400 px-3 py-1 rounded-md text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSnippet(snippet);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <form action="" className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border w-full h-10 px-3"
          required
          placeholder="Enter snippet name here!"
          ref={nameRef}
          disabled={!!currentSnippetId}
        />
        <button
          type="submit"
          className={`text-white whitespace-nowrap px-4  ${
            currentSnippetId ? 'bg-blue-500' : 'bg-green-600'
          }`}
        >
          {currentSnippetId ? 'Save snippet' : 'Add snippet!'}
        </button>
      </form>
    </div>
  );
}

export default AllSnippets;
