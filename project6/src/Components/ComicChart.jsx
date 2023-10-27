import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const ComicChart = () => {
  const [comicData, setComicData] = useState([]);

  useEffect(() => {
    const fetchComicData = async () => {
      // Fetch comic data from the Marvel API
      const response = await fetch(
        "https://gateway.marvel.com/v1/public/comics?ts=1&apikey=abcd4a3a2e98ddd69206cc5ce7c03cec&hash=3c365dfc174f5472bb913f3b6c0888fc"
      );
      const data = await response.json();

      // Check if data.data.results is defined before trying to map over it
      if (data.data && data.data.results) {
        // Create an object to keep track of comic releases by year
        const releaseCounts = {};

        // Iterate over each comic
        data.data.results.forEach(comic => {
          // Get the release year of the comic
          const releaseYear = new Date(comic.modified).getFullYear();

          // If the year is already in releaseCounts, increment the count, otherwise set it to 1
          releaseCounts[releaseYear] = (releaseCounts[releaseYear] || 0) + 1;
        });

        // Map the releaseCounts object to the format needed for the chart
        const chartData = Object.entries(releaseCounts).map(([year, count]) => ({
          year,
          count,
        }));

        setComicData(chartData);
      }
    };

    fetchComicData();
  }, []);

  return (
    <div className="App">
      <h2>Marvel Comic Release Over Time</h2>

      <BarChart width={800} height={500} data={comicData}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#FFC000" />
      </BarChart>
    </div>
  );
};

export default ComicChart;