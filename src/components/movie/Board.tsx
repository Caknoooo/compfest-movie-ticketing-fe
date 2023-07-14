import MovieCard, { MovieProps } from '@/components/movie/Card';
import Typography from '@/components/typography/Typography';

export default function MovieBoard({ movieData }: { movieData: MovieProps[] }) {
  return (
    <section className='space-y-4 px-12'>
      <Typography
        variant='h2'
        className='text-base-yellow text-[1.35rem] leading-[1.85rem]'
      >
        Trending
      </Typography>
      <div className='flex justify-center flex-wrap gap-x-4 gap-y-6'>
        {movieData &&
          movieData.map(
            ({
              id,
              title,
              description,
              release_date,
              poster_url,
              age_rating,
              ticket_price,
            }) => (
              <MovieCard
                key={id + title}
                id={id}
                title={title}
                description={description}
                release_date={release_date}
                poster_url={poster_url}
                age_rating={age_rating}
                ticket_price={ticket_price}
                className='flex-grow'
              />
            ),
          )}
      </div>
    </section>
  );
}
