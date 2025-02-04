'use client';

import { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRemix = async () => {
    setIsLoading(true);
    setOutputText(''); // Clear previous output
    
    try {
      console.log('Sending request to remix API...');
      const response = await fetch('/api/remix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      console.log('Received response:', data);
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setOutputText(data.remixedText);
    } catch (error: any) {
      console.error('Error remixing text:', error);
      setOutputText(`Error occurred while remixing text: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <main className="max-w-4xl mx-auto bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-[#808080] p-2 shadow-lg">
        {/* Title bar */}
        <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center mb-2">
          <h1 className="text-sm font-bold">Content Remixer</h1>
          <div className="flex gap-1">
            <button className="w-5 h-5 bg-[#c0c0c0] border-t border-l border-white border-r border-b border-[#808080] text-black text-xs flex items-center justify-center hover:bg-[#dfdfdf]">_</button>
            <button className="w-5 h-5 bg-[#c0c0c0] border-t border-l border-white border-r border-b border-[#808080] text-black text-xs flex items-center justify-center hover:bg-[#dfdfdf]">□</button>
            <button className="w-5 h-5 bg-[#c0c0c0] border-t border-l border-white border-r border-b border-[#808080] text-black text-xs flex items-center justify-center hover:bg-[#dfdfdf]">×</button>
          </div>
        </div>
        
        <div className="space-y-4 p-2">
          <div>
            <label htmlFor="input" className="block text-sm mb-1 text-black font-semibold">
              Enter text to remix:
            </label>
            <textarea
              id="input"
              className="w-full h-40 p-2 bg-white border-t border-l border-[#808080] border-r border-b border-white font-[system-ui] text-sm text-black"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here..."
            />
          </div>

          <button
            onClick={handleRemix}
            disabled={isLoading || !inputText.trim()}
            className="px-4 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-[#808080] active:border-t-[1px] active:border-l-[1px] active:border-[#808080] active:border-r-2 active:border-b-2 active:border-black disabled:bg-[#d4d4d4] disabled:text-[#808080] text-sm text-black hover:bg-[#dfdfdf] font-semibold"
          >
            {isLoading ? 'Remixing...' : 'Remix Content'}
          </button>

          {outputText && (
            <div>
              <h2 className="text-sm mb-1 text-black font-semibold">Remixed Output:</h2>
              <div className="w-full min-h-40 p-2 bg-white border-t border-l border-[#808080] border-r border-b border-white font-[system-ui] text-sm text-black whitespace-pre-wrap">
                {outputText}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Windows 95 Start Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#c0c0c0] border-t-2 border-white p-1 flex items-center shadow-md">
        <button className="px-4 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-[#808080] text-sm flex items-center gap-2 text-black font-semibold hover:bg-[#dfdfdf]">
          <div className="w-4 h-4 bg-[#008080]"></div>
          Start
        </button>
      </div>
    </div>
  );
}
