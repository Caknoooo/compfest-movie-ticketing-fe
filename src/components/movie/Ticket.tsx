import { useQuery } from '@tanstack/react-query';

import Typography from '@/components/typography/Typography';
import { ApiReturn } from '@/types/api';
import { MovieDetail } from '@/types/movie';
import { TicketProps } from '@/types/ticket';

export default function Ticket({ ...res }: TicketProps) {
  const url = `${process.env.NEXT_PUBLIC_API_PRODUCTION_URL}/movie/${res.movie_id}`;

  //#region  //*=========== fetch movie ===========
  const { data: movieData } = useQuery<ApiReturn<MovieDetail>>([url]);
  //#endregion  //*======== fetch movie ===========
  return (
    <div className='mb-3 text-left ticket-border max-w-xs hover:-translate-y-4 transition-transform duration-200 z-40 hover:shadow-lg hover:shadow-base-gray'>
      <div className='bg-base-gray rounded-t-lg p-6 space-y-4'>
        <Typography variant='s1' className='text-base-yellow'>
          {movieData?.data.Movies.title}
        </Typography>
        <div className='flex items-start divide-x divide-gray-400 gap-x-2'>
          <div className='space-y-2 w-[28%]'>
            <Typography variant='c0' className='text-gray-400'>
              Tanggal
            </Typography>
            <Typography variant='s3'>Selasa, 18 Jun 2023</Typography>
          </div>
          <div className='space-y-2 w-[32%] pl-3.5 pr-1.5 box-content'>
            <Typography variant='c0' className='text-gray-400'>
              Bioskop
            </Typography>
            <Typography variant='s3'>{res.studio}</Typography>
          </div>
          <div className='space-y-2 w-[30%] pl-3'>
            <Typography variant='c0' className='text-gray-400'>
              Jam
            </Typography>
            <Typography variant='s3'>{res.jam}</Typography>
          </div>
        </div>
      </div>
      <div className='bg-base-yellow p-6 text-base-dark'>
        <div className='flex items-start gap-x-3'>
          <div className='space-y-2 w-[30%]'>
            <Typography variant='c0' className='text-gray-500'>
              Jumlah Tiket
            </Typography>
            <Typography variant='s3'>{res.nomor.length} kursi</Typography>
          </div>
          <div className='space-y-2 w-[35%] px-1.5 box-content'>
            <Typography variant='c0' className='text-gray-500'>
              Kode Transaksi
            </Typography>
            <Typography variant='s3'>{res.kode_transaksi}</Typography>
          </div>
          <div className='space-y-2 w-[25]%]'>
            <Typography variant='c0' className='text-gray-500'>
              Nomor
            </Typography>
            <Typography variant='s3'>
              {res.nomor.join(', ')}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
