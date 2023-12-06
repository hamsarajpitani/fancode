import React, { useState, useCallback } from 'react';
import MovieCard from './MovieCard';
import { Grid } from 'react-virtualized';
import throttle from 'lodash/throttle';

// Constants

const MoviesList = ({ movies, onLoadMore }) => {
  // State
  const [startIndex, setStartIndex] = useState(0);

  // Event Handlers
  const throttledHandleScroll = throttle(({ clientHeight, scrollHeight, scrollTop }) => {
    if (scrollHeight - clientHeight - scrollTop < 100 && startIndex + 2 < movies.length) {
      onLoadMore();
    }

    // Load more items when reaching the top
    if (scrollTop === 0 && startIndex === 0) {
      onLoadMore(true);
    }
  }, 300);

  // Callbacks
  const handleScroll = useCallback(throttledHandleScroll, [
    startIndex,
    movies,
    onLoadMore,
  ]);

  // Render
  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const index = startIndex + rowIndex * 2 + columnIndex;
    const movie = movies[index];

    // Calculate grid gap
    const columnGap = 10;
    const rowGap = 20;

    const marginLeft = columnIndex > 0 ? columnGap : 0;

    const marginTop = rowIndex > 0 ? rowGap : 0;

    return (
      <div key={key} style={{ ...style, marginLeft, marginTop }}>
        {/* <MovieYearHeading /> */}
        {movie && <MovieCard movie={movie} />}
      </div>
    );
  };

  return (
    <section className='grid place-content-center'>
      <Grid
        cellRenderer={cellRenderer}
        columnCount={2}
        columnWidth={165}
        height={650}
        rowCount={Math.ceil(movies.length / 2) + 1}
        rowHeight={240}
        width={2 * 165}
        onScroll={handleScroll}
      />
    </section>
  );
};

export default MoviesList;
