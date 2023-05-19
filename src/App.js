import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [cancel, setCancel] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/filmsa/");
      if (!response.ok) {
        throw new Error("Something went wrong ...Retrying!");
      }

      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }
  if (!isLoading && error && cancel) {
    var timer = setTimeout(() => {
      fetchMoviesHandler();
    }, 3000);
  }

  const retryHandler = () => {
    setCancel(false);
    clearTimeout(timer);
  };
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>found no movies</p>}

        {!isLoading && error && cancel && (
          <>
            <p>{error}</p>
            <button onClick={retryHandler}>cancel</button>
          </>
        )}
        {!isLoading && error && !cancel && (
          <>
            <p>Something went wrong</p>
          </>
        )}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
