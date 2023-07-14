import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image from 'next/image';
import * as React from 'react';
import { BiSolidMovie } from 'react-icons/bi';
import { BsCalendar2CheckFill } from 'react-icons/bs';
import { FaPlayCircle } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { HiOutlineTicket } from 'react-icons/hi';
import Slider, { CustomArrowProps, Settings } from 'react-slick';

import Button from '@/components/buttons/Button';
import ButtonLink from '@/components/links/ButtonLink';
import { MovieProps } from '@/components/movie/Card';
import Tag from '@/components/tag/Tag';
import Typography from '@/components/typography/Typography';
import clsxm from '@/libs/clsxm';
import { formatLocaleDate } from '@/libs/date';

function NextArrow({ onClick }: CustomArrowProps) {
  return (
    <Button
      onClick={onClick}
      icon={FiChevronRight}
      variant='neutral'
      className='absolute bottom-28 right-6 z-10 flex -translate-y-1/2 items-center text-xl'
    />
  );
}

function PrevArrow({ onClick }: CustomArrowProps) {
  return (
    <Button
      onClick={onClick}
      icon={FiChevronLeft}
      variant='neutral'
      className='absolute bottom-16 right-6 z-10 flex -translate-y-1/2 items-center text-xl'
    />
  );
}

const settings: Settings = {
  autoplay: true,
  autoplaySpeed: 6000,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

type BannerProps = {
  array: MovieProps[];
} & React.ComponentPropsWithoutRef<'div'>;

export default function Banner({ array, className, ...rest }: BannerProps) {
  if (!array.length) return null;

  return (
    <div
      className={clsxm(
        'flex items-center bg-primary-100 z-30',
        'h-full w-full',
        className,
      )}
      {...rest}
    >
      <div className='max-w-full sm:px-0 h-full'>
        <Slider {...settings} className='h-full w-full'>
          {array.map(
            (
              {
                id,
                title,
                description,
                release_date,
                poster_url,
                age_rating,
                ticket_price,
              },
              index,
            ) => (
              <div key={index} className='px-12 h-[40rem] relative'>
                <div className='h-[120%] w-fit absolute right-[4%] overflow-hidden rounded-xl z-10'>
                  <div className='h-full w-full bg-gradient-radial from-transparent to-base-dark to-75% absolute'></div>
                  <Image src={poster_url} alt='' width={600} height={800} />
                </div>
                <div className='h-full w-[15rem] absolute right-0 bg-gradient-to-l from-base-dark from-15% to-transparent z-20'></div>
                <div className='h-[10rem] absolute -bottom-10 w-full bg-gradient-to-t from-base-dark from-30% to-transparent z-20'></div>
                <div className='z-30 bg-gradient-to-r from-base-dark from-25% to-transparent h-full absolute'>
                  <div className='h-full flex flex-col justify-end max-w-[50%] gap-y-6 pb-20'>
                    <Typography variant='s1' className='text-base-yellow'>
                      #{index + 1} Spotlight
                    </Typography>
                    <Typography variant='j0'>{title}</Typography>
                    <div className='flex items-center gap-x-6'>
                      <div className='flex items-center gap-x-2'>
                        <FaPlayCircle />{' '}
                        <Typography variant='b4'>Playing now</Typography>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        <BsCalendar2CheckFill />{' '}
                        <Typography variant='b4'>
                          {formatLocaleDate(new Date(release_date), 'FULL')}
                        </Typography>
                      </div>
                      <div className='flex items-center gap-x-1'>
                        <Tag
                          color={age_rating >= 18 ? 'danger' : 'success'}
                          size='sm'
                          leftIcon={BiSolidMovie}
                        >
                          {age_rating}
                        </Tag>
                        <Tag
                          color='warning'
                          size='sm'
                          className='font-bold uppercase'
                        >
                          hd
                        </Tag>
                        <Tag color='secondary' size='sm'>
                          {ticket_price.toString().substring(0, 2)}
                        </Tag>
                      </div>
                    </div>
                    <div>
                      <Typography variant='b4' className='line-clamp-3'>
                        {description}
                      </Typography>
                    </div>
                    <div className='flex items-center gap-x-4'>
                      <ButtonLink
                        href={`/${id}`}
                        rounded
                        leftIcon={HiOutlineTicket}
                      >
                        Beli Tiket
                      </ButtonLink>
                      <ButtonLink
                        href=''
                        variant='neutral'
                        rounded
                        rightIcon={FiChevronRight}
                      >
                        Detail
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </Slider>
      </div>
    </div>
  );
}
