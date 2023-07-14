import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import * as React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Slider, { CustomArrowProps, Settings } from 'react-slick';

import Button from '@/components/buttons/Button';
import Ticket from '@/components/movie/Ticket';
import clsxm from '@/libs/clsxm';
import { TicketProps } from '@/types/ticket';

type TicketSectProps = {
  tickets: TicketProps[];
} & React.ComponentPropsWithoutRef<'div'>;

export default function TicketSection({
  tickets,
  className,
  ...rest
}: TicketSectProps) {
  function NextArrow({ onClick }: CustomArrowProps) {
    return (
      <Button
        onClick={onClick}
        icon={FiChevronRight}
        variant='neutral'
        className='absolute top-1/2 right-0 z-10 translate-x-full -translate-y-1/2 items-center hidden'
      />
    );
  }

  function PrevArrow({ onClick }: CustomArrowProps) {
    return (
      <Button
        onClick={onClick}
        icon={FiChevronLeft}
        variant='neutral'
        className='absolute top-1/2 left-0 z-10 -translate-x-full -translate-y-1/2 items-center hidden'
      />
    );
  }

  const title: Record<number, string> = {
    0: 'Tiket Mendatang',
    1: 'Riwayat Transaksi',
  };

  const settings: Settings = {
    customPaging: (index) => <a>{title[index]}</a>,
    dots: true,
    dotsClass: 'slick-dots slick-thumb h-fit translate-y-6',
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const TICKET_MOCK: (() => React.ReactNode)[] = [
    () => (
      <div className='grid grid-cols-3 gap-4 z-30'>
        {tickets.map(({ ...res }, index) => (
          <Ticket key={index} {...res} />
        ))}
      </div>
    ),
    () => <span>Belum ada riwayat transaksi</span>,
  ];

  return (
    <div
      className={clsxm('flex items-center pb-3', 'min-h-[4rem]', className)}
      {...rest}
    >
      <div className='sm:layout max-w-full px-8 sm:px-0'>
        <Slider {...settings} className='z-0'>
          {TICKET_MOCK.map((content, index) => (
            <div key={index} className='text-center z-50 pt-4'>
              {content()}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
