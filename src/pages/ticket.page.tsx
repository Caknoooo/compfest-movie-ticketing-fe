import { useQuery } from '@tanstack/react-query';
import { FiChevronRight } from 'react-icons/fi';

import TicketSection from '@/components/carousel/TicketSection';
import WithAuth from '@/components/hoc/WithAuth';
import Layout from '@/components/layout/Layout';
import BaseLink from '@/components/links/BaseLink';
import SEO from '@/components/SEO';
import Typography from '@/components/typography/Typography';
import { ApiReturn } from '@/types/api';
import { role } from '@/types/auth';
import { TicketProps } from '@/types/ticket';

export default WithAuth(TicketPage, role, false);

function TicketPage() {
  const url = `${process.env.NEXT_PUBLIC_API_PRODUCTION_URL}/ticket`;
  const { data: ticketData } = useQuery<ApiReturn<TicketProps[]>>([url]);
  return (
    <Layout>
      <SEO title='TMDB | Ticketing' />
      <main className='min-h-screen bg-base-dark text-white flex flex-col items-center pt-14 justify-start px-16'>
        <div className='flex items-center self-start'>
          <BaseLink href='/' className='px-1.5'>
            <Typography variant='b3' className='text-base-pre'>
              home
            </Typography>
          </BaseLink>
          <FiChevronRight />
          <BaseLink href='' className='px-1.5'>
            <Typography variant='b3'>ticket</Typography>
          </BaseLink>
        </div>
        {ticketData && (
          <TicketSection
            tickets={ticketData?.data}
            className='translate-y-16'
          />
        )}
      </main>
    </Layout>
  );
}
