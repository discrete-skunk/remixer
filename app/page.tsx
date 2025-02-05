'use client';

import { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [outputTweets, setOutputTweets] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRemix = async () => {
    setIsLoading(true);
    setOutputTweets([]); // Clear previous output
    
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
      
      setOutputTweets(data.remixedText);
    } catch (error: any) {
      console.error('Error remixing text:', error);
      setOutputTweets(Array(6).fill(`Error occurred while remixing text: ${error?.message || 'Unknown error'}`));
    } finally {
      setIsLoading(false);
    }
  };

  const openTweetIntent = (tweet: string) => {
    const tweetText = encodeURIComponent(tweet);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#008080] p-4">
      <main className="max-w-6xl mx-auto bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-[#808080] p-2 shadow-lg">
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
              Enter text to remix into tweets:
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

          {outputTweets.length > 0 && (
            <div>
              <h2 className="text-sm mb-2 text-black font-semibold">Remixed Tweets:</h2>
              <div className="grid grid-cols-3 gap-3">
                {outputTweets.map((tweet, index) => (
                  <div 
                    key={index}
                    className="bg-[#c0c0c0] border-t border-l border-white border-r border-b border-[#808080] p-2"
                  >
                    {/* Tweet header */}
                    <div className="bg-[#000080] text-white px-2 py-0.5 text-xs font-bold mb-2 flex justify-between items-center">
                      <span>Tweet {index + 1}</span>
                      <span className="text-[10px]">{tweet.length} / 140</span>
                    </div>
                    {/* Tweet content */}
                    <div className="bg-white border-t border-l border-[#808080] border-r border-b border-white p-2 text-sm text-black min-h-[100px]">
                      {tweet}
                    </div>
                    {/* Tweet button */}
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => openTweetIntent(tweet)}
                        className="px-3 py-0.5 bg-[#c0c0c0] border-t border-l border-white border-r border-b border-[#808080] text-xs text-black hover:bg-[#dfdfdf] active:border-t-[1px] active:border-l-[1px] active:border-[#808080] active:border-r active:border-b active:border-black font-semibold"
                      >
                        Tweet This
                      </button>
                    </div>
                  </div>
                ))}
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
