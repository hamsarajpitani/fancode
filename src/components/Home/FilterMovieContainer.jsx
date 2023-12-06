import React, { useState, useEffect, useRef } from 'react';
import FilterHeaderSticky from './FilterHeaderSticky';
import MoviesList from './MoviesList';
import { fetchGenres, fetchMovies } from '../../../utils/api';
import usePrevious from '@/custom/usePrevious';

const FilterMovieContainer = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState(new Set());
  const [filteredMovies, setfilteredMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [year, setYear] = useState(2012);
  const prevoiousYear = usePrevious(year);

  useEffect(() => {
    if (year === prevoiousYear) return;
    fetchMovies(year).then((data) => {
      if (prevoiousYear > year) {
        setMovies((prev) => [...data, ...prev]);
      } else {
        setMovies((prev) => [...prev, ...data]);
      }
    });
  }, [year]);

  useEffect(() => {
    if (selectedGenres.size) {
      setfilteredMovies(
        movies.filter((movie) =>
          movie.genre_ids?.some((genreId) => selectedGenres.has(genreId)),
        ),
      );
    }
  }, [selectedGenres, movies, setfilteredMovies]);

  useEffect(() => {
    fetchGenres().then((data) => {
      setGenres(new Set(data));
    });
  }, []);

  const handleGenreChange = (genreId) => {
    if (genreId === 'All') {
      setSelectedGenres(new Set());
    } else {
      const updatedGenres = new Set(selectedGenres);
      if (updatedGenres.has(genreId)) {
        updatedGenres.delete(genreId);
      } else {
        updatedGenres.add(genreId);
      }
      setSelectedGenres(updatedGenres);
    }
  };

  const handleLoadMore = (backward = false) => {
    if (year > new Date().getFullYear()) return;
    setYear((year) => (backward ? year - 1 : year + 1));
  };

  return (
    <section>
      <FilterHeaderSticky
        genres={genres}
        selectedGenres={selectedGenres}
        onGenreChange={handleGenreChange}
        setMovies={setMovies}
      />{' '}
      <MoviesList
        movies={selectedGenres.size ? filteredMovies : movies}
        onLoadMore={handleLoadMore}
      />
    </section>
  );
};

export default FilterMovieContainer;
