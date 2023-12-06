import React from 'react';
import Image from 'next/image';
const MovieCard = ({ movie = {} }) => {
  if (!Object.keys(movie).length) return null;

  const imageUrl = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

  return (
    <section className='bg-[#424242] min-h-[14rem] relative flex items-start flex-col justify-end'>
      <Image
        src={imageUrl}
        alt={movie.title}
        width={400}
        height={400}
        style={{ maxWidth: '100%', height: 'auto' }}
        quality={50}
      />
      <div className='absolute bottom-3 left-2'>
        <h3 className='text-white text-sm font-bold mb-1'>{movie.title}</h3>
        <p className='text-white'>{movie.vote_average}</p>
      </div>
    </section>
  );
};

export default MovieCard;
