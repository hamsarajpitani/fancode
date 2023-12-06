import React from 'react';

const FilterMenu = ({ genres = [], selectedGenres = new Set(), onGenreChange }) => {

  if (!genres?.size) {
    return (
      <h6
        className='bg-[#F0283C] p-1 px-2 rounded-md w-fit'
        onClick={() => onGenreChange('All')}
      >
        All
      </h6>
    );
  }

  return (
    <section className='flex items-center gap-x-4 overflow-x-auto scrollbar-hide'>
      <h6
        className={`bg-[${
          !selectedGenres.size ? '#F0283C' : '#484848'
        }] p-1 px-2 rounded-md`}
        onClick={() => {
          onGenreChange('All');
        }}
      >
        All
      </h6>
      {Array.from(genres).map((genre) => (
        <h6
          className={`bg-[${
            selectedGenres?.has?.(genre.id) ? '#F0283C' : '#484848'
          }] p-1 px-2 rounded-md`}
          onClick={() => onGenreChange(genre.id)}
        >
          {genre.name}
        </h6>
      ))}
    </section>
  );
};

export default FilterMenu;
