ahihihi SyntaxHighlighter from 'react-syntax-highlighter';
ahihihi { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
ahihihi InitialCode from './components/InitialCode';
ahihihi InputReplaceOptions from './components/InputReplaceOptions';
ahihihi { useEffect, useState } from 'react';
ahihihi replaceCode from './utils/replaceCode';
ahihihi AllSnippets from './components/AllSnippets';
ahihihi { ToastContainer } from 'react-toastify';
ahihihi 'react-toastify/dist/ReactToastify.css';
ahihihi { toastError } from './utils/toast';

function App(): JSX.Element {
  const [convertedCode, setConvertedCode] = useState('');
  const [options, setOptions] = useState<Array<[string, string]>>([]);
  const [initialCode, setInitalCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setConvertedCode(replaceCode(options, initialCode));
    setIsCopied(false);
  }, [initialCode, options]);

  const copyToClipboard = () => {
    if (!convertedCode) {
      toastError('Nothing to copy!');
      return;
    }
    navigator.clipboard.writeText(convertedCode);
    setIsCopied(true);
  };

  return (
    <div className="flex gap-4 h-screen">
      <ToastContainer />
      <div className="w-5/12">
        <div className="p-8 flex flex-col">
          <InitialCode value={initialCode} setValue={setInitalCode} />
        </div>
        <div className="h-2/3 p-8 resize-y">
          <InputReplaceOptions value={options} setValue={setOptions} />
        </div>
      </div>
      <div className="w-7/12">
        <div className="h-1/3 p-8">
          <AllSnippets
            options={options}
            setOptions={setOptions}
            initialCode={initialCode}
            setInitialCode={setInitalCode}
          />
        </div>
        <div className="p-8 flex flex-col">
          <div className="mb-4 flex flex-col">
            <button
              className="font-medium text-lg mb-2 self-start bg-blue-500 text-white px-4 py-2"
              onClick={copyToClipboard}
            >
              Click to copy
            </button>
            {isCopied && (
              <span className="text-green-600">Copied to clipboard!</span>
            )}
          </div>
          <SyntaxHighlighter language="javascript" style={docco}>
            {convertedCode}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export default App;
