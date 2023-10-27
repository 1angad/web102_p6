import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const ComicDetail = () => {

    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {
      const getComicDetail = async () => {
        const details = await fetch(
          `https://gateway.marvel.com/v1/public/comics/${params.title}?ts=1&apikey=abcd4a3a2e98ddd69206cc5ce7c03cec&hash=3c365dfc174f5472bb913f3b6c0888fc`
        );
    
        const detailsJson = await details.json();

        setFullDetails(detailsJson);
      };
      
      getComicDetail().catch(console.error);
  }, []);
  console.log(fullDetails);

    return (
        <>
          <div className="comicDetails">
            {fullDetails === null ? (
              <div>Loading...</div>
            ) : (
              <>
                <h1>{fullDetails.data.results[0].title}</h1>
                <img
                  className="images"
                  src={`${fullDetails.data.results[0].thumbnail.path}.${fullDetails.data.results[0].thumbnail.extension}`}
                  alt={`Small icon for ${params.title} comic`}
                />
                <div> {fullDetails.data.results[0].description}</div>
                <br></br>
                <div>
                  This comic was published on {fullDetails.data.results[0].dates[0].date}{" "}
                </div>
                <table>
                  <tbody> 
                      <tr>
                      <th>Price </th>
                      <td>{fullDetails.data.results[0].prices[0].price}</td>
                      </tr>
                      <tr>
                      <th>Page Count </th>
                      <td>{fullDetails.data.results[0].pageCount}</td>
                      </tr>
                      <tr>
                      <th>Creators </th>
                      <td>{fullDetails.data.results[0].creators.items.map((creator) => creator.name).join(', ')}</td>
                      </tr>
                      <tr>
                      <th>Characters </th>
                      <td>{fullDetails.data.results[0].characters.items.map((character) => character.name).join(', ')}</td>
                      </tr>
                  </tbody>
                </table>
              </>
              )}
          </div>
        </>
        );
};
export default ComicDetail;