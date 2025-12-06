'use client';

import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function ScreenplaySummarizer() {
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setInputText(''); 
      setError('');
    }
  };

  const handleSummarize = async () => {
    setError('');
    setSummary('');

    if (!inputText && !file) {
        setError("Please paste text or upload a PDF.");
        return;
    }
    
    setLoading(true);
    
    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      } else {
        formData.append('text', inputText);
      }

      const response = await fetch('/api/summarize', {
        method: 'POST',
        body: formData, 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to summarize');
      }

      setSummary(data.summary);
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 py-12 px-4 font-sans text-gray-100">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
          Screenplay Summarizer
        </h1>
        <p className="text-gray-400 text-lg">Powered by Gemini 2.0 Flash</p>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-3xl relative mb-6 group">
        
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-gray-400 uppercase tracking-wider font-semibold">Input</span>
            {file && (
                <span className="text-green-400 bg-green-400/10 px-3 py-1 rounded-full font-medium flex items-center gap-2 border border-green-400/20">
                    📄 {file.name} 
                    <button onClick={() => setFile(null)} className="text-red-400 hover:text-red-300 ml-2">✕</button>
                </span>
            )}
        </div>

        {/* Text Area */}
        <textarea
          className={`w-full h-64 p-6 rounded-xl bg-gray-800 text-white resize-none border-2 focus:outline-none text-lg transition-all duration-200 shadow-xl
            ${file ? 'border-green-500/50 bg-gray-800/50 text-gray-500 cursor-not-allowed' : 'border-gray-700 hover:border-gray-600 focus:border-blue-500'}`}
          placeholder={file ? "PDF selected. Ready to analyze." : "Paste your scene or screenplay here..."}
          value={inputText}
          onChange={e => {
            setInputText(e.target.value);
            setFile(null);
          }}
          disabled={!!file}
        />

        {/* Upload Button */}
        {!file && (
             <div className="absolute bottom-6 right-6">
                <input 
                    type="file" 
                    accept=".pdf" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                />
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 bg-gray-700 hover:bg-gray-600 hover:scale-105 rounded-full text-white transition-all shadow-lg border border-gray-600"
                    title="Upload PDF"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.71-5.71a9 9 0 1 1-9.942-9.942" />
                    </svg>
                </button>
             </div>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={handleSummarize}
        disabled={loading || (!inputText && !file)} 
        className="w-full max-w-3xl py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl shadow-lg text-xl font-bold transition-all transform active:scale-95"
      >
        {loading ? (
            <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Script...
            </span>
        ) : 'Summarize'}
      </button>

      {/* Error Display */}
      {error && (
        <div className="w-full max-w-3xl mt-6 p-4 bg-red-500/10 border border-red-500/50 text-red-200 rounded-xl flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Result Display */}
      {summary && (
        <div className="w-full max-w-3xl mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-2 mb-4">
                <span className="h-px bg-gray-700 flex-1"></span>
                <h2 className="text-gray-400 uppercase tracking-widest text-sm font-semibold">Analysis Result</h2>
                <span className="h-px bg-gray-700 flex-1"></span>
            </div>
            
            {/* FIX IS HERE: space-y-4 moved to the parent div */}
            <div className="p-8 rounded-2xl bg-gray-800 border border-gray-700/50 shadow-2xl space-y-4">
                <ReactMarkdown 
                    components={{
                        h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-blue-400 mt-6 mb-3 border-b border-gray-700 pb-2" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-xl font-bold text-purple-400 mt-6 mb-3" {...props} />,
                        strong: ({node, ...props}) => <strong className="text-white font-bold" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 space-y-2 text-gray-300" {...props} />,
                        li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                        p: ({node, ...props}) => <p className="text-gray-300 leading-relaxed" {...props} />,
                    }}
                >
                    {summary}
                </ReactMarkdown>
            </div>
        </div>
      )}
    </div>
  );
}

