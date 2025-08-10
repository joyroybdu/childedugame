import React, { useState, useEffect } from "react";

const NASA_API_KEY = "XPq3d9gdLfLUosbUJCRyVrYaLAYYxZ8OsJ0qFbKT";

function PictureOfTheDay() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchData();
  }, [date]);

  const changeDateBy = (days) => {
    const current = new Date(date);
    current.setDate(current.getDate() + days);
    const newDate = current.toISOString().slice(0, 10);
    if (newDate < "1995-06-16") return;
    if (newDate > new Date().toISOString().slice(0, 10)) return;
    setDate(newDate);
  };

  const handleDateChange = (e) => {
    const selected = e.target.value;
    // if (selected < "1995-06-16") return alert("Date must be after 1995-06-16");
    // if (selected > new Date().toISOString().slice(0, 10)) return alert("Date cannot be in the future");
    setDate(selected);
  };

 
  const getGoogleTranslateURL = (text) => {
    const encodedText = encodeURIComponent(text);

    return `https://translate.google.com/?sl=en&tl=bn&text=${encodedText}&op=translate`;
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">NASA Astronomy Picture of the Day</h1>

      <div className="flex justify-center items-center mb-4 space-x-4">
        <button
          onClick={() => changeDateBy(-1)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={date === "1995-06-16"}
        >
          Previous
        </button>

        <input
          type="date"
          value={date}
          min="1995-06-16"
          max={new Date().toISOString().slice(0, 10)}
          onChange={handleDateChange}
          className="border rounded px-3 py-1 text-center"
        />

        <button
          onClick={() => changeDateBy(1)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={date === new Date().toISOString().slice(0, 10)}
        >
          Next
        </button>
      </div>

      {loading && <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {data && (
        <div className="space-y-4">
          {data.media_type === "image" ? (
            <img
              src={data.url}
              alt={data.title}
              className="w-full rounded shadow-md"
              loading="lazy"
            />
          ) : data.media_type === "video" ? (
            <iframe
              src={data.url}
              title={data.title}
              width="100%"
              height="400"
              frameBorder="0"
              allowFullScreen
              className="rounded shadow-md"
            ></iframe>
          ) : (
            <p>Unsupported media type: {data.media_type}</p>
          )}

          <h2 className="text-xl font-semibold">{data.title}</h2>
          <p className="text-sm italic text-gray-600 dark:text-gray-400">{data.date}</p>
          <p className="leading-relaxed">{data.explanation}</p>

          {/* Translate button */}
          <div className="text-center mt-4">
            <a
              href={getGoogleTranslateURL(data.explanation)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Translate Explanation to Bengali
            </a>
          </div>

          {data.copyright && <p className="text-xs text-right">© {data.copyright}</p>}
        </div>
      )}
    </div>
  );
}

export default PictureOfTheDay;
