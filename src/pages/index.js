import Image from 'next/image'
import { Archivo } from 'next/font/google';
import FilterMovieContainer from '@/components/Home/FilterMovieContainer';

const archivo = Archivo({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`h-screen ${archivo.className}`}>
      <FilterMovieContainer />
    </main>
  );
}
