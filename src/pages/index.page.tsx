import { useQuery } from '@tanstack/react-query';
import * as React from 'react';

import Banner from '@/components/carousel/Banner';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import MovieBoard from '@/components/movie/Board';
import { MovieProps } from '@/components/movie/Card';
import SEO from '@/components/SEO';
import { ApiReturn } from '@/types/api';

export default function Home() {
  const { data: movieData } = useQuery<ApiReturn<MovieProps[]>>([
    `${process.env.NEXT_PUBLIC_API_PRODUCTION_URL}/movie`,
  ]);

  const [filter, setFilter] = React.useState('');
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [debounceSearch, setDebounceSearch] = React.useState('');

  const handleClearFilter = () => {
    setDebounceSearch('');
    setFilter('');
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceSearch(filter);
    }, 360);
    return () => clearTimeout(timeout);
  }, [filter]);

  return (
    <Layout>
      <SEO />
      <Header
        filter={filter}
        onFilterChange={setFilter}
        onClearFilter={handleClearFilter}
      />
      <main className='min-h-screen bg-base-dark text-white pb-20'>
        <section className='h-[40rem] flex items-center mb-6'>
          {movieData && <Banner array={movieData.data.slice(1, 6)} />}
        </section>
        {movieData && <MovieBoard movieData={movieData.data} />}
      </main>
    </Layout>
  );
}
