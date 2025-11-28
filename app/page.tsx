'use client';

import React, { useState } from 'react';

export default function ScreenplaySummarizer() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');

  // Placeholder summarize handler
  const handleSummarize = () => {
    // This is a placeholder. Replace with your summarization logic.
    setSummary('Summary will appear here.');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">
        Screenplay Summarizer
      </h1>
      <textarea
        className="w-full max-w-2xl h-64 p-4 rounded-lg bg-gray-800 text-white resize-none border border-gray-700 focus:outline-none focus:border-blue-500 mb-6 text-lg"
        placeholder="Paste your screenplay here..."
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      />
      <button
        onClick={handleSummarize}
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md text-lg font-semibold transition-colors"
      >
        Summarize
      </button>
      <div className="w-full max-w-2xl mt-10 p-6 rounded-lg bg-gray-800 border border-gray-700 text-white min-h-[6rem]">
        {summary ? summary : <span className="text-gray-400">Your summary will appear here.</span>}
      </div>
    </div>
  );
}

