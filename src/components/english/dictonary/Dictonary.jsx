import React, { useState } from 'react';

const Dictonary = () => {
  const [word, setWord] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  // Text-to-Speech function
  const speak = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  const fetchWordData = async () => {
    if (!word.trim()) return;
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!res.ok) throw new Error('Word not found');
      const result = await res.json();
      setData(result[0]);
      setError('');
    } catch {
      setData(null);
      setError('❌ Word not found. Try another one.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 text-center mb-6">
          📚 Word Explorer
        </h1>

        <div className="flex flex-col md:flex-row gap-3 justify-center items-center mb-6">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchWordData()}
            placeholder="Type a word..."
            className="w-full md:w-2/3 px-4 py-2 rounded-md border border-indigo-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={fetchWordData}
            className="w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-all duration-200 cursor-pointer"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-600 font-medium text-center">{error}</p>}

        {data && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-indigo-700 flex items-center justify-center gap-2">
                {data.word}
                <button
                  onClick={() => speak(data.word)}
                  className="text-indigo-600 hover:text-indigo-800 text-lg cursor-pointer"
                  title="Listen to the word"
                  aria-label="Listen to the word"
                >
                  🔊
                </button>
              </h2>
              {data.phonetics[0]?.text && (
                <p className="text-sm text-gray-500 italic">{data.phonetics[0].text}</p>
              )}
            </div>

            {data.meanings.map((meaning, index) => (
              <div
                key={index}
                className="bg-indigo-50 p-4 rounded-md border-l-4 border-indigo-400 shadow-sm"
              >
                <p className="text-sm text-gray-600 italic mb-1">
                  Part of speech: {meaning.partOfSpeech}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Definition:</span>{' '}
                  {meaning.definitions[0].definition}
                  <button
                    onClick={() => speak(meaning.definitions[0].definition)}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                    title="Listen to the definition"
                    aria-label="Listen to the definition"
                  >
                    🔊
                  </button>
                </p>

                {meaning.definitions[0].example && (
                  <p className="mb-1">
                    <span className="font-semibold">Example:</span>{' '}
                    "{meaning.definitions[0].example}"
                    <button
                      onClick={() => speak(meaning.definitions[0].example)}
                      className="ml-2 text-indigo-600 hover:text-indigo-800"
                      title="Listen to the example"
                      aria-label="Listen to the example"
                    >
                      🔊
                    </button>
                  </p>
                )}

                {meaning.synonyms.length > 0 && (
                  <p>
                    <span className="font-semibold">Synonyms:</span>{' '}
                    {meaning.synonyms.slice(0, 5).join(', ')}
                  </p>
                )}

                {meaning.antonyms.length > 0 && (
                  <p>
                    <span className="font-semibold">Antonyms:</span>{' '}
                    {meaning.antonyms.slice(0, 5).join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dictonary;
