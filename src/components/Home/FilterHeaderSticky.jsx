import React from 'react';
import Image from 'next/image';
import FilterMenu from './FilterMenu';

const headerStyles = {
  backgroundColor: '#242424',
  zIndex: 50,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  paddingLeft: '1rem',
  paddingTop: '1rem',
};

const FilterHeaderSticky = ({ genres, selectedGenres, onGenreChange }) => {
  return (
    <header style={headerStyles}>
      <Image src='./movieMax.svg' height='120' width='120' alt='moviefix' />
      <FilterMenu
        genres={genres}
        selectedGenres={selectedGenres}
        onGenreChange={onGenreChange}
      />
    </header>
  );
};

export default FilterHeaderSticky;
