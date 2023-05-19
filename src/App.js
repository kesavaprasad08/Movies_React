import React, { useState, useEffect, useCallback, useRef } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [cancel, setCancel] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const titleRef = useRef();
  const openingTextRef = useRef();
  const releaseDateRef = useRef();

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
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
  }, []);
  if (!isLoading && error && cancel) {
    var timer = setTimeout(() => {
      fetchMoviesHandler();
    }, 3000);
  }
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const retryHandler = () => {
    setCancel(false);
    clearTimeout(timer);
  };

  const addNewMovieHandler = (e) => {
    e.preventDefault();
    const newObj = {
    title:titleRef.current.value,
    openingText:openingTextRef.current.value,
    releaseDateRef:releaseDateRef.current.value
  }
    console.log(newObj);
  };
  return (
    <React.Fragment>
      <section>
        <form className="form">
          <label>Title</label>
          <input ref={titleRef} type="text" />
          <label>Opening Text</label>
          <input ref={openingTextRef} type="text" />
          <label>Release Date</label>
          <input ref={releaseDateRef} type="text" />
          <button onClick={addNewMovieHandler}>Add Movie</button>
        </form>
      </section>
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
