import { useState, useEffect } from 'react'
import './App.css'
import { Link } from "react-router-dom";
import ComicChart from './Components/ComicChart.jsx';
const PUBLIC_KEY = import.meta.env.VITE_APP_PUBLIC_KEY;
const HASH_KEY = import.meta.env.VITE_APP_HASH_KEY;

function App() {
  const [comicList, setComicList] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect( () => {
    fetchAllHeroData();
  }, []);

  const fetchAllHeroData = async () => {
    const response = await fetch (
      "https://gateway.marvel.com/v1/public/comics?ts=1&apikey=abcd4a3a2e98ddd69206cc5ce7c03cec&hash=3c365dfc174f5472bb913f3b6c0888fc"
    );
    const json = await response.json();
    setComicList(json);
    console.log(json);
  };

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = comicList.data.results.filter((comic) =>
        comic.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(comicList.data.results);
    }
  };

  const averageComicPrice = () => {
    let total = 0;
    for (let i = 0; i < comicList.data.results.length; i++) {
      total += comicList.data.results[i].prices[0].price;
    }
    let average = total / comicList.data.results.length;
    return average.toFixed(2);
  };

  return (
    <>
      <div className="App">
        <div className="App-page">
          <h1>Marvel Comics</h1>
          <ComicChart />
          <div className="App-row-cards">
            <div className="card">
              <div className="card-title">Total Comics</div>
              <div className="card-body">{comicList && comicList.data.total}</div>
            </div>
            <div className="card">
              <div className="card-title">Total Characters</div>
              <div className="card-body">{comicList && comicList.data.count}</div>
            </div>
            <div className="card">
              <div className="card-title">Average Comic Price</div>
              <div className="card-body">${comicList && averageComicPrice()}</div>
            </div>
          </div>
          <div className="App-row">
                <div className="List">
                    <div className="filters">
                      Title Search: 
                      <input
                        type="text"
                        placeholder="Search..."
                        onChange={(inputString) => searchItems(inputString.target.value)}
                      />
                      Price Search: 
                      <input
                        type="text"
                        placeholder="Search..."
                      />
                    </div>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Issue</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Thumbnail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchInput.length > 0 ? filteredResults.map((comic) =>
                                  <tr key={comic.id}>
                                      <td>
                                        <Link
                                          to={`/comicDetail/${comic.id}`}
                                          key={comic.id}
                                        >
                                          {comic.title}
                                        </Link>
                                      </td>
                                      <td>{comic.issueNumber}</td>
                                      <td>{comic.description === "" ? "No Description Provided" : comic.description}</td>
                                      <td>{comic.prices[0].price}</td>
                                      <td><img src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt=""/></td>  
                                  </tr>
                                  ) :
                                  comicList && comicList.data.results.map((comic) =>
                                  <tr key={comic.id}>
                                      <td><Link
                                          to={`/comicDetail/${comic.id}`}
                                          key={comic.id}
                                        >
                                          {comic.title}
                                        </Link></td>
                                      <td>{comic.issueNumber}</td>
                                      <td>{comic.description === "" ? "No Description Provided" : comic.description}</td>
                                      <td>{comic.prices[0].price}</td>
                                      <td><img src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt=""/></td>

                                  </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
//# https://gateway.marvel.com/v1/public/characters?ts=1&apikey=abcd4a3a2e98ddd69206cc5ce7c03cec&hash=3c365dfc174f5472bb913f3b6c0888fc
export default App
