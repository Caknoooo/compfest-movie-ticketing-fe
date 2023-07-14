import '@/styles/globals.css';

import {
  QueryClient,
  QueryClientProvider,
  QueryOptions,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';

import DismissableToast from '@/components/DismissableToast';
import api from '@/libs/axios';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
  const { data } = await api.get(`${queryKey?.[0]}`);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={poppins.className}>
        <DismissableToast />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
