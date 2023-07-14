import { NextSeo, NextSeoProps } from 'next-seo';

type SEOProps = {
  title?: string;
  description?: string;
} & NextSeoProps;

export default function SEO({ title, description, ...rest }: SEOProps) {
  return (
    <NextSeo
      title={title}
      description={
        description ??
        'Themoviedb merupakan website movie ticketing sederhana dengan fitur ticket payment dan built-in e-wallet.'
      }
      {...rest}
      openGraph={{
        type: 'website',
        url: '',
        title: 'Themoviedb',
        locale: 'in_ID',
        siteName: 'Themoviedb',
        description:
          'Themoviedb merupakan website movie ticketing sederhana dengan fitur ticket payment dan built-in e-wallet.',
        images: [
          {
            url: `https://cdn.discordapp.com/attachments/1032505826885238864/1127096118875000922/tmdb-opengraph.png`,
            width: 3010,
            height: 1714,
            alt: 'Themoviedb',
          },
        ],
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/tmdb.png',
        },
      ]}
      defaultTitle='Themoviedb'
    />
  );
}
