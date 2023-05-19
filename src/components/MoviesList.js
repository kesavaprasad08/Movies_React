import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
const deleteHandler = (e) =>{
  props.onDelete(e);
}
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
        id={movie.id}
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onDelete={deleteHandler}
          
        />
        
      ))}
    </ul>
  );
};

export default MovieList;
