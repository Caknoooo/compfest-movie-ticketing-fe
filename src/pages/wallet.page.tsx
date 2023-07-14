import * as React from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { SiThemoviedatabase } from 'react-icons/si';

import Layout from '@/components/layout/Layout';
import BaseLink from '@/components/links/BaseLink';
import SEO from '@/components/SEO';
import Typography from '@/components/typography/Typography';
import clsxm from '@/libs/clsxm';
export default function Wallet() {
  const [option, setOption] = React.useState(1);
  return (
    <Layout>
      <SEO title='TMDB | Wallet' />
      <main className='min-h-screen bg-base-dark text-white flex flex-col items-center pt-14 justify-start px-16 gap-y-12'>
        <div className='flex items-center self-start'>
          <BaseLink href='/' className='px-1.5'>
            <Typography variant='b3' className='text-base-pre'>
              home
            </Typography>
          </BaseLink>
          <FiChevronRight />
          <BaseLink href='' className='px-1.5'>
            <Typography variant='b3'>wallet</Typography>
          </BaseLink>
        </div>
        <section>
          <div className='space-y-6'>
            <div className='flex items-center gap-x-4'>
              <SiThemoviedatabase className='text-4xl' />
              <div className='flex items-center gap-x-2.5'>
                <Typography variant='h1'>Rp 214.000,00</Typography>
                <FaMoneyBillWave className='text-2xl' />
              </div>
            </div>
            <div className='flex items-center gap-x-4'>
              <button
                type='button'
                onClick={() => setOption(1)}
                className={clsxm(
                  'px-8 py-4 rounded-lg bg-base-subtle text-white hover:bg-base-yellow hover:text-base-dark',
                  option === 1 && 'bg-base-yellow text-base-dark',
                )}
              >
                <Typography variant='h3'>Isi saldo</Typography>
              </button>
              <button
                type='button'
                onClick={() => setOption(2)}
                className={clsxm(
                  'px-8 py-4 rounded-lg bg-base-subtle text-white hover:bg-base-yellow hover:text-base-dark',
                  option === 2 && 'bg-base-yellow text-base-dark',
                )}
              >
                <Typography variant='h3'>Kirim</Typography>
              </button>
              <button
                type='button'
                onClick={() => setOption(3)}
                className={clsxm(
                  'px-8 py-4 rounded-lg bg-base-subtle text-white hover:bg-base-yellow hover:text-base-dark',
                  option === 3 && 'bg-base-yellow text-base-dark',
                )}
              >
                <Typography variant='h3'>Minta</Typography>
              </button>
              <button
                type='button'
                onClick={() => setOption(4)}
                className={clsxm(
                  'px-8 py-4 rounded-lg bg-base-subtle text-white hover:bg-base-yellow hover:text-base-dark',
                  option === 4 && 'bg-base-yellow text-base-dark',
                )}
              >
                <Typography variant='h3'>Pindai</Typography>
              </button>
            </div>
          </div>
          <div className=''>
            {option === 1 && <div>1</div>}
            {option === 2 && <div>2</div>}
            {option === 3 && <div>3</div>}
            {option === 4 && <div>4</div>}
          </div>
        </section>
      </main>
    </Layout>
  );
}
