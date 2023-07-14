import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSolidMovie } from 'react-icons/bi';
import { BsCalendar2CheckFill } from 'react-icons/bs';
import { FaPlayCircle } from 'react-icons/fa';

import Button from '@/components/buttons/Button';
import Checkbox from '@/components/form/Checkbox';
import Radio from '@/components/form/Radio';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/SEO';
import Tag from '@/components/tag/Tag';
import Typography from '@/components/typography/Typography';
import useMutationToast from '@/hooks/toast/useMutationToast';
import api from '@/libs/axios';
import { formatLocaleDate } from '@/libs/date';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn } from '@/types/api';
import { MovieDetail, ScheduleForm, ticketForm } from '@/types/movie';

export default function MovieDetail() {
  const user = useAuthStore.useUser();
  const router = useRouter();
  const { id } = router.query;
  const url = `${process.env.NEXT_PUBLIC_API_PRODUCTION_URL}/movie/${id}`;

  //#region  //*=========== fetch movie ===========
  const { data: movieData } = useQuery<ApiReturn<MovieDetail>>([url]);
  //#endregion  //*======== fetch movie ===========

  if ((user?.age ?? 0) < (movieData?.data.Movies.age_rating ?? 0)) {
    router.push('/');
  }

  const [state, setState] = React.useState(true);
  const [seat, setSeat] = React.useState<number[]>();

  //#region  //*=========== form jadwal ===========
  const pickScheduleMethods = useForm<ScheduleForm>({
    mode: 'onChange',
  });
  const { handleSubmit: handlePickSchedule, watch } = pickScheduleMethods;
  const studiow = watch('studio');
  const jamw = watch('jam');
  const { mutateAsync: sendSchedule, isLoading: sendIsLoading } =
    useMutationToast<ApiReturn<undefined>, ScheduleForm>(
      useMutation((data) => api.post('/ticket/send', data)),
    );
  const onSubmitPickSchedule = (data: ScheduleForm) => {
    sendSchedule(data)
      .then(() => api.get<ApiReturn<number[]>>(`/ticket/${id}`))
      .then((res) => {
        setSeat(res.data.data);
        setState(!state);
      });
  };
  //#endregion  //*======== form jadwal ===========

  //#region  //*=========== form kursi ===========
  const pickSeatMethods = useForm<ticketForm>({
    mode: 'onChange',
  });
  const { mutateAsync: pickSeat, isLoading: pickSeatIsLoading } =
    useMutationToast<ApiReturn<undefined>, ticketForm>(
      useMutation((data) => api.post('/ticket', data)),
    );
  const { handleSubmit: handlePickKursi, watch: watchkursi } = pickSeatMethods;
  const nomorw = watchkursi('nomor');
  const onSubmitPickKursi = (data: ticketForm) => {
    data.movie_id = id?.toString() ?? '';
    data.jam = jamw;
    data.studio = studiow;
    data.amount = data.nomor.length;
    const datas = data.nomor.map(Number);
    data.nomor = datas;

    pickSeat(data).then(() => router.push('/ticket'));
    // console.log(data);
  };
  //#endregion  //*======== form kursi ===========

  return (
    <Layout>
      <SEO title={`TMDB | ${movieData?.data.Movies.title}`} />
      <main className='min-h-screen bg-base-dark text-white'>
        <section className='h-[100vh] overflow-hidden bg-contain bg-center bg-no-repeat relative -z-0 overflow-y-auto pb-16'>
          <div className='flex justify-center -z-20 absolute w-full overflow-hidden h-full'>
            <Image
              src={movieData?.data.Movies.poster_url ?? ''}
              alt='bg'
              width={600}
              height={300}
            />
          </div>
          <div className='absolute w-full h-full backdrop-blur-3xl -z-10'></div>
          {movieData && (
            <div className='z-10 pl-20 pt-20 flex gap-x-12 w-full h-fit'>
              <Image
                src={movieData.data.Movies.poster_url}
                alt={movieData.data.Movies.title}
                width={180}
                height={120}
                className='h-fit'
              />
              <div className='space-y-6 w-full'>
                <Typography variant='k0'>
                  {movieData.data.Movies.title}
                </Typography>
                <div className='flex items-center gap-x-6'>
                  <div className='flex items-center gap-x-2'>
                    <FaPlayCircle />{' '}
                    <Typography variant='b4'>Playing now</Typography>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <BsCalendar2CheckFill />{' '}
                    <Typography variant='b4'>
                      {formatLocaleDate(
                        new Date(movieData.data.Movies.release_date),
                        'FULL',
                      )}
                    </Typography>
                  </div>
                  <div className='flex items-center gap-x-1'>
                    <Tag
                      color={
                        movieData.data.Movies.age_rating >= 18
                          ? 'danger'
                          : 'success'
                      }
                      size='sm'
                      leftIcon={BiSolidMovie}
                    >
                      {movieData.data.Movies.age_rating}
                    </Tag>
                    <Tag
                      color='warning'
                      size='sm'
                      className='font-bold uppercase'
                    >
                      hd
                    </Tag>
                    <Tag color='secondary' size='sm'>
                      {movieData.data.Movies.ticket_price
                        .toString()
                        .substring(0, 2)}
                    </Tag>
                  </div>
                </div>
                <Typography variant='b4' className='max-w-[90%]'>
                  {movieData.data.Movies.description}
                </Typography>
                {state ? (
                  <div className='z-10 w-full max-w-[90%]'>
                    <FormProvider {...pickScheduleMethods}>
                      <form
                        onSubmit={handlePickSchedule(onSubmitPickSchedule)}
                        className='space-y-6'
                      >
                        <div className='flex items-center justify-between'>
                          <Typography variant='s0'>Jadwal Tayang</Typography>
                          <Button isLoading={sendIsLoading} type='submit'>
                            Pilih Jadwal
                          </Button>
                        </div>
                        {studiow && (
                          <div className='flex flex-wrap items-center gap-2'>
                            {movieData?.data.Studio.find(
                              ({ Name }) => Name === studiow,
                            )?.TimeMovie.map(({ time, type, id }, index) => (
                              <Radio
                                key={index + type + id}
                                name='jam'
                                label={time}
                                value={time}
                                // hideError on every radio except the last one, or use ErrorMessage
                                hideError
                                className='w-[100px] p-2'
                              />
                            ))}
                          </div>
                        )}
                        <div className='grid grid-cols-2 justify-between w-full gap-y-4 gap-x-2'>
                          {movieData.data.Studio.map(({ Name, ID }, index) => {
                            return (
                              <div
                                key={index + Name + ID}
                                className='space-y-2 p-4 rounded-md bg-base-subtle'
                              >
                                <Radio
                                  key={index + Name + ID}
                                  name='studio'
                                  label={Name}
                                  value={Name}
                                  // hideError on every radio except the last one, or use ErrorMessage
                                  hideError
                                  className='w-full border p-2'
                                />
                              </div>
                            );
                          })}
                        </div>
                      </form>
                    </FormProvider>
                  </div>
                ) : (
                  <div className='z-10 w-full max-w-[90%]'>
                    <FormProvider {...pickSeatMethods}>
                      <form
                        onSubmit={handlePickKursi(onSubmitPickKursi)}
                        className='px-4 bg-base-subtle w-fit rounded-lg'
                      >
                        <div className='flex items-center justify-between p-4'>
                          <Typography variant='s0'>Jadwal Tayang</Typography>
                          <Button isLoading={pickSeatIsLoading} type='submit'>
                            Pilih Jadwal
                          </Button>
                        </div>
                        <div className='flex flex-wrap gap-2 p-4 max-w-2xl justify-center bg-base-gray rounded-lg'>
                          {seat?.map((number, index) =>
                            number === 1 ? (
                              <Checkbox
                                size='large'
                                key={index}
                                name='nomor'
                                label={`${index + 1}`}
                                value={index + 1}
                                // hideError on every checkbox except the last one, or use ErrorMessage
                                hideError
                              />
                            ) : (
                              <Checkbox
                                size='large'
                                key={index}
                                name='nomor'
                                label={`${index + 1}`}
                                value={index + 1}
                                className='bg-base-red'
                                disabled
                                // hideError on every checkbox except the last one, or use ErrorMessage
                                hideError
                              />
                            ),
                          )}
                        </div>
                        <div className='py-2.5'>
                          <div className='flex items-center justify-between divide-x divide-base-pre border border-base-pre py-1 rounded-lg'>
                            <div className='flex flex-col items-center justify-center w-full gap-y-2 py-1'>
                              <Typography variant='s4'>Total Kursi</Typography>
                              <Typography variant='s0'>
                                {nomorw ? nomorw.length : '0'}
                              </Typography>
                            </div>
                            <div className='flex flex-col items-center justify-center w-full gap-y-2 py-1'>
                              <Typography variant='s4'>Total Harga</Typography>
                              <Typography
                                variant='s0'
                                className='text-hover-blue'
                              >
                                {nomorw
                                  ? nomorw.length *
                                    movieData.data.Movies.ticket_price
                                  : '0'}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </form>
                    </FormProvider>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}
