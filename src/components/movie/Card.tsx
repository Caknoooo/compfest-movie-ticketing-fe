import Image from 'next/image';
import { BiSolidMovie } from 'react-icons/bi';
import { HiTicket } from 'react-icons/hi';

import ButtonLink from '@/components/links/ButtonLink';
import Tag from '@/components/tag/Tag';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';
import Typography from '@/components/typography/Typography';
import clsxm from '@/libs/clsxm';
import { formatLocaleDate } from '@/libs/date';

export type MovieProps = {
  id: number;
  title: string;
  description: string;
  release_date: string;
  poster_url: string;
  age_rating: number;
  ticket_price: number;
  className?: string;
};

export default function MovieCard({
  id,
  title,
  description,
  release_date,
  poster_url,
  age_rating,
  ticket_price,
  className,
}: MovieProps) {
  return (
    <TooltipProvider delayDuration={300} key={id}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={clsxm('flex flex-col items-center gap-y-1', className)}
          >
            <div className='relative'>
              <div className='absolute top-0 h-full w-full hover:backdrop-blur group transition-all duration-150 grid place-items-center'>
                <HiTicket className='text-4xl group-hover:opacity-100 opacity-0 text-white transition-opacity duration-150' />
              </div>
              <Image
                priority
                src={poster_url}
                alt='movie'
                width={160}
                height={100}
              />
              <div className='absolute bottom-0 w-full flex justify-start gap-x-1.5 items-end p-2 bg-gradient-to-t from-base-dark to-transparent'>
                <Tag
                  color={age_rating >= 18 ? 'danger' : 'success'}
                  size='sm'
                  leftIcon={BiSolidMovie}
                >
                  {age_rating}
                </Tag>
                <Tag color='secondary' size='sm'>
                  {ticket_price.toString().substring(0, 2)}
                </Tag>
              </div>
            </div>
            <Typography
              variant='s3'
              className='text-left truncate max-w-[160px]'
            >
              {title}
            </Typography>
            {/* <p className='truncate max-w-[160px]'>{title}</p> */}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <div className='w-[250px] space-y-3'>
            <Typography variant='s1'>{title}</Typography>
            <Typography variant='c1' className='line-clamp-3 text-gray-300'>
              {description}
            </Typography>
            <div className='flex items-center gap-x-2'>
              <Tag
                color={age_rating >= 18 ? 'danger' : 'success'}
                size='sm'
                leftIcon={BiSolidMovie}
              >
                {age_rating}
              </Tag>
              <Tag color='warning' size='sm' className='font-bold uppercase'>
                hd
              </Tag>
            </div>
            <div className='pb-3'>
              <Typography
                variant='c1'
                className='flex items-center gap-x-1 text-gray-300'
              >
                Harga :
                <span className='text-white text-sm'>{ticket_price}</span>
              </Typography>
              <Typography
                variant='c1'
                className='text-gray-300 flex items-center gap-x-1'
              >
                Waktu Tayang :
                <span className='text-white text-sm'>
                  {formatLocaleDate(
                    new Date(release_date),
                    'FULL_DATE_WITH_DAY',
                  )}
                </span>
              </Typography>
            </div>
            <ButtonLink href={`/${id}`} rounded>
              Beli Tiket
            </ButtonLink>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
